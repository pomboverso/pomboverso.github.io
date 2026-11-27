/** True when a boolean attribute is present and not "false". */
export const isOn = (element, name) =>
  element.hasAttribute(name) && element.getAttribute(name) !== "false";

/** Swaps every class starting with `prefix` for `prefix + value`. */
export const swapClass = (element, previous, next) => {
  if (previous) element.classList.remove(previous);
  if (next) element.classList.add(next);
};
