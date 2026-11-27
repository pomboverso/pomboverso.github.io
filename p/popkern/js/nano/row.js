/** <nn-row nn-spacing="0.25"> */
class Row extends HTMLElement {
  static observedAttributes = ["nn-spacing"];

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const spacing = this.getAttribute("nn-spacing");
    if (spacing) this.style.setProperty("--nn-spacing", `${spacing}rem`);
    this.classList.toggle("nn-spaced", Boolean(spacing));
  }
}

customElements.define("nn-row", Row);
