function validateCountryCode(id, serverId) {
  if (id === 'AMEN' && +serverId > 26) return 'AMER'
  if (id === 'PT' && +serverId > 247) return 'ESPT'
  if (id === 'ME' && +serverId > 90) return 'TR'
  if (id === 'EUEN' && +serverId >= 262) return 'MUSH'
  return id
}

let currentRoute = 'index'
let filters = []

if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search)
  currentRoute =
    window.location.pathname.split('.html')[0].slice(1) ||
    'index'

  filters = params
    .get('filterby')
    ?.replace(/\s/g, '') // remove spaces
    .split(',')
    .map(f => {
      // normalize both '-' and '_'
      const normalized = f.replace(/-/g, '_')

      // if it matches a date pattern (YY_MM_DD or YYYY_MM_DD)
      if (/^\d{2,4}_\d{1,2}_\d{1,2}$/.test(normalized)) {
        return normalized
      }

      // otherwise assume old country_server filter
      const [id, serverId] = normalized.split('_')
      return [
        validateCountryCode(id.toLowerCase(), serverId),
        serverId,
      ]
        .filter(Boolean)
        .join('_')
    })
    .join(',')
}

export { filters, currentRoute }
