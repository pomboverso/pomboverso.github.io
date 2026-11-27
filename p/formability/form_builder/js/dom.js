export const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const attr = (name, condition) => (condition ? ` ${name}` : "");

export const icon = (glyph) => `<span class="icon ${glyph}" aria-hidden="true"></span>`;

export const options = (map, selected) => Object.entries(map)
  .map(([value, text]) => `<option value="${esc(value)}"${attr("selected", String(selected) === value)}>${esc(text)}</option>`)
  .join("");

export const toast = (message) => dispatchEvent(new CustomEvent("fb-toast", { detail: message }));

export const render = (host, html) => {
  const active = document.activeElement;
  const key = host.contains(active) ? active.dataset.key : null;
  host.innerHTML = html;
  if (key) host.querySelector(`[data-key="${CSS.escape(key)}"]`)?.focus({ preventScroll: true });
};
