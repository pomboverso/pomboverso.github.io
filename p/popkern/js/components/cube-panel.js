import "./slider.js";
import { store } from "../store.js";

const TOGGLES = { grid: "Grid", pause: "Pause", lines: "Lines" };

/** Side panel of the Color Cube section. */
class CubePanel extends HTMLElement {
  connectedCallback() {
    const toggles = Object.entries(TOGGLES)
      .map(([key, caption]) => `
        <nn-row>
          <nn-column nn-size="100%">
            <nn-btn data-toggle="${key}" nn-color="charcoal" nn-text="${caption}"></nn-btn>
          </nn-column>
        </nn-row>
      `)
      .join("");

    this.innerHTML = `
      <nn-scroll-area nn-color="royal-purple">
        <nn-row class="row-block">
          <nn-column nn-size="100%">
            <legend>Scene Controllers</legend>
            <pk-slider name="rotation" label="Rotation" min="-20" max="20" step="0.01"
              value="${store.state.sceneRotation}"></pk-slider>
            ${toggles}
          </nn-column>
        </nn-row>
      </nn-scroll-area>
    `;

    this.querySelector("pk-slider").addEventListener("update-value", (event) =>
      store.set("sceneRotation", event.detail)
    );

    this.addEventListener("click", this.onClick);

    this.unsubscribe = store.subscribe((state) => {
      this.querySelectorAll("[data-toggle]").forEach((button) =>
        button.setAttribute("nn-active", state[button.dataset.toggle])
      );
    });
  }

  onClick(event) {
    const button = event.target.closest("[data-toggle]");
    if (button) store.toggle(button.dataset.toggle);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
    this.unsubscribe();
  }
}

customElements.define("pk-cube-panel", CubePanel);
