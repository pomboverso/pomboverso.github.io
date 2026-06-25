import { getPrefix, EVENT_SEARCH } from './_helpers.js'

const PARAM = 'filterby'

customElements.define(
  getPrefix('search'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #template = `<input type="search" placeholder="filter by..." />`

    #dispatch(query) {
      document.dispatchEvent(
        new CustomEvent(EVENT_SEARCH, {
          detail: { query },
        })
      )
    }

    #updateUrl(query) {
      const params = new URLSearchParams(window.location.search)

      if (query) {
        params.set(PARAM, query)
      } else {
        params.delete(PARAM)
      }

      const next = params.size ? `?${params}` : window.location.pathname
      history.replaceState(null, '', next)
    }

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = this.#template

      const $input = this.querySelector('input')

      $input.addEventListener('input', event => {
        const query = event.target.value.trim().toLowerCase()
        this.#updateUrl(query)
        this.#dispatch(query)
      })

      document.addEventListener(EVENT_SEARCH, event => {
        const query = event.detail.query
        this.#updateUrl(query)
        if (document.activeElement !== $input) {
          $input.value = query
        }
      })

      const initial = new URLSearchParams(window.location.search).get(PARAM)
      if (initial) {
        $input.value = initial
        this.#dispatch(initial)
      }
    }
  }
)
