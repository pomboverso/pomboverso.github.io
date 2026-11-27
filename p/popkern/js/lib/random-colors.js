import { wikiColors, paletteColors } from "../data/wiki-colors.js";
import { COLOR_COUNT } from "../config.js";

/** Returns `count` different items of `list` in random order. */
const sample = (list, count) => {
  const pool = [...list];
  const total = Math.max(0, Math.min(Math.floor(count), pool.length));

  // partial Fisher-Yates shuffle: only the first `total` places are needed
  for (let i = 0; i < total; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, total);
};

// Picked once, so every section shows the same colors until the page is reloaded.
export const randomColors = sample(
  Object.values({ ...wikiColors, ...paletteColors }),
  COLOR_COUNT
);
