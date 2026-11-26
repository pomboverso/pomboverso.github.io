// Demo: settings are kept in memory only, so a reload starts everything fresh.
const values = new Map();

export function load(key, fallback, isValid = () => true) {
  if (!values.has(key)) return fallback;
  const value = JSON.parse(values.get(key));
  return isValid(value) ? value : fallback;
}

export function save(key, value) {
  values.set(key, JSON.stringify(value));
}

// nothing is stored between visits, so there is nothing to upgrade
export function upgrade() {}

export function takeLegacy() {
  return null;
}
