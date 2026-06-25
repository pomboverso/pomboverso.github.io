const modulePrefix = 'pv'

export function getPrefix(name) {
  return [modulePrefix, name].join('-')
}

export const EVENT_SEARCH = `${modulePrefix}:search`
