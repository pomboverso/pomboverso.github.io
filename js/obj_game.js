export const TILE_PX = 32 // size of one frame inside the sprite sheets
export const GAME_TILE = 64 // size the game draws one tile at

export const ASSETS = {
  tiles: './img/game/tiles.png',
  items: './img/game/items.png',
  goose: './img/game/goose.png',
}

const TILE_DEFS = [
  [1, 'Grass', false],
  [2, 'Water', true],
  [3, 'Sand', false],
  [4, 'Soil', false],
  [5, 'Deep grass', false],
  [6, 'Deep water', true],
  [7, 'Snow', false],
  [8, 'Ice', false],
  [9, 'Volcanic soil', false],
  [10, 'Lava', true],
  [11, 'Acid soil', false],
  [12, 'Acid lake', true],
  [13, 'Bubblegum', false],
  [14, 'Bubblegum lake', true],
  [15, 'Space soil', false],
  [16, 'Space lake', true],
  [17, 'Blood lake', true],
]

const TYPES_PER_COLUMN = 10
const BLOCK_SIZE = 3

export const TILES = TILE_DEFS.map(([id, label, liquid]) => {
  const index = id - 1
  return {
    id,
    label,
    liquid,
    blockCol: Math.floor(index / TYPES_PER_COLUMN) * BLOCK_SIZE,
    blockRow: (index % TYPES_PER_COLUMN) * BLOCK_SIZE,
  }
})

export const TILE_BY_ID = new Map(TILES.map(t => [t.id, t]))

export const TILE = Object.freeze({
  NONE: 0,
  GRASS: 1,
  WATER: 2,
  SAND: 3,
  SOIL: 4,
  DEEP_GRASS: 5,
  DEEP_WATER: 6,
  SNOW: 7,
  ICE: 8,
  VOLCANIC_SOIL: 9,
  LAVA: 10,
  ACID_SOIL: 11,
  ACID_LAKE: 12,
  BUBBLEGUM: 13,
  BUBBLEGUM_LAKE: 14,
  SPACE_SOIL: 15,
  SPACE_LAKE: 16,
  BLOOD_LAKE: 17,
})

export const posCol = p => (p - 1) % 3
export const posRow = p => 2 - Math.floor((p - 1) / 3)

const ITEM_DEFS = [
  [2, 'Hole down', 0, 0, false],
  [3, 'Hole up', 0, 1, false],
  [5, 'Plant', 0, 2, false],
  [7, 'Gem', 0, 3, false],
  [8, 'Tree (forest wall)', 0, 4, true],
  [9, 'Cave wall', 0, 5, true],
  [10, 'Volcano wall', 0, 6, true],
  [14, 'Pink flowers', 0, 7, false],
  [33, 'Alien stone 1', 0, 8, true],
  [34, 'Alien stone 2', 0, 9, true],
  [15, 'Blue flowers', 1, 0, false],
  [16, 'Yellow flowers', 1, 1, false],
  [20, 'Gems', 1, 2, false],
  [21, 'Space gems', 1, 3, false],
  [22, 'Space gem', 1, 4, false],
  [23, 'Arctic wall', 1, 5, true],
  [24, 'Lava stones 1', 1, 6, false],
  [25, 'Lava stones 2', 1, 7, false],
  [35, 'Alien stone 3', 1, 8, true],
  [36, 'Alien stone 4', 1, 9, true],
  [26, 'Lava stones 3', 2, 0, false],
  [27, 'Lilypad 1', 2, 1, false],
  [28, 'Lilypad 2', 2, 2, false],
  [32, 'Space wall', 2, 3, true],
  [37, 'Bubblegum wall', 2, 4, true],
  [38, 'Bubbles 1', 2, 5, false],
  [40, 'Acid wall', 2, 6, true],
  [41, 'Blood wall', 2, 7, true],
  [42, 'Farm button', 2, 8, false],
  [43, 'Bubbles 2', 2, 9, false],
]

export const ITEMS = ITEM_DEFS.map(([id, label, col, row, blocks]) => ({
  id,
  label,
  col,
  row,
  blocks,
}))

export const ITEM_BY_ID = new Map(ITEMS.map(i => [i.id, i]))

export const ITEM = Object.freeze({
  HOLE_DOWN: 2,
  HOLE_UP: 3,
  TREE: 8,
  FLOWER_PINK: 14,
  FLOWER_BLUE: 15,
  FLOWER_YELLOW: 16,
  LILYPOND_1: 27,
  LILYPOND_2: 28,
})

export const I = Object.freeze({
  HOLE_DOWN: 2000000,
  HOLE_UP: 3000000,
  PLANT: 5000000,
  GEM: 7000000,
  TREE: 8000000, // wall_forest
  WALL_CAVE: 9000000,
  WALL_VOLCANO: 10000000,
  FLOWER_PINK: 14000000,
  FLOWER_BLUE: 15000000,
  FLOWER_YELLOW: 16000000,
  GEMS: 20000000,
  SPACE_GEMS: 21000000,
  SPACE_GEM: 22000000,
  WALL_ARCTIC: 23000000,
  LAVA_STONES_1: 24000000,
  LAVA_STONES_2: 25000000,
  LAVA_STONES_3: 26000000,
  LILYPOND_1: 27000000,
  LILYPOND_2: 28000000,
  WALL_SPACE: 32000000,
  ALIEN_STONE_1: 33000000,
  ALIEN_STONE_2: 34000000,
  ALIEN_STONE_3: 35000000,
  ALIEN_STONE_4: 36000000,
  WALL_BUBBLEGUM: 37000000,
  BUBBLES_1: 38000000,
  WALL_ACID: 40000000,
  WALL_BLOOD: 41000000,
  FARM_BUTTON: 42000000,
  BUBBLES_2: 43000000,
})

export const tile = (item, bg, bgPos, fg, pos) => item * 1000000 + bg * 10000 + bgPos * 1000 + fg * 10 + pos

export const cell = (fg, pos = 5) => fg * 10 + pos


export function decode(raw) {
  const r = Math.max(raw | 0, 0)
  return {
    item: Math.floor(r / 1000000) % 100,
    bg: Math.floor(r / 10000) % 100,
    bgPos: Math.floor(r / 1000) % 10,
    fg: Math.floor(r / 10) % 100,
    pos: r % 10,
  }
}

export function encode({ item = 0, bg = 0, bgPos = 0, fg = 0, pos = 0 }) {
  return item * 1000000 + bg * 10000 + bgPos * 1000 + fg * 10 + pos
}

const sanitize = p => (p < 1 || p > 9 ? 5 : p)

export function describe(raw) {
  const c = decode(raw)
  const top = c.fg !== 0 ? c.fg : c.bg
  return {
    ...c,
    bgPos: sanitize(c.bgPos),
    pos: sanitize(c.pos),
    liquid: !!TILE_BY_ID.get(top)?.liquid,
    blocks: !!ITEM_BY_ID.get(c.item)?.blocks,
  }
}

export const PONDS = [
  { name: 'Pond 1', shape: [[0, 7, 0], [7, 5, 9], [4, -5, 6], [1, 2, 3]] },
  { name: 'Pond 2', shape: [[0, 7, 8, 9], [0, 4, 5, 6], [7, 5, -5, 6], [1, 5, -5, 6], [0, 1, 2, 3]] },
  {
    name: 'Pond 3',
    shape: [[0, 7, 8, 8, 9], [0, 4, 5, 5, 6], [7, 5, -7, -9, 6], [1, 5, -1, -3, 6], [0, 1, 5, 5, 3], [0, 0, 1, 3, 0]],
  },
  {
    name: 'Pond 4',
    shape: [[0, 0, 7, 9, 0], [0, 0, 4, 5, 9], [7, 8, 5, 5, 6], [4, 5, -5, -5, 6], [1, 2, 5, 5, 3], [0, 0, 1, 3, 0]],
  },
  {
    name: 'Pond 5',
    shape: [
      [0, 0, 7, 9, 0, 0],
      [0, 7, 5, 5, 9, 0],
      [7, 5, 5, 5, 6, 0],
      [4, 5, -7, -9, 6, 0],
      [4, 5, -4, -6, 6, 0],
      [4, 5, -4, -6, 5, 9],
      [4, 5, -1, -3, 5, 3],
      [1, 2, 5, 5, 3, 0],
      [0, 0, 1, 3, 0, 0],
    ],
  },
  { name: 'Pond 6', shape: [[7, 8, 9], [4, 5, 6], [1, 2, 3]] },
  {
    name: 'Pond 7 (big)',
    shape: [
      [7, 8, 9, 0, 0, 0, 0, 0, 7, 8, 8, 8, 8, 8, 9],
      [4, 5, 5, 8, 8, 8, 8, 8, 5, 5, 5, 5, 5, 3, 0],
      [1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0],
      [0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 9],
      [0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6],
      [0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 3],
      [0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0],
      [0, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0],
      [7, 5, 5, 5, 5, 5, 5, 2, 2, 2, 5, 5, 5, 9, 0],
      [1, 2, 2, 2, 2, 2, 3, 0, 0, 0, 1, 2, 2, 2, 3],
    ],
  },
  { name: 'Pond 8 (tiny)', shape: [[7, 9], [1, 3]] },
]

export function drawPond(tiles, startY, startX, bgTile, shape, ...internal) {
  const primary = internal.length > 0 ? internal[0] : bgTile
  const hasSecondary = internal.length > 1
  const secondary = hasSecondary ? internal[1] : primary

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      const value = shape[y][x]
      if (value === 0) continue
      const ty = startY + y
      const tx = startX + x
      if (ty < 0 || ty >= tiles.length || tx < 0 || tx >= tiles[0].length) continue

      const isSecondary = value < 0
      const fg = isSecondary ? secondary : primary
      const pos = isSecondary && !hasSecondary ? 5 : Math.abs(value)
      tiles[ty][tx] = encode({ bg: bgTile, bgPos: 5, fg, pos })
    }
  }
}

export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle(list, random) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
}

export const place = (item, maxCount, minDistance) => ({ item, maxCount, minDistance })

export function randomizedItemGroup(tiles, startY, endY, startX, endX, allowed, random, ...placements) {
  const pool = []
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      if (allowed.includes(tiles[y][x])) pool.push([y, x])
    }
  }

  for (const p of placements) {
    shuffle(pool, random)
    const placed = []
    for (let i = 0; i < pool.length && placed.length < p.maxCount; ) {
      const [y, x] = pool[i]
      let tooClose = false
      if (p.minDistance > 0) {
        for (const [py, px] of placed) {
          if (Math.max(Math.abs(y - py), Math.abs(x - px)) < p.minDistance) {
            tooClose = true
            break
          }
        }
      }
      if (tooClose) {
        i++
        continue
      }
      tiles[y][x] += p.item // already a raw value, e.g. I.TREE
      placed.push([y, x])
      pool.splice(i, 1)
    }
  }
}
