import { getPrefix } from './_helpers.js'
import repoData from './data_stats.js'

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
            () => '<span class="icon">⭐</span>'
          ).join('')

          return `
            <h3>${key.charAt(0).toUpperCase() + key.slice(1)} :: ${stats.stars}</h3>

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
