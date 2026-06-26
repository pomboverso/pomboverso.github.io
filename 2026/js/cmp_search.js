import { getPrefix, EVENT_SEARCH } from './_helpers.js'
import skill from './obj_skill.js'
import category from './obj_category.js'

const PARAM = 'filterby'

customElements.define(
  getPrefix('search'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #html = {
      $input: undefined,
      $tags: undefined,
    }

    #template = `
    <div class="searchbar">
      <input type="search" placeholder="filter by..." />
    </div>
    <div class="tags">
      ${this.#generateTags()}
    </div>
    `

    #generateTags() {
      return [...Object.values(category), ...Object.values(skill)]
        .map(tag => `<button type="button" class="tag" data-tag="${tag}">${tag}</button>`)
        .join('')
    }

    #dispatch(query) {
      const normalized = query.trim().toLowerCase()
      document.dispatchEvent(
        new CustomEvent(EVENT_SEARCH, {
          detail: { query: normalized },
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

      this.#html.$input = this.querySelector('input')
      this.#html.$tags = [...this.querySelectorAll('.tag')]

      this.#html.$input.addEventListener('input', event => {
        const query = event.target.value
        this.#updateUrl(query)
        this.#dispatch(query)
      })

      this.#html.$tags.forEach($tag => {
        $tag.addEventListener('click', () => {
          const query = $tag.dataset.tag

          this.#html.$input.value = query
          this.#updateUrl(query)
          this.#dispatch(query)
        })
      })

      document.addEventListener(EVENT_SEARCH, event => {
        const query = event.detail.query
        this.#updateUrl(query)
        if (document.activeElement !== this.#html.$input) {
          this.#html.$input.value = query
        }
      })

      const initial = new URLSearchParams(window.location.search).get(PARAM)
      if (initial) {
        this.#html.$input.value = initial
        this.#dispatch(initial)
      }
    }
  }
)
