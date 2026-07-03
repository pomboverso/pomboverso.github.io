import { getPrefix, normalize } from './_helpers.js'

customElements.define(
  getPrefix('settings'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #html = {
      $ul: undefined,
    }

    #template = `
    <h2>Theme</h2>
    <ul class="themes"></ul>
    `

    #currentTheme = ''

    #themes = [
      'Pomboverso',
      'Rama',
      'Mako',
      'Teyin',
      'Catppuccin Mocha',
      'Dracula',
      'Mélange Dark',
      'Tokyo Night',
      // 'Mono Dark',
      // 'Mono Light',
    ]

    generateThemeList() {
      const list = this.#themes
        .map(theme => {
          const value = normalize(theme, true)

          return `
        <li>
          <label>
            <input
              type="radio"
              name="theme"
              value="${value}"
              ${theme === this.#currentTheme ? 'checked' : ''}
            >
            ${theme}
          </label>
        </li>
      `
        })
        .join('')

      this.#html.$ul.innerHTML = list
    }

    initializeTheme() {
      const storedTheme = localStorage.getItem('theme')

      if (storedTheme) {
        this.#currentTheme = storedTheme
      } else {
        this.#currentTheme = this.#themes[Math.floor(Math.random() * this.#themes.length)]
      }
    }

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = this.#template
      this.#html.$ul = this.querySelector('ul.themes')

      this.#html.$ul.addEventListener('change', e => {
        if (e.target.name !== 'theme') return

        const theme = this.#themes.find(t => normalize(t, true) === e.target.value)

        if (!theme) return

        this.#currentTheme = theme
        localStorage.setItem('theme', theme)
      })

      this.initializeTheme()
      this.generateThemeList()
    }
  }
)
