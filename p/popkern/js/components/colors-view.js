import { wikiColors, paletteColors } from "../data/wiki-colors.js";
import { bkColors } from "../data/colors.js";
import { contrastRatio } from "../lib/contrast.js";

const sortedColors = () =>
  Object.values({ ...wikiColors, ...paletteColors })
    .sort((a, b) => a.lightness - b.lightness)
    .sort((a, b) => a.hue - b.hue);

const detail = (name, value) => `
  <nn-column nn-size="1/2"><p class="nn-label nn-charcoal">${name}</p></nn-column>
  <nn-column nn-size="1/2"><p class="nn-label nn-gravel">${value}</p></nn-column>
`;

const contrast = (color, background) => {
  const ratio = contrastRatio(color.hex, background.hex);
  const enough = ratio >= 7;
  return `
    <nn-column nn-size="35">
      <div class="nn-label" style="background-color: ${background.hex}; box-shadow: 0 3px 0 #17171c"></div>
    </nn-column>
    <nn-column nn-size="70%-35"><p class="nn-label nn-gravel">${background.label}</p></nn-column>
    <nn-column nn-size="30%">
      <p class="nn-label ${enough ? "nn-shamrock" : "nn-persian-red"}"
        title="${enough ? "Enough Contrast" : "Not Enough Contrast"}">${ratio.toFixed(2)}</p>
    </nn-column>
  `;
};

const swatch = (color) => `
  <li class="swatch item">
    <nn-row>
      <nn-column class="color" nn-size="100%, 250" style="background-color: ${color.hex}"></nn-column>
      <nn-column nn-size="100%">
        <p class="nn-label nn-gravel">${color.titleCase}</p>
        <nn-row>
          ${detail("Hexadecimal", color.hex)}
          ${detail("Hue", color.hue.toFixed(2))}
          ${detail("Saturation", color.saturation.toFixed(2))}
          ${detail("Lightness", color.lightness.toFixed(2))}
        </nn-row>
        <p class="nn-label nn-charcoal">Background Contrast</p>
        <nn-row>
          ${Object.values(bkColors).map((background) => contrast(color, background)).join("")}
        </nn-row>
      </nn-column>
    </nn-row>
  </li>
`;

class ColorsView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nn-scroll-area nn-color="royal-purple">
        <nn-container>
          <ul class="img-gallery">${sortedColors().map(swatch).join("")}</ul>
        </nn-container>
      </nn-scroll-area>
    `;
  }
}

customElements.define("pk-colors-view", ColorsView);
