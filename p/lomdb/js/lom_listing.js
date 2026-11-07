import { getPrefix, normalize, filters } from './head.js'

customElements.define(
  getPrefix('listing'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = []

    #template = `
  <nn-caja padding="1rem">
    <main>
      <section>
        <h2 class="title"></h2>
        <div class="grid-gallery"></div>
      </section>
    </main>
  </nn-caja>
  <lom-footer></lom-footer>
    `

    #generateTable(filterBy) {
      const rowFilters = filterBy.split(',')
      const container = this.querySelector('.grid-gallery')
      if (!container) return

      const frag = document.createDocumentFragment()

      for (const row of this.#data.data) {
        const matchFilter = rowFilters.some(f => row.filter_keys.includes(f))
        if (rowFilters?.[0] === '' || matchFilter) {
          const card = document.createElement('article')
          card.classList.add('card')
          card.setAttribute('size', '510px')
          // card.setAttribute('role', 'article')
          card.innerHTML = row.template
          frag.appendChild(card)
        }
      }

      container.innerHTML = ''
      container.appendChild(frag)
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
      this.#generateTable(filter)
    }

    async connectedCallback() {
      this.innerHTML = this.#template

      const title = this.getAttribute('data-title')
      this.querySelector('.title').innerHTML = title

      const url = this.getAttribute('data-url')

      try {
        const response = await fetch(url)
        this.#data.data = await response.json()

        document.addEventListener('filter-change', this.#initializeSearchBar)
        this.#initializeSearchBar()
      } catch (e) {
        console.log(e)
      }
    }
  }
)
