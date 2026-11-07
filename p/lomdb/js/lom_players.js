import { getPrefix, normalize, filters } from './head.js'

customElements.define(
  getPrefix('players'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = []

    #template = `
    <nn-caja padding="1rem">
      <main>
        <section>
          <h2>Players</h2>

          <a class="tip" href="https://discord.com/channels/1196745368793264128/1341876947902398517" target="_blank">
            <img src="./img/svg/cairo.svg" height="170" />
            <span>
            If you believe your user should be listed here or that any data needs correction, feel free to reach out to <nn-pill color="#3daccd">pombo</nn-pill> at discord with a screenshot of your user profile.
            </span>
          </a>

          <div class="table" role="table">
            <nn-fila break="md" class="table-header" gap=".25rem" role="row">
              <nn-pilar role="columnheader" size="20%">Server [ Current / Previous ]</nn-pilar>
              <nn-pilar role="columnheader" size="20%">UID</nn-pilar>
              <nn-pilar role="columnheader" size="35% - 0.25rem * 3">Nick</nn-pilar>
              <nn-pilar role="columnheader" size="25%">Category</nn-pilar>
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
