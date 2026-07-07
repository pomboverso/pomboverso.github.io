import { getPrefix } from './_helpers.js'

customElements.define(
  getPrefix('img'),
  class extends HTMLElement {
    static attrs = ['src', 'alt']

    #initialized = false

    #html = {
      button: null,
      dialog: null,
      img: null,
      dialogImg: null,
    }

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = `
        <button type="button">
          <img>
        </button>

        <dialog closedby="any">
          <img>
        </dialog>
      `

      this.#html.button = this.querySelector('button')
      this.#html.dialog = this.querySelector('dialog')
      this.#html.img = this.querySelector('button img')
      this.#html.dialogImg = this.querySelector('dialog img')

      for (const attr of this.constructor.attrs) {
        const value = this.getAttribute(attr)

        if (value !== null) {
          this.#html.img.setAttribute(attr, value)
          this.#html.dialogImg.setAttribute(attr, value)
        }
      }

      this.#html.button.addEventListener('click', () => {
        this.#html.dialog.showModal()
      })
    }
  }
)
