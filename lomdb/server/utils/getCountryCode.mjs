import countryCodes from '../enums/country-codes.mjs'
import validateCountryCode from './validateCountryCode.mjs'

const numericIdCounters = {}

export default function (str, date) {
  if (str) {
    const parts = str.split('_')
    let id = parts[0]
    const serverId = parts[1]

    id = validateCountryCode(id, serverId)
    const numericId = countryCodes?.[id]

    if (!numericIdCounters[numericId]) {
      numericIdCounters[numericId] = 1
    }

    const index = numericIdCounters[numericId]++

    return {
      id: id?.toLowerCase(),
      label: [id, serverId].join('_'),
      numericId,
      index,
      mergeDates: new Set([date]),
    }
  }
}
