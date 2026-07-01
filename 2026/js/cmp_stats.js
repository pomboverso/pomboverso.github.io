import { getPrefix, normalize } from './_helpers.js'

customElements.define(
  getPrefix('stats'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #html = {
      $ul: undefined,
    }

    #template = `
    <h2>Stars</h2>

    <h3>Mako</h3>

    <div class="stars">
      <span class="icon">s</span>
    </div>

    <h3>Txori</h3>

    <div class="stars">
      <span class="icon">s</span>
    </div>

    <h3>Tui</h3>

    <div class="stars">
      <span class="icon">s</span>
    </div>

    <h3>Teyin</h3>

    <div class="stars">
      <span class="icon">s</span>
      <span class="icon">s</span>
      <span class="icon">s</span>
    </div>
    `

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true
      this.innerHTML = this.#template
    }
  }
)
