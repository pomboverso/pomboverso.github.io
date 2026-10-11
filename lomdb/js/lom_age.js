import { getPrefix, filters, normalize } from './head.js'

customElements.define(
  getPrefix('age'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = []

    #template = `      
      <nn-caja padding="1rem">
        <main>
          <section>
            <h2>Server Openings</h2>

            <div class="table" role="table">
              <nn-fila break="sm" class="table-header" gap=".25rem" role="row">
                <nn-pilar role="columnheader" size="300px">Years / Days / Size</nn-pilar>
                <nn-pilar role="columnheader" size="100% - 300px - 0.25rem">Servers</nn-pilar>
              </nn-fila>
              <div class="table-body" role="rowgroup"></div>
            </div>
          </section>
        </main>
      </nn-caja>

      <lom-footer></lom-footer>
  `

    #generateTable(filterBy) {
      const rowFilters = filterBy.split(',')
      const container = this.querySelector('.table-body')
      if (!container) return

      container.innerHTML = this.#data
        .filter(
          row =>
            rowFilters[0] === '' ||
            rowFilters.some(f =>
              row.filter_keys.includes(f)
            )
        )
        .map(row => row.template)
        .join('')
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

      const url = this.getAttribute('data-url')

      try {
        const response = await fetch(url)
        this.#data = await response.json()

        document.addEventListener(
          'filter-change',
          this.#initializeSearchBar
        )
        this.#initializeSearchBar()
      } catch (e) {
        console.log(e)
      }
    }
  }
)
