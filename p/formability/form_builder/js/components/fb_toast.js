import { TOAST_MS } from "../config.js";

class Toast extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "status");
    addEventListener("fb-toast", (event) => {
      this.textContent = event.detail;
      this.classList.add("is-visible");
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.classList.remove("is-visible"), TOAST_MS);
    });
  }
}

customElements.define("fb-toast", Toast);
