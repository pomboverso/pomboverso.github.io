import { getPrefix } from './_helpers.js'
import projects from './arr_projects.js'

customElements.define(
  getPrefix('list'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #html = {
      $ul: undefined,
    }

    #template = `
    <ul class="list"></ul>
    `

    #renderTags(tags) {
      return tags
        .map(
          tag => `
      <button type="button" class="tag">
        ${tag}
      </button>
    `
        )
        .join('')
    }

    #renderDescription(description) {
      return description.map(p => `<p>${p}</p>`).join('')
    }

    #groupProjectsByYear(projects) {
      return Object.values(
        projects.reduce((acc, project) => {
          const year = project.date.getFullYear()

          acc[year] ??= {
            year,
            projects: [],
          }

          acc[year].projects.push(project)

          return acc
        }, {})
      ).sort((a, b) => b.year - a.year)
    }

    refreshList() {
      this.#html.$ul.innerHTML = this.#groupProjectsByYear(projects)
        .map(({ year, projects }) => {
          const projectsHtml = projects
            .map(({ org, name, category, tags, description }) => {
              return `
            <li>
              <button
                class="project-btn"
                type="button"
              >
                <span class="collapse-indicator">+</span>
                ${org} :: ${name} (${category})
              </button>

              <div class="content-area">
                ${this.#renderDescription(description)}

                <div class="tags">
                  ${this.#renderTags(tags)}
                </div>
              </div>
            </li>
          `
            })
            .join('')

          return `
        <li class="header-btn">
            ------- ${year}
        </li>
        ${projectsHtml}
      `
        })
        .join('')
    }

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = this.#template
      this.#html.$ul = this.querySelector('ul.list')
      this.refreshList()

      this.#html.$ul.addEventListener('click', event => {
        const $btn = event.target.closest('.project-btn')
        if (!$btn) return

        const $content = $btn.nextElementSibling
        if (!$content) return
        const isOpen = $content.classList.toggle('open')

        const $indicator = $btn.querySelector('.collapse-indicator')
        $indicator.textContent = isOpen ? '-' : '+'
      })
    }
  }
)
