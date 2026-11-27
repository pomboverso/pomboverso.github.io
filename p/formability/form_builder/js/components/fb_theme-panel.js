import { THEMES } from "../data/themes.js";
import { store } from "../store.js";
import { render } from "../dom.js";

class ThemePanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="control-panel style">
        <div class="c-row panel-title">
          <div class="column"><h4 class="dark">Theme Panel</h4></div>
          <div class="suffix">
            <button class="btn-icon gravel-to-blue collapse-toolbox" type="button" data-collapse="toolbox" aria-expanded="true">
              <span class="sr-only">Collapse/Reveal Toolbox</span>
              <span class="icon arrow-double"></span>
            </button>
          </div>
        </div>
        <div class="scroll-area panel"><ul></ul></div>
      </div>
    `;
    this.list = this.querySelector("ul");
    this.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme]");
      if (button) store.set("form", "theme", button.dataset.theme);
    });
    store.subscribe((kind) => { if (kind === "structure") this.update(); });
    this.update();
  }

  update() {
    render(this.list, THEMES.map((theme) => {
      const active = store.state.theme === theme.key;
      return `
        <li class="control-group${active ? " active" : ""}">
          <button type="button" class="${theme.preview}" data-theme="${theme.key}" data-key="theme.${theme.key}" title="${theme.name}" aria-pressed="${active}">
            <span class="img"></span>
            <i class="theme-sample">Tt</i>
            <span class="theme-name">${theme.name}</span>
            ${active
              ? `<span class="status"><span class="icon checkmark"></span> Active</span>`
              : `<span class="btn grey-to-blue xs">Select</span>`}
          </button>
        </li>`;
    }).join(""));
  }
}

customElements.define("fb-theme-panel", ThemePanel);
