import { getPrefix, normalize } from './_helpers.js'

const repoData = [
  ['mako', { name: 'MAKO', stars: 170, issues: 31 }],
  ['txori', { name: 'TXORI', stars: 48, issues: 2 }],
  ['tui', { name: 'TUI', stars: 34, issues: 5 }],
  ['teyin', { name: 'TEYIN', stars: 16, issues: 3 }],
]

customElements.define(
  getPrefix('stats'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #html = {
      $repos: undefined,
    }

    #template = `
    <h2>Stars</h2>

    <div class="repos"></div>
    `

    generateReposData() {
      const result = Object.values(repoData)
        .map(([key, stats]) => {
          const stars = Array.from(
            { length: stats.stars },
            () => '<span class="icon">★</span>'
          ).join('')

          return `
            <h3>${key} :: ${stats.stars}</h3>

            <div class="stars">
              ${stars}
            </div>`
        })
        .join('')

      this.#html.$repos.innerHTML = result
    }

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true
      this.innerHTML = this.#template
      this.#html.$repos = this.querySelector('.repos')
      this.generateReposData()
    }
  }
)
