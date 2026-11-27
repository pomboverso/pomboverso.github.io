import { isOn, swapClass } from "./helpers.js";

const DIRECTIONS = { down: 0, left: 90, up: 180, right: 270 };

/** <nn-icon nn-glyph="times" nn-direction="left|45|..." nn-flip="true"> */
class Icon extends HTMLElement {
  static observedAttributes = ["nn-glyph", "nn-direction", "nn-flip"];

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const glyph = this.getAttribute("nn-glyph");
    const glyphClass = glyph ? `nn-icon-${glyph}` : "";
    swapClass(this, this.glyphClass, glyphClass);
    this.glyphClass = glyphClass;

    const direction = this.getAttribute("nn-direction") || "down";
    const degrees = DIRECTIONS[direction] ?? Number(direction);
    this.style.setProperty("--nn-rotate", `${degrees || 0}deg`);
    this.style.setProperty("--nn-flip", isOn(this, "nn-flip") ? -1 : 1);
  }
}

customElements.define("nn-icon", Icon);
