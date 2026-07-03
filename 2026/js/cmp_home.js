import { getPrefix, EVENT_SEARCH, normalize } from './_helpers.js'
import projects from './arr_projects.js'
import { parse } from './parser.js'

customElements.define(
  getPrefix('home'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #html = {
      $ul: undefined,
    }

    #currentList = []

    #template = `
    <ul class="list"></ul>
    `

    #renderTags(tags) {
      const result = tags
        .map(
          tag => `
      <button type="button" class="tag">
        ${tag}
      </button>
    `
        )
        .join('')

      return `<div class="row-list">${result}</div>`
    }

    #renderDescription(description) {
      return !description ? '' : description.map(p => parse(p)).join('')
    }

    #renderFeatures(str) {
      if (!str) return ''
      return `<h3>Features</h3>
      <ul class="unordered-list">
        ${str.map(li => `<li><strong>${li[0]}${li?.[1] && ':'}</strong> ${li[1]}</li>`).join('')}
      </ul>
      `
    }

    #renderFeaturesList(str) {
      if (!str) return ''
      return `<h3>Features</h3>
      <ul class="unordered-list">
        ${str.map(li => `<li>${li}</li>`).join('')}
      </ul>
      `
    }

    #renderContribution(contributions) {
      if (!contributions) return ''
      return `<h3>Contributions</h3>
      <ul class="unordered-list">
        ${contributions.map(li => `<li>${li}</li>`).join('')}
      </ul>
      `
    }

    #renderStars(stars) {
      if (!stars) return ''
      return Array.from({length: stars}).map(s => `<span class="icon">⭐</span>`).join('')
    }

    #renderCta(links) {
      if (!links) return ''

      const result = Object.entries(links)
        .map(
          ([name, link]) =>
            `<a href="${link}" rel="noopener noreferrer" target="_blank" class="cta">${name}</a>`
        )
        .join('')

      return `<div class="row-list">${result}</div>`
    }

    #renderPreview({ preview, screenshots = [] } = {}) {
      let $html = ''
      if (preview) {
        $html = `<img alt="project preview" class="preview" src="${preview}">`
      }
      if (screenshots?.length > 0) {
        const imgs = screenshots.map(img => `<img alt="project preview" src="${img}">`).join('')

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

      const isSame =
        filtered.length === this.#currentList.length &&
        filtered.every((p, i) => p === this.#currentList[i])

      if (isSame) return

      this.#currentList = filtered

      this.#html.$ul.innerHTML = this.#groupProjectsByYear(filtered)
        .map(({ year, projects }) => {
          const projectsHtml = projects
            .map(
              ({
                org,
                name,
                category,
                features,
                featuresList,
                tags,
                description,
                contributions,
                link,
                completion,
                preview,
                screenshots,
              }) => {
                return `
            <li>
              <button
                class="project-btn"
                type="button"
              >
                <span class="collapse-indicator">+</span>
                ${org} :: ${name} (${category}) ${this.#renderStars(completion)}
              </button>

              <div class="content-area">
                ${this.#renderPreview({ preview, screenshots })}
                
                ${this.#renderTags([...tags, category])}
                
                ${this.#renderDescription(description)}

                ${this.#renderFeatures(features)}

                ${this.#renderFeaturesList(featuresList)}

                ${this.#renderContribution(contributions)}

                ${this.#renderCta(link)}
              </div>
            </li>
          `
              }
            )
            .join('')

          return `
        <li class="header-btn">
          ${year}
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
              detail: { query: normalize($tag) },
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
