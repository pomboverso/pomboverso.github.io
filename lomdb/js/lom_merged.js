import { getPrefix, normalize, filters } from './head.js'

customElements.define(
  getPrefix('merges'),
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

    #generateTable(filterBy) {
      const rowFilters = filterBy.split(',')

      const container = this.querySelector('main')
      if (!container) return

      const frag = document.createDocumentFragment()

      for (const table of this.#data) {
        const matchFilter = rowFilters.some(f => table.filter_keys.includes(f))
        if (rowFilters?.[0] === '' || matchFilter) {
          const tableElement = document.createElement('section')
          tableElement.innerHTML = `<h2>${table.date}</h2>`

          const rows = []
          for (const row of table.rows) {
            const matchFilter = rowFilters.some(f =>
              row.filter_keys.includes(f)
            )
            if (rowFilters?.[0] === '' || matchFilter) {
              rows.push(row.template)
            }
          }

          tableElement.innerHTML += `
           <div class="table" role="table">
            <nn-fila break="md" class="table-header" gap=".25rem" role="row">
              <nn-pilar size="300px" role="columnheader">Leading Server</nn-pilar>
              <nn-pilar size="100% - 300px - 0.25rem" role="columnheader">Merged</nn-pilar>
            </nn-fila>
            <div class="table-body" role="rowgroup">
              ${rows.join('')}
            </div>
          </div>
          `

          frag.appendChild(tableElement)
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
      const url = this.getAttribute('data-url')

      try {
        const response = await fetch(url)
        this.#data = await response.json()

        document.addEventListener('filter-change', this.#initializeSearchBar)
        this.#initializeSearchBar()
      } catch (e) {
        console.log(e)
      }
    }
  }
)
