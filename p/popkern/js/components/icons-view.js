import "./icon-card.js";
import { icons } from "../data/icons.js";
import { store } from "../store.js";

class IconsView extends HTMLElement {
  connectedCallback() {
    const cards = Object.keys(icons)
      .map((icon) => `<li class="icon-item item"><pk-icon-card icon="${icon}"></pk-icon-card></li>`)
      .join("");

    this.innerHTML = `
      <nn-scroll-area nn-color="royal-purple">
        <nn-container>
          <ul class="img-gallery">${cards}</ul>
        </nn-container>
      </nn-scroll-area>
    `;

    const area = this.querySelector("nn-scroll-area");
    this.unsubscribe = store.subscribe((state) =>
      area.classList.toggle("fall-back", state.fallBackIcons)
    );
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define("pk-icons-view", IconsView);
