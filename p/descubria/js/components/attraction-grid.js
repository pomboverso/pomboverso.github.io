import { attractionButtons, attractions } from "../data/attractions.js";

/** "Atracciones" page: buttons in rows of three. */
class AttractionGrid extends HTMLElement {
  connectedCallback() {
    const buttons = attractionButtons.map(({ page, image }, index) => {
      const { title } = attractions.find((item) => item.id === page);
      const lineBreak = index % 3 === 2 ? "<br>" : "";
      return `<img class="lnk" data-go="${page}" role="link" tabindex="0"
        src="${image}" alt="${title}">\n${lineBreak}`;
    }).join("");

    this.innerHTML = `
      <div id="atracciones" class="modulo tab">
        <div class="fix">
          <img class="ribb" src="img/des-28.png" alt="Atracciones">
          <br><br><br>
          ${buttons}
        </div>
      </div>
    `;
  }
}

customElements.define("ds-attraction-grid", AttractionGrid);
