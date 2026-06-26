import { getPrefix, EVENT_SEARCH } from './_helpers.js'
import projects from './arr_projects.js'
import { parse } from './parser.js'

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
      return description.map(p => parse(p)).join('')
    }

    #renderCta(links) {
      return Object.entries(links)
        .map(
          ([name, link]) =>
            `<a href="${link}" rel="noopener noreferrer" target="_blank" class="cta">${name}</a>`
        )
        .join('')
    }

    #renderPreview({ preview, screenshots = [] } = {}) {
      let $html
      if (preview) {
        $html = `<img alt="project preview" class="preview" src="${preview}">`
      }
      if (screenshots?.length > 0) {
        const imgs = screenshots
          .map(img => `<img alt="project preview" class="preview" src="${img}">`)
          .join('')

        $html += `<div class="gallery">${imgs}</div>`
      }
      return $html
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

    #matchesQuery(project, query) {
      if (!query) return true
      return (
        project.date.getFullYear().toString().includes(query) ||
        project.org.toLowerCase().includes(query) ||
        project.name.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    refreshList(query = '') {
      const filtered = projects.filter(p => this.#matchesQuery(p, query))

      this.#html.$ul.innerHTML = this.#groupProjectsByYear(filtered)
        .map(({ year, projects }) => {
          const projectsHtml = projects
            .map(({ org, name, category, tags, description, link, preview, screenshots }) => {
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
                ${this.#renderPreview({ preview, screenshots })}
                ${this.#renderDescription(description)}

                <div class="tags">
                  ${this.#renderCta(link)}
                  <span class="separator"></span>
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

      document.addEventListener(EVENT_SEARCH, event => {
        this.refreshList(event.detail.query)
      })

      this.#html.$ul.addEventListener('click', event => {
        const $tag = event.target.closest('.tag')
        if ($tag) {
          document.dispatchEvent(
            new CustomEvent(EVENT_SEARCH, {
              detail: { query: $tag.textContent.trim().toLowerCase() },
            })
          )
          return
        }

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
