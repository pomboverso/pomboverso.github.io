/* Configuration Panel for the selected element (a subset of the original Define / Configure / Metadata tabs). */
import { TYPES, T, GRID_LAYOUTS, INPUT_FORMATS, DATE_MODES, can } from "../data/element-types.js";
import { store } from "../store.js";
import { esc, attr, options, render } from "../dom.js";

const bind = (e, prop) => `data-bind="${e.id}.${prop}" data-key="cfg.${e.id}.${prop}" id="cfg-${prop}"`;

const block = (id, html) => `<div class="panel-block" id="${id}"><div class="panel-item">${html}</div></div>`;

const text = (e, prop, label, placeholder = "", type = "text") => `
  <label for="cfg-${prop}">${label}</label>
  <input type="${type}" ${bind(e, prop)} value="${esc(e[prop])}" placeholder="${esc(placeholder)}"${attr('min="0"', type === "number")}>`;

const area = (e, prop, label, placeholder = "") => `
  <label for="cfg-${prop}">${label}</label>
  <textarea rows="2" ${bind(e, prop)} placeholder="${esc(placeholder)}">${esc(e[prop])}</textarea>`;

const select = (e, prop, label, map, kind = "") => `
  <label for="cfg-${prop}">${label}</label>
  <select ${bind(e, prop)}${kind && ` data-kind="${kind}"`}>${options(map, e[prop])}</select>`;

const yesNo = (e, prop, title) => `
  <fieldset>
    <legend>${title}</legend>
    ${[true, false].map((value) => `
      <div class="radio-inline">
        <input type="radio" id="cfg-${prop}-${value}" name="cfg-${prop}" value="${value}" data-kind="boolean"
               data-bind="${e.id}.${prop}" data-key="cfg.${e.id}.${prop}.${value}"${attr("checked", e[prop] === value)}>
        <label for="cfg-${prop}-${value}">${value ? "Yes" : "No"}</label>
      </div>`).join("")}
  </fieldset>`;

const matrix = (e, prop, title, choices) => `
  <fieldset>
    <legend>${title}</legend>
    <div class="btn-matrix">
      ${choices.map(([value, name, glyph]) => `
        <button type="button" class="${e[prop] === value ? "active" : ""}" aria-pressed="${e[prop] === value}"
                data-set="${prop}" data-value="${value}" data-key="cfg.${e.id}.${prop}.${value}">
          <span class="icon ${glyph}"></span> ${name}
        </button>`).join("")}
    </div>
  </fieldset>`;

const group = (name, blocks) => {
  const html = blocks.filter(Boolean).join("");
  return html && `<details class="control-group" data-group="${name}" open><summary>${name}</summary>${html}</details>`;
};

const define = (e) => group("Define", [
  can(e, "verticalAlign") && block("pn-vertical-align", matrix(e, "valign", "Items Vertical Alignment",
    [["top", "Top", "arrow-align up"], ["center", "Center", "arrow-align-center vertical"], ["bottom", "Bottom", "arrow-align down"]])),
  can(e, "sizeableFont") && block("pn-font-size", matrix(e, "fontSize", "Font size",
    [["large", "Large", "fontsize f-lg"], ["medium", "Medium", "fontsize f-md"], ["small", "Small", "fontsize f-sm"]])),
  can(e, "labelable") && block("pn-label", area(e, "label", "Label", "Enter a label...")),
  (e.type === T.paragraph || e.type === T.validator) && block("pn-text", area(e, "text", e.type === T.paragraph ? "Text" : "Validation message")),
  e.type === T.pageBreak && block("pn-page-break", text(e, "endOf", "End of page title") + text(e, "startOf", "Next page title")),
  can(e, "helpTextable") && block("pn-tooltip", area(e, "help", "Tooltip", "Help text for this field")),
  can(e, "resizable") && block("pn-frame-shape", select(e, "frameShape", "Frame Shape", { rectangle: "Rectangle", square: "Square", circle: "Circle" })),
  can(e, "resizable") && block("pn-frame-dimension", `
    <div class="c-row layout">
      <div class="column">${text(e, "frameWidth", "Width (px)", "pixels", "number")}</div>
      ${e.frameShape === "rectangle" ? `<div class="column">${text(e, "frameHeight", "Height (px)", "pixels", "number")}</div>` : ""}
    </div>`),
  can(e, "fileMode") && block("pn-upload-mode", select(e, "multiple", "Upload Mode", { false: "Single file", true: "Multiple files" })),
  can(e, "fileMode") && block("pn-individual-max-file-size", text(e, "maxFile", "Individual Max File Size (MB)", "Up to 99 MB", "number")),
  can(e, "fileMode") && block("pn-total-max-file-size", text(e, "maxTotal", "Total File Size Limit (MB)", "Up to 256 MB", "number")),
  can(e, "layoutable") && block("pn-column-layout-grid", select(e, "layout", "Column Layout",
    Object.fromEntries(Object.entries(GRID_LAYOUTS).map(([key, widths]) => [key, `${widths.length} columns (${widths.join(" / ")})`])))),
  can(e, "columnable") && block("pn-column-layout-radio-checkbox", select(e, "columns", "Column Layout", { 1: "1", 2: "2", 3: "3", 4: "4" }, "number")),
  can(e, "placeholderable") && block("pn-placeholder", area(e, "placeholder", "Placeholder", "This is a placeholder")),
  e.type === T.dropdown && block("pn-placeholder-dropdown", text(e, "placeholder", "Placeholder", "Select one...")),
  e.type === T.dropdown && block("pn-default-option", select(e, "defaultOption", "Default Option",
    { "": "None", ...Object.fromEntries(e.options.map((o, i) => [o.id, o.label || `Option ${i + 1}`])) })),
  can(e, "defaultable") && block("pn-default-value-input", area(e, "defaultValue", "Default Value", "Enter a default value")),
]);

const configure = (e) => group("Configure", [
  can(e, "requireable") && block("pn-required", yesNo(e, "required", "Required?")),
  can(e, "readonlyable") && block("pn-readonly", yesNo(e, "readonly", "Read only?")),
  can(e, "repeatable") && block("pn-repeatable", yesNo(e, "repeatable", "Repeatable?")),
  can(e, "formatable") && block("pn-format", select(e, "format", "Input Format", INPUT_FORMATS)),
  can(e, "lengthable") && block("pn-length", `
    <div class="c-row layout">
      <div class="column">${text(e, "minLength", "Min characters", "Min", "number")}</div>
      <div class="column">${text(e, "maxLength", "Max characters", "Max", "number")}</div>
    </div>`),
  can(e, "dateMinMaxable") && block("pn-date", select(e, "mode", "Date Picker Mode", DATE_MODES)
    + text(e, "min", "Earliest", "", e.mode) + text(e, "max", "Latest", "", e.mode)),
]);

const metadata = (e) => group("Add Metadata", [
  can(e, "referenceable") && block("pn-reference", text(e, "reference", "Reference Name", "e.g. applicant_email")),
]);

class ConfigPanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="config-panel layout">
        <div class="c-row panel-title">
          <div class="prefix">
            <button class="btn-icon gravel-to-blue collapse-settings" type="button" data-collapse="settings" aria-expanded="true">
              <span class="sr-only">Collapse/Reveal Configuration Panel</span>
              <span class="icon arrow-double"></span>
            </button>
          </div>
          <div class="column config-title">
            <h4 class="dark">Configure</h4>
            <span class="selected-element"></span>
          </div>
        </div>
        <div class="panel-content"></div>
      </div>
    `;
    this.content = this.querySelector(".panel-content");
    this.selectedName = this.querySelector(".selected-element");

    this.addEventListener("click", (event) => {
      const button = event.target.closest("[data-set]");
      if (button) store.set(store.selected.id, button.dataset.set, button.dataset.value);
    });

    store.subscribe((kind) => { if (kind !== "text") this.update(); });
    this.update();
  }

  update() {
    const element = store.selected;
    this.querySelector(".config-panel").classList.toggle("element-selected", Boolean(element));
    if (!element) {
      this.selectedName.innerHTML = "";
      this.content.innerHTML = `<div class="empty-box"><p>Select a control to customize it</p></div>`;
      return;
    }
    const open = {};
    this.content.querySelectorAll("details").forEach((d) => { open[d.dataset.group] = d.open; });
    const type = TYPES[element.type];
    const body = define(element) + configure(element) + metadata(element);
    this.selectedName.innerHTML = `<span class="${type.icon} icon" aria-hidden="true"></span> <span>${type.name}</span>`;
    render(this.content, `
      <div class="scroll-area panel">${body || `<p class="no-settings">This control has no settings.</p>`}</div>
    `);
    this.content.querySelectorAll("details").forEach((d) => { if (open[d.dataset.group] === false) d.open = false; });
  }
}

customElements.define("fb-config-panel", ConfigPanel);
