import { getPrefix } from './_helpers.js'

customElements.define(
  getPrefix('search'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #template = `<input type="search" />`

    connectedCallback() {
        this.innerHTML = this.#template
    }
  }
)
