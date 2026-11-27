import { patrocinadores } from "../data/texts.js";
import { sponsorRows } from "../data/sponsors.js";

const logo = ({ url, image }) => `
  <a href="${url}" target="_blank" rel="noopener"><img class="lpat" src="${image}" alt=""></a>
`;

class Sponsors extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="patrocinadores" class="modulo tab">
        <div class="fix">
          <img class="ribb" src="img/des-12.png" alt="Patrocinadores">
          <br><br><br>
          <div class="txt" style="color:#000;">${patrocinadores}</div>
          <br><br>
          ${sponsorRows.map((row) => row.map(logo).join("")).join("<br>")}
          <br><br>
          <div class="txt" style="color:#000;">
            Si le interesa saber cómo su empresa puede convertirse en socio comercial de
            Descubria, comuníquese con nosotros en:<br>
            patrocinadores@descubria.com.do ó socioscomerciales@descubria.com.do
            <br><br><br><br><br>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("ds-sponsors", Sponsors);
