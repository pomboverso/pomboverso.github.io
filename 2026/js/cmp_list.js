import { getPrefix } from './_helpers.js'
import projects from "./arr_projects.js"

customElements.define(
  getPrefix('list'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #html = {
      body: undefined,
      $ul: undefined,
    }

    #template = `
    <ul class="list">
      <li>
        <button
          class="header-btn"
          type="button"
        >
          [+] ------- 2026
        </button>
      </li>
      <li>
        <button
          class="project-btn"
          type="button"
        >
          [+] Rama :: Mako (Android App)
        </button>
        <div class="content-area">
          <p>Ola</p>
          <p>Ola 2</p>
          <div class="tags">
            <button
              type="button"
              class="tag"
            >
              kotlin
            </button>
            <button
              type="button"
              class="tag"
            >
              vue
            </button>
          </div>
        </div>
      </li>
      <li>
        <button
          class="project-btn"
          type="button"
        >
          [+] Rama :: Mako (Android App)
        </button>
        
      </li>
      <li>
        <button
          class="project-btn"
          type="button"
        >
          [+] Rama :: Mako (Android App)
        </button>
        <div class="content-area">
          <p>Ola</p>
          <p>Ola 2</p>
          <div class="tags">
            <button
              type="button"
              class="tag"
            >
              kotlin
            </button>
            <button
              type="button"
              class="tag"
            >
              vue
            </button>
          </div>
        </div>
      </li>
    </ul>
    `

    refreshList() {
      this.#html.$ul.innerHTML = ""

      projects.forEach(({org, name, category, tags, description}) => {
        const descriptionHTML = description.map(p => {
          return `<p>${p}</p>`
        }).join('')

        const tagsHTML = tags.map(tag => {
          return `
          <button type="button" class="tag">
            ${tag}
          </button>`
        }).join('')

        this.#html.$ul.innerHTML += `
        <li>
          <button
            class="project-btn"
            type="button"
          >
            <span class="collapse-indicator">+</span> ${org} :: ${name} (${category})
          </button>
          <div class="content-area">
            ${descriptionHTML}
            <div class="tags">
             ${tagsHTML}              
            </div>
          </div>
        </li>
        `
      })
    }

    connectedCallback() {
      this.innerHTML = this.#template
      this.#html.$ul = this.querySelector('ul.list')
      this.refreshList()

      console.log(this.#html)
    }
  }
)
