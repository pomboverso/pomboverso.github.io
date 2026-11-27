import { attractions } from "../data/attractions.js";

/** One page per attraction; its illustration is set in css/stl.css by id. */
class AttractionPages extends HTMLElement {
  connectedCallback() {
    this.innerHTML = attractions.map(({ id, title, text }) => `
      <div id="${id}" class="modulo atracciones">
        <div class="fix">
          <div class="tit">${title}</div>
          <div class="txt">${text}</div>
        </div>
      </div>
    `).join("");
  }
}

customElements.define("ds-attraction-pages", AttractionPages);
