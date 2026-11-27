import { faqs } from "../data/texts.js";

class Faqs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="faqs" class="modulo tab">
        <div class="fix">
          <img class="ribb" src="img/faqs_ribb.png" alt="Preguntas frecuentes">
          <br><br><br>
          <div class="txt" style="color:#000;">${faqs}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("ds-faqs", Faqs);
