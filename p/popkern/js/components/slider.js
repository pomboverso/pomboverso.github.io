/**
 * <pk-slider name="..." label="..." min max step value>
 * Range + number input. Fires "update-value" (detail: number) on change.
 */
class Slider extends HTMLElement {
  connectedCallback() {
    const attribute = (name) => this.getAttribute(name);
    const id = `pk-slider-${attribute("name")}`;
    const limits = `min="${attribute("min")}" max="${attribute("max")}"`;

    this.innerHTML = `
      <nn-row>
        <nn-column nn-size="100%">
          <label for="${id}">${attribute("label")}</label>
        </nn-column>
        <nn-column nn-size="100%">
          <nn-row>
            <nn-column nn-size="100%-60">
              <input id="${id}" class="nn-range nn-cobalt-blue" type="range"
                ${limits} step="${attribute("step")}">
            </nn-column>
            <nn-column nn-size="60">
              <input class="nn-input" type="number" ${limits} step="any"
                aria-label="${attribute("label")}">
            </nn-column>
          </nn-row>
        </nn-column>
      </nn-row>
    `;

    const inputs = [...this.querySelectorAll("input")];
    inputs.forEach((input) => {
      input.value = attribute("value");
      input.addEventListener("input", () => {
        inputs.filter((other) => other !== input)
          .forEach((other) => (other.value = input.value));
      });
      input.addEventListener("change", () => {
        const value = parseFloat(input.value);
        if (Number.isNaN(value)) return;
        this.dispatchEvent(new CustomEvent("update-value", { detail: value }));
      });
    });
  }
}

customElements.define("pk-slider", Slider);
