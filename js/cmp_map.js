import { getPrefix, normalize } from './_helpers.js'

customElements.define(
  getPrefix('map'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #html = {
      $canvas: undefined,
    }

    #template = `
    <canvas></canvas>
    `

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = this.#template
      this.#html.$canvas = this.querySelector('canvas')

    }
  }
)
