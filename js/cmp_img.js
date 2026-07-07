import { getPrefix } from './_helpers.js'

customElements.define(
  getPrefix('img'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    static attrs = ['src', 'alt', 'uid']

    #initialized = false

    #html = {
      $img: undefined,
      $dialogImg: undefined,
    }

    #template = `
    <button command="show-modal" commandfor="zoom-img">
      <img src="" alt="">
    </button>

    <dialog id="zoom-img" closedby="any">
      <img src="" alt="">
    </dialog>
    `

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = this.#template

      this.#html.$img = this.querySelector('button img')
      this.#html.$dialogImg = this.querySelector('dialog img')

      this.constructor.attrs.forEach(key => {
        const value = this.getAttribute(key)
        this.#html.$img.setAttribute(key, value)
        this.#html.$dialogImg.setAttribute(key, value)
      })
    }
  }
)
