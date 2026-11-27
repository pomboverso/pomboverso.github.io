import { store } from "../store.js";

/** Side panel of the Icons section. */
class IconsPanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nn-scroll-area nn-color="royal-purple">
        <nn-row class="row-block">
          <nn-column nn-size="100%">
            <legend>Options</legend>
            <nn-btn nn-text="Test Fallback Icons" nn-color="gold-tips"></nn-btn>
          </nn-column>
        </nn-row>
      </nn-scroll-area>
    `;

    const button = this.querySelector("nn-btn");
    button.addEventListener("click", () => store.toggle("fallBackIcons"));
    this.unsubscribe = store.subscribe((state) =>
      button.setAttribute("nn-active", state.fallBackIcons)
    );
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define("pk-icons-panel", IconsPanel);
