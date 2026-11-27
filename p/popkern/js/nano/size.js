/**
 * Turns a nano-grid size formula into a CSS length.
 *   "250"           -> "250px"
 *   "1/4"           -> "25%"
 *   "100%-300-50"   -> "calc(100% - 350px)"
 */
export const toCss = (formula) => {
  const terms = formula.replace(/\s+/g, "").match(/[+-]?\d+(\/\d+|%)?/g);
  if (!terms) return "";

  let percent = 0;
  let pixels = 0;

  terms.forEach((term) => {
    if (term.includes("/")) {
      const [numerator, denominator] = term.split("/");
      percent += (numerator / denominator) * 100;
    } else if (term.endsWith("%")) {
      percent += parseFloat(term);
    } else {
      pixels += Number(term);
    }
  });

  if (!percent) return `${pixels}px`;
  if (!pixels) return `${percent}%`;
  return `calc(${percent}% ${pixels < 0 ? "-" : "+"} ${Math.abs(pixels)}px)`;
};
