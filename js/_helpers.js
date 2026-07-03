const modulePrefix = 'pv'

export function getPrefix(name) {
  return [modulePrefix, name].join('-')
}

export const EVENT_SEARCH = `${modulePrefix}:search`

export function normalize(str, intense = false) {
  let result = str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (intense) {
    result = result.replace(/\s+/g, "-");
  }

  return result;
}