import { getPrefix, EVENT_SEARCH } from './_helpers.js'

customElements.define(
  getPrefix('search'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #template = `<input type="search" placeholder="filter by..." />`

    connectedCallback() {
      this.innerHTML = this.#template

      this.querySelector('input').addEventListener('input', event => {
        document.dispatchEvent(
          new CustomEvent(EVENT_SEARCH, {
            detail: { query: event.target.value.trim().toLowerCase() },
          })
        )
      })
    }
  }
)
