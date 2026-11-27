import { isOn } from "./helpers.js";

/**
 * <nn-btn nn-mode="flat|nav|ghost" nn-color="shamrock" nn-glyph="bars"
 *         nn-text="Label" nn-direction="left" nn-active title="...">
 * Add nn-tag="a" nn-href="..." nn-target="_blank" to render a link.
 */
class Btn extends HTMLElement {
  static observedAttributes = [
    "nn-mode", "nn-color", "nn-glyph", "nn-text", "nn-direction", "nn-active",
    "nn-href", "nn-target", "title",
  ];

  connectedCallback() {
    if (!this.control) {
      const tag = this.getAttribute("nn-tag") || "button";
      this.control = document.createElement(tag);
      if (tag === "button") this.control.type = "button";
      this.icon = document.createElement("nn-icon");
      this.caption = document.createElement("span");
      this.caption.className = "caption";
      this.control.append(this.icon, this.caption);
      this.replaceChildren(this.control);
    }
    this.update();
  }

  attributeChangedCallback() {
    if (this.control) this.update();
  }

  update() {
    const { control, icon, caption } = this;
    const mode = this.getAttribute("nn-mode") || "flat";
    const color = this.getAttribute("nn-color") || "silver";
    control.className = `nn-btn nn-${mode} nn-${color}`;
    control.classList.toggle("nn-active", isOn(this, "nn-active"));

    const glyph = this.getAttribute("nn-glyph");
    icon.hidden = !glyph;
    if (glyph) icon.setAttribute("nn-glyph", glyph);
    icon.setAttribute("nn-direction", this.getAttribute("nn-direction") || "down");

    const text = this.getAttribute("nn-text") || "";
    caption.textContent = text;
    caption.hidden = !text;

    const label = this.getAttribute("title") || text || glyph || "";
    control.title = label;
    control.setAttribute("aria-label", label);

    for (const name of ["href", "target"]) {
      const value = this.getAttribute(`nn-${name}`);
      if (value) control.setAttribute(name, value);
    }
    if (control.target === "_blank") control.rel = "noopener";
  }
}

customElements.define("nn-btn", Btn);
