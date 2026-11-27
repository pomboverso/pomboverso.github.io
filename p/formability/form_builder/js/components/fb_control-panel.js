/* Toolbox: click a control to add it, or drag it onto the work area. */
import { CONTROL_GROUPS, TYPES } from "../data/element-types.js";
import { store } from "../store.js";
import { icon } from "../dom.js";
import { drag } from "../drag.js";

class ControlPanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="control-panel layout">
        <div class="c-row panel-title">
          <div class="column"><h4 class="dark">Control Panel</h4></div>
          <div class="suffix">
            <button class="btn-icon gravel-to-blue collapse-toolbox" type="button" data-collapse="toolbox" aria-expanded="true">
              <span class="sr-only">Collapse/Reveal Toolbox</span>
              <span class="icon arrow-double"></span>
            </button>
          </div>
        </div>
        <div class="scroll-area panel">
          ${CONTROL_GROUPS.map((group) => `
            <details class="control-group" open>
              <summary>${group.title} <span class="icon arrow-chevron down" aria-hidden="true"></span></summary>
              <ul>
                ${group.controls.map((type) => `
                  <li>
                    <button type="button" draggable="true" data-type="${type}" aria-label="${TYPES[type].name}" title="${TYPES[type].name}">
                      ${icon(TYPES[type].icon)} ${TYPES[type].name}
                    </button>
                  </li>`).join("")}
              </ul>
            </details>`).join("")}
        </div>
      </div>
    `;

    this.addEventListener("click", (event) => {
      const button = event.target.closest("[data-type]");
      if (!button) return;
      const id = store.add(Number(button.dataset.type));
      if (id) document.querySelector("fb-work-area").reveal(id);
    });
    this.addEventListener("dragstart", (event) => {
      const button = event.target.closest("[data-type]");
      if (!button) return;
      button.classList.add("is-dragging");
      drag.start(event, { type: Number(button.dataset.type) });
    });
    this.addEventListener("dragend", (event) => {
      event.target.closest("[data-type]")?.classList.remove("is-dragging");
      drag.end();
    });
  }
}

customElements.define("fb-control-panel", ControlPanel);
