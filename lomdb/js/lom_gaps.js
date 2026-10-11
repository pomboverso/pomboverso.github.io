import { getPrefix, normalize, filters } from './head.js'

customElements.define(
  getPrefix('gaps'),
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
          tableElement.innerHTML = `<h2>${table.title}</h2>`

          const rows = []
          for (let c = table.range.starts; c <= table.range.ends; c++) {
            if (!table.missing_servers.includes(c)) {
              rows.push(
                `<nn-pilar class="${table.filter_keys}">${c}</nn-pilar>`
              )
            } else {
              rows.push(
                `<nn-pilar class="${table.filter_keys} missing" data-tooltip="Missing Entry / Not Merged">${c}</nn-pilar>`
              )
            }
          }

          tableElement.innerHTML += `
            <nn-fila class="table-body">
              ${rows.join('')}
            </nn-fila>
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
