// WCAG contrast ratio between two "#RRGGBB" colors, truncated to 2 decimals.
const channel = (hex) => {
  const value = parseInt(hex, 16) / 255;
  return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
};

const luminance = (color) =>
  0.2126 * channel(color.substr(1, 2)) +
  0.7152 * channel(color.substr(3, 2)) +
  0.0722 * channel(color.substr(-2));

const truncate = (number) => Number(String(number).match(/^\d+(\.\d{0,2})?/)[0]);

export const contrastRatio = (foreground, background) => {
  const a = luminance(foreground);
  const b = luminance(background);
  return truncate((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05));
};
