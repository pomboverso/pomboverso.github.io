import { getPrefix } from './_helpers.js'
import { ASSETS, GAME_TILE, ITEM_BY_ID, TILE_BY_ID, TILE_PX, describe, posCol, posRow } from './obj_game.js'
import { STAGES } from './arr_stages.js'

const STEP_MS = 200 // Goose.STEP_DURATION_MS
const WALK_FRAME_MS = 80 // Goose.WALK_FRAME_DURATION_MS
const FRAME = { swimA: 0, swimB: 1, idle: 2, walkA: 3, walkB: 4 } // Goose.java rows
const ZOOMS = [0.5, 1, 2, 3]

const KEYS = {
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
  ArrowUp: 'up', KeyW: 'up',
  ArrowDown: 'down', KeyS: 'down',
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`could not load ${src}`))
    img.src = src
  })
}

customElements.define(
  getPrefix('map'),
  class extends HTMLElement {
    #initialized = false
    #img = {}
    #ctx = null
    #html = {}

    #cells = [] // describe() of every raw value, so the loop never re-decodes
    #rows = 0
    #cols = 0

    #goose = {
      row: 0, col: 0, fromRow: 0, fromCol: 0,
      progress: 1, moving: false, facing: 1, walkToggle: false, walkTimer: 0,
    }

    #held = [] // arrow/wasd directions in press order
    #zoomIndex = 1
    #last = 0

    #template = `
    <div class="map-app">
      <div class="map-stage" data-el="box">
        <canvas data-el="canvas"></canvas>
        <div class="map-help">Arrow keys / WASD to move &middot; +/&minus; to zoom</div>
        <div class="map-dpad" data-el="dpad">
          <button data-dir="up" aria-label="Up">&#9650;</button>
          <button data-dir="left" aria-label="Left">&#9664;</button>
          <button data-dir="down" aria-label="Down">&#9660;</button>
          <button data-dir="right" aria-label="Right">&#9654;</button>
        </div>
      </div>
    </div>
    `

    async connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = this.#template
      for (const el of this.querySelectorAll('[data-el]')) this.#html[el.dataset.el] = el
      this.#ctx = this.#html.canvas.getContext('2d')

      try {
        const [tiles, items, goose] = await Promise.all([
          loadImage(ASSETS.tiles),
          loadImage(ASSETS.items),
          loadImage(ASSETS.goose),
        ])
        this.#img = { tiles, items, goose }
      } catch (error) {
        console.error(`map: ${error.message}`)
        return
      }

      const stage = STAGES.find(s => s.key === this.getAttribute('stage')) ?? STAGES[0]
      this.#load(stage.make((Math.random() * 0xffffffff) >>> 0))
      this.#bind()
      requestAnimationFrame(t => this.#frame(t))
    }

    #load(data) {
      this.#rows = data.tiles.length
      this.#cols = data.tiles[0].length
      this.#cells = data.tiles.map(row => row.map(describe))
      const g = this.#goose
      g.row = g.fromRow = data.spawnRow
      g.col = g.fromCol = data.spawnCol
    }

    #bind() {
      window.addEventListener('keydown', e => {
        if (!this.#isActive() || e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return

        const dir = KEYS[e.code]
        if (dir) {
          e.preventDefault()
          if (!this.#held.includes(dir)) this.#held.push(dir)
          return
        }
        if (e.key === '+' || e.key === '=') this.#zoomBy(1)
        if (e.key === '-' || e.key === '_') this.#zoomBy(-1)
      })

      window.addEventListener('keyup', e => {
        const dir = KEYS[e.code]
        if (dir) this.#held = this.#held.filter(d => d !== dir)
      })
      window.addEventListener('blur', () => (this.#held = []))

      this.#html.canvas.addEventListener(
        'wheel',
        e => {
          e.preventDefault()
          this.#zoomBy(e.deltaY < 0 ? 1 : -1)
        },
        { passive: false }
      )

      const press = (e, down) => {
        const dir = e.target.closest('[data-dir]')?.dataset.dir
        if (!dir) return
        e.preventDefault()
        this.#held = this.#held.filter(d => d !== dir)
        if (down) this.#held.push(dir)
      }
      this.#html.dpad.addEventListener('pointerdown', e => press(e, true))
      for (const type of ['pointerup', 'pointercancel', 'pointerleave'])
        this.#html.dpad.addEventListener(type, e => press(e, false), true)

      new ResizeObserver(() => this.#resize()).observe(this.#html.box)
    }

    #isActive() {
      return this.classList.contains('active')
    }

    #zoomBy(step) {
      this.#zoomIndex = Math.min(ZOOMS.length - 1, Math.max(0, this.#zoomIndex + step))
    }

    #direction() {
      const has = d => this.#held.includes(d)
      return {
        dx: (has('right') ? 1 : 0) - (has('left') ? 1 : 0),
        dy: (has('down') ? 1 : 0) - (has('up') ? 1 : 0),
      }
    }

    #walkable(row, col) {
      return row >= 0 && row < this.#rows && col >= 0 && col < this.#cols && !this.#cells[row][col].blocks
    }

    #canStep(row, col, dx, dy) {
      if (dx === 0 && dy === 0) return false
      if (!this.#walkable(row + dy, col + dx)) return false
      if (dx !== 0 && dy !== 0) {
        // diagonal: at least one of the two side cells must be open
        if (!this.#walkable(row, col + dx) && !this.#walkable(row + dy, col)) return false
      }
      return true
    }

    #update(dt) {
      const g = this.#goose
      const { dx, dy } = this.#direction()

      if (!g.moving && (dx !== 0 || dy !== 0)) {
        if (dx !== 0) g.facing = dx < 0 ? 0 : 1
        let sx = dx
        let sy = dy
        if (!this.#canStep(g.row, g.col, sx, sy) && dx !== 0 && dy !== 0) {
          if (this.#canStep(g.row, g.col, dx, 0)) sy = 0
          else if (this.#canStep(g.row, g.col, 0, dy)) sx = 0
        }
        if (this.#canStep(g.row, g.col, sx, sy)) {
          g.fromRow = g.row
          g.fromCol = g.col
          g.row += sy
          g.col += sx
          g.progress = 0
          g.moving = true
        }
      }

      if (g.moving) {
        g.progress += dt / STEP_MS
        if (g.progress >= 1) {
          g.progress = 1
          g.moving = false
        }
        g.walkTimer += dt
        if (g.walkTimer >= WALK_FRAME_MS) {
          g.walkTimer = 0
          g.walkToggle = !g.walkToggle
        }
      } else {
        g.walkTimer = 0
      }
    }

    #goosePx() {
      const g = this.#goose
      return {
        x: (g.fromCol + (g.col - g.fromCol) * g.progress) * GAME_TILE,
        y: (g.fromRow + (g.row - g.fromRow) * g.progress) * GAME_TILE,
      }
    }

    #swimming() {
      const { x, y } = this.#goosePx()
      const c = Math.floor((x + GAME_TILE / 2) / GAME_TILE)
      const r = Math.floor((y + GAME_TILE / 2) / GAME_TILE)
      return !!this.#cells[r]?.[c]?.liquid
    }

    #frame(now) {
      requestAnimationFrame(t => this.#frame(t))
      const dt = Math.min(100, now - (this.#last || now))
      this.#last = now

      if (!this.#isActive() || !this.#html.canvas.width) return
      this.#update(dt)
      this.#draw()
    }

    #resize() {
      const { canvas, box } = this.#html
      const w = box.clientWidth
      const h = box.clientHeight
      if (!w || !h) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }

    #layer(g, tileId, pos, x, y) {
      const t = TILE_BY_ID.get(tileId)
      if (!t) return
      g.drawImage(
        this.#img.tiles,
        (t.blockCol + posCol(pos)) * TILE_PX, (t.blockRow + posRow(pos)) * TILE_PX, TILE_PX, TILE_PX,
        x, y, GAME_TILE, GAME_TILE
      )
    }

    #drawCell(g, cell, x, y) {
      if (cell.bg) this.#layer(g, cell.bg, cell.bgPos, x, y)
      this.#layer(g, cell.fg, cell.pos, x, y)
      const item = ITEM_BY_ID.get(cell.item)
      if (item)
        g.drawImage(this.#img.items, item.col * TILE_PX, item.row * TILE_PX, TILE_PX, TILE_PX, x, y, GAME_TILE, GAME_TILE)
    }

    #draw() {
      const g = this.#ctx
      const { canvas } = this.#html
      const dpr = window.devicePixelRatio || 1
      const zoom = ZOOMS[this.#zoomIndex]
      const viewW = canvas.width / dpr / zoom
      const viewH = canvas.height / dpr / zoom
      const mapW = this.#cols * GAME_TILE
      const mapH = this.#rows * GAME_TILE
      const goose = this.#goosePx()

      const cam = (pos, view, size) =>
        size <= view ? Math.round((size - view) / 2) : Math.min(size - view, Math.max(0, Math.round(pos + GAME_TILE / 2 - view / 2)))
      const camX = cam(goose.x, viewW, mapW)
      const camY = cam(goose.y, viewH, mapH)

      g.setTransform(1, 0, 0, 1, 0, 0)
      g.fillStyle = '#000'
      g.fillRect(0, 0, canvas.width, canvas.height)
      g.setTransform(dpr * zoom, 0, 0, dpr * zoom, 0, 0)
      g.imageSmoothingEnabled = false
      g.translate(-camX, -camY)

      const c0 = Math.max(0, Math.floor(camX / GAME_TILE))
      const r0 = Math.max(0, Math.floor(camY / GAME_TILE))
      const c1 = Math.min(this.#cols - 1, Math.floor((camX + viewW) / GAME_TILE))
      const r1 = Math.min(this.#rows - 1, Math.floor((camY + viewH) / GAME_TILE))
      for (let r = r0; r <= r1; r++)
        for (let c = c0; c <= c1; c++) this.#drawCell(g, this.#cells[r][c], c * GAME_TILE, r * GAME_TILE)

      const gs = this.#goose
      const frame = this.#swimming()
        ? gs.walkToggle ? FRAME.swimA : FRAME.swimB
        : gs.moving ? (gs.walkToggle ? FRAME.walkA : FRAME.walkB) : FRAME.idle
      g.drawImage(
        this.#img.goose,
        gs.facing * TILE_PX, frame * TILE_PX, TILE_PX, TILE_PX,
        Math.round(goose.x), Math.round(goose.y), GAME_TILE, GAME_TILE
      )
    }
  }
)
