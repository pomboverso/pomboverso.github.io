import "./components/fb_header.js";
import "./components/fb_control-panel.js";
import "./components/fb_work-area.js";
import "./components/fb_config-panel.js";
import "./components/fb_theme-panel.js";
import "./components/fb_style-area.js";
import "./components/fb_preview-modal.js";
import "./components/fb_toast.js";
import { COMPACT_WIDTH } from "./config.js";
import { store } from "./store.js";
import { goTo, onPageChange } from "./router.js";

class App extends HTMLElement {
  connectedCallback() {
    this.className = "form-builder app-builder";
    this.innerHTML = `
      <fb-header></fb-header>
      <main class="builder">
        <fb-control-panel></fb-control-panel>
        <fb-work-area></fb-work-area>
        <fb-config-panel></fb-config-panel>
        <fb-theme-panel hidden></fb-theme-panel>
        <fb-style-area hidden></fb-style-area>
      </main>
      <fb-preview-modal></fb-preview-modal>
      <fb-toast></fb-toast>
    `;

    if (innerWidth <= COMPACT_WIDTH) {
      this.togglePanel("toolbox");
      this.togglePanel("settings");
    }

    onPageChange((page) => {
      this.dataset.view = page;
      const style = page === "style";
      for (const tag of ["fb-control-panel", "fb-work-area", "fb-config-panel"]) this.querySelector(tag).hidden = style;
      for (const tag of ["fb-theme-panel", "fb-style-area"]) this.querySelector(tag).hidden = !style;
    });

    this.addEventListener("click", (event) => {
      const go = event.target.closest("[data-go]");
      if (go) goTo(go.dataset.go);
      const collapse = event.target.closest("[data-collapse]");
      if (collapse) this.togglePanel(collapse.dataset.collapse);
    });

    const bound = (event) => event.target.closest?.("[data-bind]");
    this.addEventListener("input", (event) => {
      const input = bound(event);
      if (!input || input.matches("select, [type=checkbox], [type=radio]")) return;
      const [id, prop] = input.dataset.bind.split(".");
      store.type(id, prop, input.value);
    });
    this.addEventListener("change", (event) => {
      const input = bound(event);
      if (!input || !input.matches("select, [type=checkbox], [type=radio]")) return;
      const [id, prop] = input.dataset.bind.split(".");
      let value = input.value;
      if (input.type === "checkbox") value = input.checked;
      else if (input.dataset.kind === "boolean") value = value === "true";
      else if (input.dataset.kind === "number") value = Number(value);
      store.set(id, prop, value);
    });

    store.subscribe((kind) => {
      if (kind !== "text") return;
      for (const input of this.querySelectorAll("input[data-bind], textarea[data-bind]")) {
        if (input === document.activeElement || input.matches("[type=checkbox], [type=radio]")) continue;
        const [id, prop] = input.dataset.bind.split(".");
        const value = store.find(id)?.[prop];
        if (value !== undefined && input.value !== value) input.value = value;
      }
    });

    addEventListener("keydown", (event) => {
      if (!(event.ctrlKey || event.metaKey) || document.querySelector("dialog[open]")) return;
      const key = event.key.toLowerCase();
      if (key === "z" && !event.shiftKey) { event.preventDefault(); store.undo(); }
      else if (key === "y" || (key === "z" && event.shiftKey)) { event.preventDefault(); store.redo(); }
    });
  }

  togglePanel(name) {
    const collapsed = this.classList.toggle(`${name}-collapsed`);
    for (const button of this.querySelectorAll(`[data-collapse="${name}"]`)) button.setAttribute("aria-expanded", !collapsed);
    if (name === "toolbox" && collapsed) this.querySelectorAll("fb-control-panel details").forEach((group) => { group.open = true; });
  }
}

customElements.define("fb-app", App);
