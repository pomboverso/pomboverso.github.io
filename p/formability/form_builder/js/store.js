import { HISTORY_LIMIT } from "./config.js";
import { T, GRID_LAYOUTS, TYPES, hasOptions, isContainer, canNest } from "./data/element-types.js";
import { SAMPLE_TITLE, SAMPLE_ELEMENTS } from "./data/sample-form.js";

let lastId = 0;
const newId = () => `fe${++lastId}`;

const makeOption = (label = "") => ({ id: newId(), label, checked: false });

export const createElement = (type, data = {}) => {
  const element = {
    id: newId(), type,
    label: "", text: "", help: "", placeholder: "", defaultValue: "", reference: "",
    required: false, repeatable: false, readonly: false,
    ...data,
  };
  if (type === T.heading || type === T.subheading) element.fontSize ??= "medium";
  if (type === T.textField) element.format ??= "text";
  if (type === T.dateTimePicker) { element.mode ??= "date"; element.min ??= ""; element.max ??= ""; }
  if (type === T.textField || type === T.textArea) { element.minLength ??= ""; element.maxLength ??= ""; }
  if (type === T.uploadFiles) { element.multiple ??= "false"; element.maxFile ??= ""; element.maxTotal ??= ""; }
  if (type === T.imageUpload) { element.frameShape ??= "rectangle"; element.frameWidth ??= "320"; element.frameHeight ??= "200"; }
  if (type === T.pageBreak) { element.endOf ??= ""; element.startOf ??= ""; }
  if (hasOptions(type)) {
    element.options = (data.options ?? ["", ""]).map(makeOption);
    element.columns ??= 1;
    if (type === T.dropdown) element.defaultOption ??= "";
  }
  if (type === T.stack) element.children = (data.children ?? []).map((c) => createElement(c.type, c));
  if (type === T.grid) {
    element.layout ??= "6-6";
    element.valign ??= "top";
    element.cells = (data.cells ?? []).map((c) => (c ? createElement(c.type, c) : null));
    padGrid(element);
  }
  return element;
};

function padGrid(grid) {
  const columns = GRID_LAYOUTS[grid.layout].length;
  const cells = grid.cells;
  while (cells.length && !cells.at(-1)) cells.pop();
  while (!cells.length || cells.length % columns) cells.push(null);
  if (cells.every(Boolean)) for (let i = 0; i < columns; i++) cells.push(null);
}

const state = {
  title: SAMPLE_TITLE,
  theme: "light",
  elements: SAMPLE_ELEMENTS.map((e) => createElement(e.type, e)),
};
let selectedId = null;
const undoStack = [];
const redoStack = [];
let typingKey = null;

const bus = new EventTarget();
const emit = (kind) => bus.dispatchEvent(new CustomEvent("change", { detail: { kind } }));
const snapshot = () => JSON.stringify(state);

const remember = () => {
  undoStack.push(snapshot());
  if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
  redoStack.length = 0;
};

const commit = (mutate) => {
  remember();
  typingKey = null;
  mutate();
  emit("structure");
};

function* walk(list = state.elements, parent = null) {
  for (const element of list) {
    if (!element) continue;
    yield { element, list, parent };
    if (element.children) yield* walk(element.children, element);
    if (element.cells) yield* walk(element.cells, element);
  }
}

const locate = (id) => [...walk()].find((entry) => entry.element.id === id);

const findAny = (id) => {
  if (id === "form") return state;
  for (const { element } of walk()) {
    if (element.id === id) return element;
    const option = element.options?.find((o) => o.id === id);
    if (option) return option;
  }
  return null;
};

const detach = ({ element, list, parent }) => {
  const index = list.indexOf(element);
  if (parent?.type === T.grid) { list[index] = null; padGrid(parent); }
  else list.splice(index, 1);
};

const place = (element, { parentId = null, index } = {}) => {
  const parent = parentId ? findAny(parentId) : null;
  if (parent?.type === T.grid) {
    let at = index ?? parent.cells.indexOf(null);
    if (parent.cells[at]) at = parent.cells.indexOf(null);
    parent.cells[at] = element;
    padGrid(parent);
    return;
  }
  const list = parent ? parent.children : state.elements;
  list.splice(index ?? list.length, 0, element);
};

const fits = (type, parentId) => !parentId || canNest(type);

export const store = {
  get state() { return state; },
  get selected() { return selectedId ? findAny(selectedId) : null; },
  get canUndo() { return undoStack.length > 0; },
  get canRedo() { return redoStack.length > 0; },
  find: findAny,
  position: (id) => {
    const entry = locate(id);
    return entry && { index: entry.list.indexOf(entry.element), length: entry.list.length, parent: entry.parent };
  },
  subscribe(listener) {
    const handler = (event) => listener(event.detail.kind);
    bus.addEventListener("change", handler);
    return () => bus.removeEventListener("change", handler);
  },

  select(id) {
    if (id === selectedId) return;
    selectedId = id;
    typingKey = null;
    emit("select");
  },

  add(type, target) {
    if (!TYPES[type]) return;
    if (!target) {
      const current = selectedId && locate(selectedId);
      if (current && isContainer(current.element.type) && canNest(type)) {
        target = { parentId: current.element.id };
      } else if (current) {
        const top = current.parent ? locate(current.parent.id) : current;
        target = { index: state.elements.indexOf(top.element) + 1 };
      }
    }
    if (!fits(type, target?.parentId)) return false;
    const element = createElement(type);
    commit(() => { place(element, target); selectedId = element.id; });
    return element.id;
  },

  moveTo(id, target) {
    const entry = locate(id);
    if (!entry || !fits(entry.element.type, target.parentId) || target.parentId === id) return false;
    const targetList = target.parentId ? findAny(target.parentId).children : state.elements;
    let index = target.index;
    if (targetList === entry.list && index > entry.list.indexOf(entry.element)) index -= 1;
    commit(() => {
      const parent = target.parentId ? findAny(target.parentId) : null;
      if (parent?.type === T.grid && entry.parent === parent) {
        const from = parent.cells.indexOf(entry.element);
        [parent.cells[from], parent.cells[target.index]] = [parent.cells[target.index], entry.element];
        padGrid(parent);
        return;
      }
      detach(entry);
      place(entry.element, { ...target, index });
    });
    return true;
  },

  step(id, delta) {
    const entry = locate(id);
    if (!entry) return;
    const from = entry.list.indexOf(entry.element);
    const to = from + delta;
    if (to < 0 || to >= entry.list.length) return;
    commit(() => {
      [entry.list[from], entry.list[to]] = [entry.list[to], entry.list[from]];
      if (entry.parent?.type === T.grid) padGrid(entry.parent);
    });
  },

  remove(id) {
    const entry = locate(id);
    if (!entry) return;
    commit(() => { detach(entry); if (selectedId && !findAny(selectedId)) selectedId = null; });
  },

  addOption(elementId, afterId) {
    const element = findAny(elementId);
    const option = makeOption();
    const at = afterId ? element.options.findIndex((o) => o.id === afterId) + 1 : element.options.length;
    commit(() => element.options.splice(at, 0, option));
    return option.id;
  },

  removeOption(elementId, optionId) {
    const element = findAny(elementId);
    commit(() => {
      element.options = element.options.filter((o) => o.id !== optionId);
      if (element.defaultOption === optionId) element.defaultOption = "";
    });
  },

  set(id, prop, value) {
    const target = findAny(id);
    if (!target || target[prop] === value) return;
    commit(() => {
      target[prop] = value;
      if (prop === "layout") padGrid(target);
      if (prop === "checked" && value) {
        // radio buttons allow a single default
        for (const { element } of walk()) {
          if (element.type === T.radioButtonGroup && element.options.includes(target)) {
            element.options.forEach((o) => { o.checked = o === target; });
          }
        }
      }
    });
  },

  type(id, prop, value) {
    const target = findAny(id);
    if (!target) return;
    const key = `${id}.${prop}`;
    if (typingKey !== key) { remember(); typingKey = key; }
    target[prop] = value;
    emit("text");
  },

  undo() { travel(undoStack, redoStack); },
  redo() { travel(redoStack, undoStack); },
};

function travel(from, to) {
  if (!from.length) return;
  to.push(snapshot());
  Object.assign(state, JSON.parse(from.pop()));
  typingKey = null;
  if (selectedId && !findAny(selectedId)) selectedId = null;
  emit("structure");
}
