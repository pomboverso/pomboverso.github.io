import { getPrefix } from './head.js'

window.customElements.define(
  getPrefix('video'),
  class extends HTMLElement {
    static get observedAttributes() {
      return ['url', 'format', 'width']
    }

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = `
        <style>
          video {
            width: 100%;
          }
        </style>
        <video controls preload="metadata" loading="lazy">
          <source />
          Your browser does not support the video tag.
        </video>
      `
      this.$video = this.shadowRoot.querySelector('video')
      this.$source = this.shadowRoot.querySelector('source')
    }

    connectedCallback() {
      this.#update()
    }

    attributeChangedCallback() {
      this.#update()
    }

    #update() {
      const url = this.getAttribute('url')
      const format = this.getAttribute('format') || 'video/mp4'
      const width = this.getAttribute('width')

      if (url) this.$source.src = url
      this.$source.type = format
      if (width) this.$video.width = width
    }
  }
)
