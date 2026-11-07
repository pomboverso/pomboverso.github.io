import { calendar_ranges } from './data_calendar.js'

function getEventsForDate(date) {
  const result = []

  // Extract MM-DD from the queried date
  const [, monthDay] =
    date.split('-', 2).length === 2
      ? date.split(/-(.+)/)
      : [null, null]
  // safer:
  const dateMD = date.slice(5) // "MM-DD"

  for (const range of calendar_ranges) {
    // Normal ranged events
    if (range.from && range.to) {
      if (
        date >= range.from &&
        date <= range.to &&
        range.event
      ) {
        const event =
          typeof range.event === 'function'
            ? range.event(date)
            : range.event

        result.push(event)
      }
    }

    // Yearly repeating events
    if (range.every && range.event) {
      const everyMD = range.every.slice(5) // "MM-DD"

      if (dateMD === everyMD) {
        const event =
          typeof range.event === 'function'
            ? range.event(date)
            : range.event

        result.push(event)
      }
    }
  }

  // Sort by priority (highest first)
  result.sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  )

  return result
}

export { getEventsForDate }
