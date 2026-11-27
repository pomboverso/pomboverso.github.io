import "./fb_form-view.js";
import { store } from "../store.js";
import { icon } from "../dom.js";

class PreviewModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <dialog class="preview-modal" aria-label="Form preview">
        <div class="preview-bar">
          <strong>Preview</strong>
          <button type="button" class="btn-icon md clear-to-red" aria-label="Close preview">${icon("times")}</button>
        </div>
        <div class="preview-body work-area style"><fb-form-view></fb-form-view></div>
      </dialog>`;
    this.dialog = this.querySelector("dialog");
    this.querySelector(".preview-bar button").addEventListener("click", () => this.dialog.close());
    this.dialog.addEventListener("click", (event) => { if (event.target === this.dialog) this.dialog.close(); });
  }

  open() {
    this.querySelector(".preview-body").className = `preview-body work-area style theme-${store.state.theme}`;
    this.querySelector("fb-form-view").show(store.state);
    this.dialog.showModal();
  }
}

customElements.define("fb-preview-modal", PreviewModal);
