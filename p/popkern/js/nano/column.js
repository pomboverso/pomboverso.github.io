import { toCss } from "./size.js";

/** <nn-column nn-size="width, height"> */
class Column extends HTMLElement {
  static observedAttributes = ["nn-size"];

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const [width = "", height = ""] = (this.getAttribute("nn-size") || "").split(",");
    const cssWidth = toCss(width);
    this.style.flexBasis = cssWidth;
    this.style.maxWidth = cssWidth;
    if (height) this.style.height = toCss(height);
  }
}

customElements.define("nn-column", Column);
