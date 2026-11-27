/** Live viewport size and aspect ratio. */
class RulerView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nn-scroll-area nn-color="royal-purple">
        <h2>{ <span data-width></span> x <span data-height></span> }px</h2>
        <h3>[ <span data-ratio></span> ]</h3>
      </nn-scroll-area>
    `;

    const set = (name, value) => {
      this.querySelector(`[data-${name}]`).textContent = value;
    };

    this.measure = () => {
      const { clientWidth: width, clientHeight: height } = document.documentElement;
      set("width", width);
      set("height", height);
      set("ratio", (width / height).toFixed(2));
    };

    addEventListener("resize", this.measure);
    this.measure();
  }

  disconnectedCallback() {
    removeEventListener("resize", this.measure);
  }
}

customElements.define("pk-ruler-view", RulerView);
