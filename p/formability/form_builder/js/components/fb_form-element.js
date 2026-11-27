import { T, TYPES, GRID_LAYOUTS, can } from "../data/element-types.js";
import { store } from "../store.js";
import { esc, attr, icon } from "../dom.js";

const bind = (id, prop) => `data-bind="${id}.${prop}" data-key="${id}.${prop}"`;

const textInput = (element, prop, placeholder, cssClass = "") =>
  `<input type="text" class="${cssClass}" ${bind(element.id, prop)} value="${esc(element[prop])}" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}">`;

const textArea = (element, prop, placeholder, cssClass = "") =>
  `<textarea class="${cssClass}" rows="2" ${bind(element.id, prop)} placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}">${esc(element[prop])}</textarea>`;

const labelable = (element, placeholder = "Enter a label...") => `
  <div class="labelable">
    <textarea class="label-input" rows="1" ${bind(element.id, "label")} placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}">${esc(element.label)}</textarea>
    ${element.required ? `<span class="required" title="Required">*</span>` : ""}
  </div>`;

const placeholderable = (element, multiline = false) => `
  <div class="c-row multi-input">
    <div class="column">
      ${multiline
        ? textArea(element, "placeholder", "Placeholder", "skip-drag")
        : textInput(element, "placeholder", "Placeholder", "skip-drag")}
    </div>
  </div>`;

const optionRow = (element, option, kind) => `
  <div class="c-row component-row el-item col-md-${12 / element.columns}${attr("active", element.defaultOption === option.id)}" data-option="${option.id}">
    ${kind ? `<div class="prefix"><input type="${kind}" name="${element.id}" ${bind(option.id, "checked")}${attr("checked", option.checked)} aria-label="Selected by default"></div>` : ""}
    <div class="column">${textInput(option, "label", kind === "radio" ? "radio button label" : kind ? "checkbox label" : "dropdown item title", "label-input")}</div>
    <div class="suffix">
      <button type="button" class="btn-icon clear-to-red" data-do="remove-option" data-option="${option.id}" data-key="${option.id}.remove">
        ${icon("times")}<span class="sr-only">Delete option</span>
      </button>
    </div>
  </div>`;

const optionGroup = (element, kind, addText) => `
  <div class="matrix-input">${element.options.map((o) => optionRow(element, o, kind)).join("")}</div>
  <div class="cta">
    <button type="button" class="btn grey-to-blue xs" data-do="add-option" data-key="${element.id}.add">${addText}</button>
  </div>`;

const grid = (element) => {
  const widths = GRID_LAYOUTS[element.layout];
  return `
    <div class="matrix-grid align-${element.valign}">
      ${element.cells.map((child, i) => `
        <div class="grid-cell col-${widths[i % widths.length]}" data-grid="${element.id}" data-cell="${i}">
          ${child ? formElement(child, element.cells) : `<div class="empty-drag-zone">Drop a control here</div>`}
        </div>`).join("")}
    </div>`;
};

const BODIES = {
  [T.textField]: (e) => placeholderable(e),
  [T.textArea]: (e) => placeholderable(e, true),
  [T.dateTimePicker]: (e) => placeholderable(e),
  [T.lookupField]: (e) => placeholderable(e),
  [T.dropdown]: (e) => `
    <div class="c-row multi-input"><div class="column">${textInput(e, "placeholder", "Select one...", "skip-drag")}</div></div>
    ${optionGroup(e, null, "Add new option")}`,
  [T.checkboxGroup]: (e) => optionGroup(e, "checkbox", "Add new value"),
  [T.radioButtonGroup]: (e) => optionGroup(e, "radio", "Add new value"),
  [T.uploadFiles]: () => `<div class="dz-container">${icon("upload")} Drop files here</div>`,
  [T.imageUpload]: () => `<div class="dz-container image">${icon("image-upload")} Drop an image here</div>`,
  [T.signature]: (e) => `<div class="sign_container">${esc(e.placeholder)}</div>`,
  [T.paragraph]: (e) => `<div class="paragraph-wysiwyg">${textArea(e, "text", "Type your text...")}</div>`,
  [T.validator]: (e) => textArea(e, "text", "Type your custom validation message..."),
  [T.divider]: () => `<div class="flex-container"><hr><span>Divider</span><hr></div>`,
  [T.pageBreak]: (e) => `
    <div class="labelable">${textInput(e, "endOf", "End of page", "label-input")}</div>
    <div class="flex-container"><hr><span class="pill grey">Page Break</span><hr></div>
    <div class="labelable">${textInput(e, "startOf", "Beginning of page", "label-input")}</div>`,
  [T.stack]: (e) => `
    <div class="element-stack" data-list="${e.id}">
      ${e.children.length ? elementList(e.children) : `<div class="empty-drag-zone">Drop controls into this stack</div>`}
    </div>`,
  [T.grid]: grid,
  [T.thirdParty]: () => `
    <div class="c-row multi-input"><div class="column"><input type="text" placeholder="Completer name" disabled></div><div class="column"><input type="text" placeholder="Completer email" disabled></div></div>`,
  [T.USPSAddress]: () => `
    <div class="c-row multi-input"><div class="column"><input type="text" placeholder="Street address" disabled></div></div>
    <div class="c-row multi-input"><div class="column"><input type="text" placeholder="City" disabled></div><div class="column"><input type="text" placeholder="State" disabled></div><div class="column"><input type="text" placeholder="ZIP code" disabled></div></div>`,
};

export function formElement(element, siblings) {
  const type = TYPES[element.type];
  const index = siblings.indexOf(element);
  const inGrid = store.position(element.id)?.parent?.type === T.grid;
  const heading = element.type === T.heading || element.type === T.subheading;
  return `
    <article class="form-element dynamic-element builder-element fe-${type.control} element-${type.control}"
             data-id="${element.id}" data-key="${element.id}" tabindex="0" aria-label="${type.name}${element.label ? `: ${esc(element.label)}` : ""}">
      <div class="title-bar">
        ${element.repeatable ? `<i class="repeat-flag" title="Repeatable">Repeatable</i>` : ""}
        ${can(element, "labelable")
          ? `<div class="title-label ${heading ? `heading-${element.fontSize} is-${type.control}` : ""}">${labelable(element, heading ? type.name : "Enter a label...")}</div>`
          : `<span class="grid-title">${type.name}</span>`}
        ${element.help ? `<span class="help-text icon-help" title="${esc(element.help)}">?<span class="sr-only">${esc(element.help)}</span></span>` : ""}
        <div class="suffix">
          ${inGrid ? "" : `
            <button type="button" class="btn-icon clear-area down" data-do="down" data-key="${element.id}.down"${attr("disabled", index === siblings.length - 1)}>
              <span class="icon arrow-chevron down"></span><span class="sr-only">Move Form Element one step down</span>
            </button>
            <button type="button" class="btn-icon clear-area up" data-do="up" data-key="${element.id}.up"${attr("disabled", index === 0)}>
              <span class="icon arrow-chevron up"></span><span class="sr-only">Move Form Element one step up</span>
            </button>`}
          <button type="button" class="btn-icon clear-to-red close" data-do="remove">
            <span class="icon times"></span><span class="sr-only">Delete Form Element</span>
          </button>
        </div>
      </div>
      ${BODIES[element.type]?.(element) ?? ""}
      <i class="type-icon ${type.icon} icon" title="${type.name}"><span class="sr-only">${type.name}</span></i>
    </article>`;
}

export function elementList(elements) {
  if (!elements.length) return `<div class="empty-drag-zone large">Drag a control here, or click one in the Control Panel</div>`;
  return elements.map((element) => formElement(element, elements)).join("");
}
