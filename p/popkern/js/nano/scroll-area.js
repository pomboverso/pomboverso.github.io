import { swapClass } from "./helpers.js";

/** <nn-scroll-area nn-color="royal-purple" nn-no-horizontal> */
class ScrollArea extends HTMLElement {
  static observedAttributes = ["nn-color"];

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const color = `nn-${this.getAttribute("nn-color") || "silver"}`;
    swapClass(this, this.colorClass, color);
    this.colorClass = color;
  }
}

customElements.define("nn-scroll-area", ScrollArea);
