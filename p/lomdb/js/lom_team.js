import { getPrefix } from './head.js'

customElements.define(
  getPrefix('team'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = []

    #template = `
    <nn-caja padding="1rem">
      <main></main>
    </nn-caja>

    <lom-footer></lom-footer>
  `

    async connectedCallback() {
      this.innerHTML = this.#template
      const url = this.getAttribute('data-url')
    }
  }
)
