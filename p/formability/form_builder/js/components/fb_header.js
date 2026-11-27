import { store } from "../store.js";
import { onPageChange } from "../router.js";
import { esc, icon, toast } from "../dom.js";

const TABS = [
  { page: "layout", text: "Layout", glyph: "build" },
  { page: "style", text: "Style", glyph: "style" },
  { text: "Workflow", glyph: "workflow" },
  { text: "Settings", glyph: "settings" },
];

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="app-header">
        <div class="app-logo"><img src="img/logo.png" alt="Formability" width="34" height="34"></div>
        <div class="title-field">
          <input class="builder-title" data-bind="form.title" data-key="form.title" aria-label="Form title" value="${esc(store.state.title)}">
          <button type="button" class="btn-icon lg edit-title" data-action="edit-title" aria-label="Edit form title" title="Edit title">${icon("pencil")}</button>
        </div>
        <div class="version-info">
          <button type="button" class="version-history" data-action="history">version history <span class="icon arrow-chevron down" aria-hidden="true"></span></button>
          <span class="save-state">${icon("checkmark")} demo, changes are not saved</span>
        </div>
        <button type="button" class="user-menu" data-action="user">
          <span class="initials" aria-hidden="true">DU</span> <span class="user-name">Demo User</span> <span class="icon arrow-chevron down" aria-hidden="true"></span>
        </button>
      </header>
      <nav class="builder-header">
        <ul class="builder-tabs left-panel form">
          ${TABS.map((tab) => `
            <li>
              <button type="button" ${tab.page ? `data-go="${tab.page}"` : `data-action="tab" data-name="${tab.text}"`}>
                ${icon(tab.glyph)} <span>${tab.text}</span>
              </button>
            </li>`).join("")}
        </ul>
        <div class="right-panel">
          <button type="button" class="btn-icon lg round-action" data-action="undo" aria-label="Undo" title="Undo">${icon("undo")}</button>
          <button type="button" class="btn-icon lg round-action" data-action="redo" aria-label="Redo" title="Redo">${icon("redo")}</button>
          <button type="button" class="btn-icon lg round-action share-action" data-action="share" aria-label="Share" title="Share">${icon("share")}</button>
          <button type="button" class="btn grey view" data-action="preview" aria-label="Preview">${icon("preview")} <span class="caption">Preview</span></button>
          <button type="button" class="btn green publish" data-action="publish">${icon("form-approve")} <span>Publish</span> <span class="icon arrow-chevron down" aria-hidden="true"></span></button>
        </div>
      </nav>
    `;

    this.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (action === "undo") store.undo();
      if (action === "redo") store.redo();
      if (action === "preview") document.querySelector("fb-preview-modal").open();
      if (action === "publish") toast("Demo only: nothing was published.");
      if (action === "edit-title") this.querySelector(".builder-title").select();
      if (action === "history") toast("Version history is not included in this demo.");
      if (action === "user") toast("Demo only: there are no accounts.");
      if (action === "share") toast("Sharing is not included in this demo.");
      if (action === "tab") toast(`${event.target.closest("[data-name]").dataset.name} is not included in this demo.`);
    });

    const refresh = (kind) => {
      this.querySelector('[data-action="undo"]').disabled = !store.canUndo;
      this.querySelector('[data-action="redo"]').disabled = !store.canRedo;
      if (kind === "structure") this.querySelector(".builder-title").value = store.state.title;
    };
    store.subscribe(refresh);
    refresh();

    onPageChange((page) => {
      for (const button of this.querySelectorAll("[data-go]")) {
        const active = button.dataset.go === page;
        button.classList.toggle("active", active);
        button.parentElement.toggleAttribute("aria-current", active);
        if (active) button.parentElement.setAttribute("aria-current", "page");
      }
    });
  }
}

customElements.define("fb-header", Header);
