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
    <ul class="themes"></ul>
    `

    #themes = [
      'Pomboverso',
      'Rama',
      'Mako',
      'Teyin',
      'Catppuccin Mocha',
      'Catppuccin Latte',
      'Dracula',
      'Mélange Dark',
      'Tokyo Night',
      'Mono Dark',
      'Mono Light',
    ]

    generateThemeList() {
      const list = this.#themes
        .map(
          theme => `
          <li>
            <label>
              <input
                type="radio"
                name="theme"
                class="${normalize(theme, true)}"
                value="${normalize(theme, true)}"
              >
                ${theme}
            </label>
          </li>
          `
        )
        .join('')
      this.#html.$ul.innerHTML = list
    }

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true
      this.innerHTML = this.#template
      this.#html.$ul = this.querySelector('ul.themes')
      this.generateThemeList()
    }
  }
)
