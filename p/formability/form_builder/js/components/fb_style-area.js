import "./fb_form-view.js";
import { store } from "../store.js";

class StyleArea extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="scroll-area workarea work-area style"><fb-form-view></fb-form-view></div>`;
    this.area = this.firstElementChild;
    this.view = this.querySelector("fb-form-view");
    store.subscribe((kind) => { if (kind !== "select" && !this.hidden) this.update(); });
    new MutationObserver(() => { if (!this.hidden) this.update(); })
      .observe(this, { attributes: true, attributeFilter: ["hidden"] });
    if (!this.hidden) this.update();
  }

  update() {
    this.area.className = `scroll-area workarea work-area style theme-${store.state.theme}`;
    this.view.show(store.state);
  }
}

customElements.define("fb-style-area", StyleArea);
