import { getPrefix, filters, normalize } from './head.js'

customElements.define(
  getPrefix('merges-blocks'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = []

    #template = `      
      <nn-caja padding="1rem">
        <main>
          <section>
            <h2>Merge's Blocks</h2>

            <div class="table" role="table">
              <nn-fila break="sm" class="table-header" gap=".25rem" role="row">
                <nn-pilar role="columnheader" size="300px">Region :: Date</nn-pilar>
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

      const frag = document.createDocumentFragment()

      for (const row of this.#data) {
        const matchFilter = rowFilters.some(f => row.filter_keys.includes(f))
        if (rowFilters?.[0] === '' || matchFilter) {
          const tableRow = document.createElement('nn-fila')
          tableRow.classList.add('row')
          tableRow.setAttribute('gap', '.25rem')
          tableRow.setAttribute('role', 'row')
          tableRow.setAttribute('break', 'md')
          tableRow.innerHTML = row.template
          frag.appendChild(tableRow)
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
