import { getPrefix } from './head.js'

customElements.define(
  getPrefix('footer'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = {
      template: `
    <footer class="page-footer">
      <p>Built with <span class="heart"></span> by <a href="https://github.com/pomboverso" target="_BLANK">Pombo</a>.</p>
      <ul>
        <li>
          <a href="https://github.com/lomdb" target="_BLANK">github</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@LoMDB" target="_BLANK">youtube</a>
        </li>
      </ul>
      <time datetime="2025/05/05">2025.05.<a href="./budget.html" target="_self">05</a></time>
    </footer>
  `,
    }

    connectedCallback() {
      this.innerHTML = this.#data.template
    }
  }
)
