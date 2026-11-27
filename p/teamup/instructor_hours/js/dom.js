import { ICONS } from "./data/icons.js";

export const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const icon = (name, cssClass = "") =>
  `<svg class="icon ${cssClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

export const toast = (message) => dispatchEvent(new CustomEvent("pa-toast", { detail: message }));
