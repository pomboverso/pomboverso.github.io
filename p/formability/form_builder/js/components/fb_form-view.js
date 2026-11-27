import { T, GRID_LAYOUTS, can } from "../data/element-types.js";
import { LOOKUP_VALUES } from "../data/sample-form.js";
import { esc, attr } from "../dom.js";

let instances = 0;

class FormView extends HTMLElement {
  connectedCallback() {
    if (this.ready) return;
    this.ready = true;
    this.uid = `view${++instances}`;
    this.addEventListener("click", (event) => this.onClick(event));
    this.addEventListener("submit", (event) => { event.preventDefault(); this.submit(); });
    this.addEventListener("input", (event) => this.clearError(event.target));
    this.addEventListener("change", (event) => this.clearError(event.target));
    this.addEventListener("pointerdown", (event) => this.sign(event));
  }

  show(form) {
    this.connectedCallback();
    const pages = [{ title: "", elements: [] }];
    for (const element of form.elements) {
      if (element.type === T.pageBreak) {
        pages.at(-1).title ||= element.endOf;
        pages.push({ title: element.startOf, elements: [] });
      } else pages.at(-1).elements.push(element);
    }
    this.counter = 0;
    this.innerHTML = `
      <form class="form-view" novalidate>
        <h1 class="form-title">${esc(form.title)}</h1>
        ${pages.map((page, i) => `
          <section class="form-page"${attr("hidden", i > 0)}>
            ${pages.length > 1 ? `<p class="page-count">${page.title ? `${esc(page.title)} · ` : ""}Page ${i + 1} of ${pages.length}</p>` : ""}
            ${page.elements.map((e) => this.field(e)).join("") || `<p>This page is empty.</p>`}
          </section>`).join("")}
        <p class="form-result" role="status"></p>
        <div class="form-actions">
          <button type="button" class="form-button secondary" data-turn="-1" hidden>Back</button>
          <button type="button" class="form-button" data-turn="1"${attr("hidden", pages.length < 2)}>Next</button>
          <button type="submit" class="form-button"${attr("hidden", pages.length > 1)}>Submit</button>
        </div>
        <datalist id="${this.uid}-lookup">${LOOKUP_VALUES.map((v) => `<option value="${esc(v)}">`).join("")}</datalist>
      </form>`;
    this.page = 0;
  }

  field(e) {
    if (e.type === T.heading || e.type === T.subheading) {
      const tag = e.type === T.heading ? "h2" : "h3";
      return `<${tag} class="size-${e.fontSize}"${attr(`title="${esc(e.help)}"`, e.help)}>${esc(e.label)}</${tag}>`;
    }
    if (e.type === T.paragraph) return `<p class="form-text">${esc(e.text)}</p>`;
    if (e.type === T.validator) return e.text ? `<p class="form-notice">${esc(e.text)}</p>` : "";
    if (e.type === T.divider) return `<hr>`;
    if (e.type === T.grid) {
      const widths = GRID_LAYOUTS[e.layout];
      return this.repeat(e, `<div class="matrix-grid align-${e.valign}">${e.cells
        .map((c, i) => `<div class="grid-cell col-${widths[i % widths.length]}">${c ? this.field(c) : ""}</div>`).join("")}</div>`);
    }
    if (e.type === T.stack) return this.repeat(e, `<div class="element-stack">${e.children.map((c) => this.field(c)).join("")}</div>`);

    const id = `${this.uid}-${e.id}-${++this.counter}`;
    const common = `id="${id}" name="${esc(e.reference || id)}"${attr("required", e.required)}`;
    const locked = attr("readonly", e.readonly);
    const lengths = `${attr(`minlength="${esc(e.minLength)}"`, e.minLength)}${attr(`maxlength="${esc(e.maxLength)}"`, e.maxLength)}`;
    const group = [T.checkboxGroup, T.radioButtonGroup, T.thirdParty, T.USPSAddress].includes(e.type);
    const controls = {
      [T.textField]: () => `<input type="${e.format}" ${common}${locked}${lengths} placeholder="${esc(e.placeholder)}" value="${esc(e.defaultValue)}">`,
      [T.textArea]: () => `<textarea rows="3" ${common}${locked}${lengths} placeholder="${esc(e.placeholder)}">${esc(e.defaultValue)}</textarea>`,
      [T.dateTimePicker]: () => `<input type="${e.mode}" ${common}${locked}${attr(`min="${esc(e.min)}"`, e.min)}${attr(`max="${esc(e.max)}"`, e.max)} aria-description="${esc(e.placeholder)}">`,
      [T.lookupField]: () => `<input type="text" ${common} list="${this.uid}-lookup" placeholder="${esc(e.placeholder || "Start typing to search")}">`,
      [T.dropdown]: () => `
        <select ${common}${attr("disabled", e.readonly)}>
          <option value="">${esc(e.placeholder || "Select one...")}</option>
          ${e.options.map((o, i) => `<option value="${o.id}"${attr("selected", e.defaultOption === o.id)}>${esc(o.label || `Option ${i + 1}`)}</option>`).join("")}
        </select>`,
      [T.checkboxGroup]: () => this.choices(e, id, "checkbox"),
      [T.radioButtonGroup]: () => this.choices(e, id, "radio"),
      [T.uploadFiles]: () => `<input type="file" class="dz-container" ${common}${attr("multiple", e.multiple === "true")} data-max="${esc(e.maxFile)}" data-total="${esc(e.maxTotal)}">`,
      [T.imageUpload]: () => `<input type="file" accept="image/*" class="dz-container image shape-${e.frameShape}" ${common}
        style="width:min(100%, ${Number(e.frameWidth) || 320}px);height:${Number(e.frameShape === "rectangle" ? e.frameHeight : e.frameWidth) || 200}px">`,
      [T.signature]: () => `
        <div class="sign_container">
          <canvas width="500" height="140" id="${id}" aria-label="${esc(e.placeholder || "Signature pad")}"${attr("data-required", e.required)}></canvas>
          <button type="button" class="form-button secondary small" data-clear>Clear</button>
        </div>`,
      [T.thirdParty]: () => `<div class="inline-fields"><input type="text" placeholder="Completer name" aria-label="Completer name"><input type="email" placeholder="Completer email" aria-label="Completer email"></div>`,
      [T.USPSAddress]: () => `
        <input type="text" placeholder="Street address" aria-label="Street address">
        <div class="inline-fields"><input type="text" placeholder="City" aria-label="City"><input type="text" placeholder="State" aria-label="State"><input type="text" placeholder="ZIP code" aria-label="ZIP code" pattern="\\d{5}(-\\d{4})?"></div>
        <button type="button" class="form-button secondary small" data-address>Validate address</button>`,
    };
    const required = e.required ? ` <span class="required">*</span>` : "";
    const help = e.help ? `<small class="form-help">${esc(e.help)}</small>` : "";
    const label = group
      ? `<span class="field-label" id="${id}-label">${esc(e.label)}${required}</span>`
      : `<label class="field-label" for="${id}">${esc(e.label)}${required}</label>`;
    return this.repeat(e, `
      <div class="form-field"${group ? ` role="group" aria-labelledby="${id}-label"` : ""}>
        ${label}${help}${controls[e.type]?.() ?? ""}
        <span class="field-error" role="alert"></span>
      </div>`);
  }

  choices(e, id, kind) {
    return `
      <div class="choices columns-${e.columns}">
        ${e.options.map((o, i) => `
          <div class="check-container">
            <input type="${kind}" id="${id}-${i}" name="${id}" value="${o.id}"${attr("checked", o.checked)}${attr("disabled", e.readonly)}${attr("data-required", e.required)}>
            <label for="${id}-${i}">${esc(o.label || `Option ${i + 1}`)}</label>
          </div>`).join("")}
      </div>`;
  }

  repeat(e, html) {
    if (!can(e, "repeatable") || !e.repeatable) return html;
    return `<div class="repeatable"><div class="repeat-item">${html}</div><button type="button" class="form-button secondary small" data-repeat>Add another</button></div>`;
  }

  onClick(event) {
    const pager = event.target.closest("[data-turn]");
    if (pager) {
      const step = Number(pager.dataset.turn);
      if (step < 0 || this.validate(this.pages()[this.page])) this.showPage(this.page + step);
    }
    if (event.target.closest("[data-repeat]")) this.addCopy(event.target.closest(".repeatable"));
    const clear = event.target.closest("[data-clear]");
    if (clear) {
      const canvas = clear.parentElement.querySelector("canvas");
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      delete canvas.dataset.signed;
    }
    const address = event.target.closest("[data-address]");
    if (address) {
      const field = address.closest(".form-field");
      const complete = [...field.querySelectorAll("input")].every((i) => i.value.trim() && i.checkValidity());
      field.querySelector(".field-error").textContent = complete
        ? "Demo only: the address looks complete, but it was not checked against a service."
        : "Fill in the whole address with a 5 digit ZIP code.";
    }
  }

  addCopy(repeatable) {
    const items = repeatable.querySelectorAll(":scope > .repeat-item");
    const copy = items[0].cloneNode(true);
    const suffix = `-copy${++this.counter}`;
    copy.querySelectorAll("[id]").forEach((n) => { n.id += suffix; });
    copy.querySelectorAll("[for]").forEach((n) => { n.htmlFor += suffix; });
    copy.querySelectorAll("[aria-labelledby]").forEach((n) => n.setAttribute("aria-labelledby", n.getAttribute("aria-labelledby") + suffix));
    copy.querySelectorAll("[type=radio], [type=checkbox]").forEach((n) => { n.name += suffix; n.checked = false; });
    copy.querySelectorAll("input:not([type=radio], [type=checkbox]), textarea, select").forEach((n) => { n.value = ""; });
    copy.querySelectorAll("canvas").forEach((n) => delete n.dataset.signed);
    copy.querySelectorAll(".field-error").forEach((n) => { n.textContent = ""; });
    items[items.length - 1].after(copy);
  }

  pages() { return this.querySelectorAll(".form-page"); }

  showPage(index) {
    const pages = this.pages();
    this.page = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, i) => { page.hidden = i !== this.page; });
    const last = this.page === pages.length - 1;
    this.querySelector('[data-turn="-1"]').hidden = this.page === 0;
    this.querySelector('[data-turn="1"]').hidden = last;
    this.querySelector('[type="submit"]').hidden = !last;
    this.querySelector(".form-result").textContent = "";
  }

  problem(field) {
    for (const input of field.querySelectorAll("input, textarea, select")) {
      if (input.type === "checkbox" || input.type === "radio") continue;
      if (!input.checkValidity()) return input.validationMessage;
      const { minLength } = input;
      if (minLength > 0 && input.value && input.value.length < minLength) return `Use at least ${minLength} characters.`;
      if (input.type === "file") {
        const sizes = [...input.files].map((f) => f.size / 1048576);
        if (input.dataset.max && sizes.some((s) => s > input.dataset.max)) return `Each file must be under ${input.dataset.max} MB.`;
        if (input.dataset.total && sizes.reduce((a, b) => a + b, 0) > input.dataset.total) return `Files must total under ${input.dataset.total} MB.`;
      }
    }
    const boxes = field.querySelectorAll("[data-required]:not(canvas)");
    if (boxes.length && ![...boxes].some((b) => b.checked)) return "Choose an option.";
    const canvas = field.querySelector("canvas[data-required]");
    if (canvas && !canvas.dataset.signed) return "Please sign here.";
    return "";
  }

  validate(page) {
    let first = null;
    for (const field of page.querySelectorAll(".form-field")) {
      const message = this.problem(field);
      field.querySelector(".field-error").textContent = message;
      field.classList.toggle("has-error", Boolean(message));
      if (message) first ??= field;
    }
    first?.querySelector("input, textarea, select, button")?.focus();
    return !first;
  }

  clearError(target) {
    const field = target.closest(".form-field");
    if (!field?.classList.contains("has-error")) return;
    field.classList.remove("has-error");
    field.querySelector(".field-error").textContent = "";
  }

  submit() {
    const pages = this.pages();
    if (this.page < pages.length - 1) {
      if (this.validate(pages[this.page])) this.showPage(this.page + 1);
      return;
    }
    for (let i = 0; i < pages.length; i++) {
      this.showPage(i);
      if (!this.validate(pages[i])) return;
    }
    this.querySelector(".form-result").textContent = "Looks good. This is a demo, so nothing was sent.";
  }

  sign(event) {
    const canvas = event.target.closest("canvas");
    if (!canvas) return;
    event.preventDefault();
    const context = canvas.getContext("2d");
    const point = (e) => {
      const box = canvas.getBoundingClientRect();
      return [(e.clientX - box.left) * canvas.width / box.width, (e.clientY - box.top) * canvas.height / box.height];
    };
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = getComputedStyle(canvas).color;
    context.beginPath();
    context.moveTo(...point(event));
    const move = (e) => {
      context.lineTo(...point(e));
      context.stroke();
      canvas.dataset.signed = "true";
      this.clearError(canvas);
    };
    const stop = () => {
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", stop);
      canvas.removeEventListener("pointercancel", stop);
    };
    canvas.setPointerCapture(event.pointerId);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", stop);
  }
}

customElements.define("fb-form-view", FormView);
