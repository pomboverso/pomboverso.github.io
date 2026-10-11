import { getPrefix, normalize, filters } from './head.js'
import * as THREE from './modules/three.module.min.js'
import { OrbitControls } from './modules/OrbitControls.js'

const rad = Math.PI / 180

customElements.define(
  getPrefix('3d-chart'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = {
      attrs: [],
      winHeight: undefined,
      winWidth: undefined,
      camera: undefined,
      scene: undefined,
      renderer: undefined,
      gridHelper: undefined,
      gridToggle: true,

      language: 'all',

      minPolarAngle: 0,
      maxPolarAngle: 120 * rad,
      minDistance: 100,
      maxDistance: 1200,
      data: [],
      controls: undefined,

      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),
      hovered: null,
      originalMaterials: new Map(),
    }

    #template = `      
      <main>
        <section>
          <div class="controls">
            <nn-btn id="grid" color="#36ce80">
              Toggle Grid
            </nn-btn>
          </div>
          <div id="tree"></div>

          <div class="tooltip-3d"></div>
        </section>
      </main>
      `

    #getXY(i) {
      if (i === 0) return { x: 0, y: 0 }

      let layer = 1
      let legLen = 1
      let steps = 0
      let x = 0
      let y = 0
      let dx = 1
      let dy = 0

      for (let step = 1; step <= i; step++) {
        x += dx
        y += dy
        steps++

        if (steps === legLen) {
          // Rotate direction
          const temp = dx
          dx = -dy
          dy = temp
          layer++

          // Every two turns, increase leg length
          if (dy === 0) legLen++
          steps = 0
        }
      }

      return { x, y }
    }

    #createGuides() {
      this.#data.gridHelper = new THREE.GridHelper(160, 40)
      this.#data.scene.add(this.#data.gridHelper)
    }

    #handleHover(clientX, clientY) {
      this.#data.raycaster.setFromCamera(this.#data.mouse, this.#data.camera)
      const intersects = this.#data.raycaster.intersectObjects(
        this.#data.scene.children,
        true // important to hit meshes inside groups
      )

      const tooltip = this.querySelector('.tooltip-3d')

      if (intersects.length > 0) {
        const intersect = intersects[0].object
        if (intersect.name === 'cubo') {
          const rect = this.#data.renderer.domElement.getBoundingClientRect()

          tooltip.style.display = 'block'
          tooltip.textContent = intersect.userData.label || 'Cube'

          // Adjust position relative to canvas, not window
          tooltip.style.left = `${clientX}px`
          tooltip.style.top = `${clientY - 30}px`
        } else {
          tooltip.style.display = 'none'
        }
      } else {
        tooltip.style.display = 'none'
      }
    }

    #createCubes(filterBy) {
      const rowFilters = filterBy.split(',')

      this.#clearTree()
      this.#createGuides()

      let localServers = this.#data.data

      const geometry = new THREE.BoxGeometry(3, 0.5, 3)
      const gap = 8

      this.#data.serverGroups = new Map()

      localServers.forEach(
        ({ filter_keys, colors, label, size }, ringIndex) => {
          const matchFilter = rowFilters.some(f => filter_keys.includes(f))

          if (rowFilters?.[0] === '' || matchFilter) {
            const group = new THREE.Group()
            const { x, y: z } = this.#getXY(ringIndex)

            colors.forEach((color, stackIndex) => {
              const material = color
                ? new THREE.MeshBasicMaterial({ color })
                : new THREE.MeshBasicMaterial({ color: '#ffffff' })

              const mesh = new THREE.Mesh(geometry, material)
              const y = stackIndex + 0.05
              mesh.position.set(x * gap, y * 0.55, z * gap)
              mesh.name = 'cubo'
              mesh.userData = {
                label: `${label} / ${size} Servers`,
                serverKey: label,
              }

              group.add(mesh)
            })

            this.#data.scene.add(group)
            this.#data.serverGroups.set(label, group)
          }
        }
      )
    }

    #checkHover() {
      const {
        raycaster,
        camera,
        scene,
        mouse,
        hovered,
        originalMaterials,
        serverGroups,
      } = this.#data

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const first = intersects[0].object

        if (first.name === 'cubo') {
          const serverKey = first.userData.serverKey
          const group = serverGroups.get(serverKey)

          if (group !== hovered) {
            // Reset previous group colors
            if (hovered) {
              hovered.children.forEach(mesh => {
                mesh.material.color.set(originalMaterials.get(mesh))
              })
            }

            // Save and set white for new group
            group.children.forEach(mesh => {
              if (!originalMaterials.has(mesh)) {
                originalMaterials.set(mesh, mesh.material.color.getHex())
              }
              mesh.material.color.set(0xffffff)
            })

            this.#data.hovered = group
          }
        }
      } else if (hovered) {
        hovered.children.forEach(mesh => {
          mesh.material.color.set(originalMaterials.get(mesh))
        })
        this.#data.hovered = null
      }

      this.#renderScene()
    }

    #clearTree() {
      this.#data.scene.traverse(obj => {
        if (obj.isMesh) {
          obj.geometry.dispose()
          obj.material.dispose()
        }
      })

      this.#data.scene.clear()
      this.#data.originalMaterials.clear()
      this.#data.hovered = null
    }

    #onToggleGrid() {
      this.#data.gridToggle = !this.#data.gridToggle
      this.#data.gridToggle
        ? this.#data.scene.add(this.#data.gridHelper)
        : this.#data.scene.remove(this.#data.gridHelper)
      this.#renderScene()
    }

    #onHoverObjects() {
      const rect = this.#data.renderer.domElement.getBoundingClientRect()
      this.#data.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      this.#data.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      this.#checkHover()
      this.#handleHover(event.clientX, event.clientY)
    }

    #generateListeners() {
      this.querySelector('#grid').addEventListener('click', () =>
        this.#onToggleGrid()
      )

      this.#data.controls.addEventListener('change', () => this.#renderScene())

      window.addEventListener('resize', () => this.#resizeWindow())

      this.querySelector('#tree').addEventListener('mousemove', event =>
        this.#onHoverObjects()
      )
    }

    #renderScene() {
      this.#data.renderer.render(this.#data.scene, this.#data.camera)
    }

    #initializeSearchBar = event => {
      let filter = ''
      if (filters) {
        filter = filters
      }
      if (event) {
        filter = event.detail.filterBy
      }
      filter = normalize(filter)

      this.#createCubes(filter)
      this.#renderScene()
    }

    async connectedCallback() {
      this.innerHTML = this.#template

      const url = this.getAttribute('data-url')

      try {
        const response = await fetch(url)
        this.#data.data = await response.json()

        this.#data.camera = new THREE.PerspectiveCamera(
          8, // FOV
          this.#data.winWidth / this.#data.winHeight,
          0.1,
          1500
        )
        this.#data.camera.position.set(100, 500, 100)
        this.#data.camera.lookAt(0, 0, 0) // Look at the center of the scene

        this.#data.scene = new THREE.Scene()

        this.#data.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        })
        this.#resizeWindow()
        this.querySelector('#tree').appendChild(this.#data.renderer.domElement)

        this.#data.controls = new OrbitControls(
          this.#data.camera,
          this.#data.renderer.domElement
        )

        this.#data.controls.minPolarAngle = this.#data.minPolarAngle
        this.#data.controls.maxPolarAngle = this.#data.maxPolarAngle

        this.#data.controls.minDistance = this.#data.minDistance
        this.#data.controls.maxDistance = this.#data.maxDistance

        this.#initializeSearchBar()
        document.addEventListener('filter-change', this.#initializeSearchBar)

        this.#generateListeners()
      } catch (e) {
        console.log(e)
      }
    }

    #resizeWindow() {
      this.#data.winWidth = window.innerWidth
      this.#data.winHeight = window.innerHeight
      this.#data.renderer.setSize(this.#data.winWidth, this.#data.winHeight)
      this.#data.camera.aspect = this.#data.winWidth / this.#data.winHeight
      this.#data.camera.updateProjectionMatrix()
      this.#renderScene()
    }
  }
)
