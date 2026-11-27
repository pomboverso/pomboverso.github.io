import { store } from "../store.js";
import { drag } from "../drag.js";
import { canNest } from "../data/element-types.js";
import { elementList } from "./fb_form-element.js";
import { render } from "../dom.js";

class WorkArea extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="work-area layout">
        <div class="scroll-area workarea"><div id="fe-listing" data-list=""></div></div>
      </div>
    `;
    this.listing = this.querySelector("#fe-listing");

    this.addEventListener("click", (event) => this.onClick(event));
    this.addEventListener("focusin", (event) => {
      const element = event.target.closest(".form-element");
      if (element) store.select(element.dataset.id);
    });
    this.addEventListener("keydown", (event) => this.onKey(event));
    this.addEventListener("pointerdown", (event) => this.armDrag(event));
    this.addEventListener("pointerup", () => this.disarm());
    this.addEventListener("dragstart", (event) => this.onDragStart(event));
    this.addEventListener("dragend", () => { this.disarm(); drag.end(); });
    this.addEventListener("dragover", (event) => this.onDragOver(event));
    this.addEventListener("drop", (event) => this.onDrop(event));

    this.addEventListener("input", () => this.fitLabels());
    new ResizeObserver(() => this.fitLabels()).observe(this.listing);

    store.subscribe((kind) => {
      if (kind === "text") queueMicrotask(() => this.fitLabels());
      if (kind === "structure") this.update();
      if (kind === "select") this.markSelected();
    });
    this.update();
  }

  update() {
    render(this.listing, elementList(store.state.elements));
    this.markSelected();
    this.fitLabels();
  }

  fitLabels() {
    for (const box of this.querySelectorAll("textarea.label-input")) {
      box.style.height = "auto";
      if (box.scrollHeight) box.style.height = `${box.scrollHeight}px`;
    }
  }

  markSelected() {
    const id = store.selected?.id;
    for (const node of this.querySelectorAll(".form-element")) node.classList.toggle("active", node.dataset.id === id);
  }

  reveal(id) {
    const node = this.querySelector(`.form-element[data-id="${id}"]`);
    node?.scrollIntoView({ block: "nearest" });
    node?.focus({ preventScroll: true });
  }

  focusKey(key) { this.querySelector(`[data-key="${key}"]`)?.focus(); }

  onClick(event) {
    const button = event.target.closest("[data-do]");
    const element = event.target.closest(".form-element");
    if (button) {
      event.preventDefault();
      const { id } = element.dataset;
      const action = button.dataset.do;
      if (action === "up") store.step(id, -1);
      if (action === "down") store.step(id, 1);
      if (action === "remove") store.remove(id);
      if (action === "add-option") this.focusKey(`${store.addOption(id)}.label`);
      if (action === "remove-option") store.removeOption(id, button.dataset.option);
      return;
    }
    store.select(element?.dataset.id ?? null);
  }

  onKey(event) {
    if (event.key === "Enter" && event.target.matches("textarea.label-input")) {
      event.preventDefault(); // labels stay on one line of text
      return;
    }
    if (event.key !== "Enter" || event.target.matches("textarea, button")) return;
    const option = event.target.closest(".el-item");
    if (!option) return;
    event.preventDefault();
    const id = event.target.closest(".form-element").dataset.id;
    this.focusKey(`${store.addOption(id, option.dataset.option)}.label`);
  }

  armDrag(event) {
    if (event.target.closest("input, textarea, button, label")) return;
    const card = event.target.closest(".form-element");
    if (card) card.draggable = true;
  }

  disarm() {
    for (const node of this.querySelectorAll(".form-element[draggable]")) node.removeAttribute("draggable");
  }

  onDragStart(event) {
    const node = event.target.closest(".form-element");
    if (!node?.draggable) return;
    drag.start(event, { id: node.dataset.id, type: store.find(node.dataset.id).type });
  }

  dropTarget(event) {
    const item = drag.item;
    if (!item) return null;
    const nested = canNest(item.type);
    const own = item.id && this.querySelector(`.form-element[data-id="${item.id}"]`);
    if (own?.contains(event.target)) return null;

    const cell = event.target.closest("[data-cell]");
    if (cell && nested && !cell.querySelector(".form-element")) {
      return { node: cell, mark: "drop-into", parentId: cell.dataset.grid, index: Number(cell.dataset.cell) };
    }
    let list = event.target.closest("[data-list]") ?? this.listing;
    if (!nested) list = this.listing;
    const items = [...list.querySelectorAll(":scope > .form-element")];
    let index = items.findIndex((node) => {
      const box = node.getBoundingClientRect();
      return event.clientY < box.top + box.height / 2;
    });
    if (index < 0) index = items.length;
    const parentId = list.dataset.list || null;
    if (!items.length) return { node: list, mark: "drop-into", parentId, index: 0 };
    return index < items.length
      ? { node: items[index], mark: "drop-before", parentId, index }
      : { node: items.at(-1), mark: "drop-after", parentId, index };
  }

  onDragOver(event) {
    if (drag.item && event.target.closest(".drop-placeholder")) { event.preventDefault(); return; }
    const target = this.dropTarget(event);
    this.querySelectorAll(".drop-into").forEach((node) => node.classList.remove("drop-into"));
    if (!target) { drag.clearPlaceholder(); this.target = null; return; }
    event.preventDefault();
    this.target = target;
    if (target.mark === "drop-into") {
      drag.clearPlaceholder();
      target.node.classList.add("drop-into");
      return;
    }
    const box = drag.placeholder;
    const where = target.mark === "drop-before" ? "beforebegin" : "afterend";
    const neighbour = where === "beforebegin" ? target.node.previousElementSibling : target.node.nextElementSibling;
    if (neighbour !== box) target.node.insertAdjacentElement(where, box);
  }

  onDrop(event) {
    const target = event.target.closest(".drop-placeholder") ? this.target : this.dropTarget(event);
    if (!target) return;
    event.preventDefault();
    const item = drag.item;
    drag.end();
    const where = { parentId: target.parentId, index: target.index };
    if (item.id) store.moveTo(item.id, where);
    else {
      const id = store.add(item.type, where);
      if (id) this.reveal(id);
    }
  }
}

customElements.define("fb-work-area", WorkArea);
