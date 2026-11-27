// In-memory UI state. Nothing is persisted: a reload restores the defaults.
const state = {
  theme: false, // false = dark, true = light
  panel: false,
  fullscreen: false,
  fallBackIcons: false,
  // Color Cube scene
  grid: true,
  pause: false,
  lines: false,
  sceneRotation: 3,
};

const listeners = new Set();

export const store = {
  state,

  set(key, value) {
    state[key] = value;
    listeners.forEach((listener) => listener(state));
  },

  toggle(key) {
    this.set(key, !state[key]);
  },

  /** Calls `listener` now and on every change. Returns an unsubscribe function. */
  subscribe(listener) {
    listeners.add(listener);
    listener(state);
    return () => listeners.delete(listener);
  },
};
