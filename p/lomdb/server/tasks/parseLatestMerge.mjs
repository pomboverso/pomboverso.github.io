// ----------------------------------------
// SAMPLE_MERGE = {
//   '2024-07-08': {
//     "AMEN_001": ['AMEN_088'],
//     "AMEN_003": ['AMEN_036'],
//   },
// }
// ----------------------------------------

import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import getServerName from '../utils/getServerName.mjs'

// CONFIG
const CSV_PATH = path.resolve(
  'server/db_0/latest_official_merge_list.csv'
)

const OUT_DIR = path.resolve('server/db_1')
fs.mkdirSync(OUT_DIR, { recursive: true })

const MERGES_PATH = path.resolve(
  'server/db/merges_global.mjs'
)

const MAX_FUTURE_MONTHS = 6

function normalizeLine(line) {
  const trimmed = line.trim()
  if (!trimmed) return null

  // Drop instruction/notes lines
  if (/[a-zA-Z]/.test(trimmed)) return null

  let out = trimmed
    .replace(/←/g, ':')
    .replace(/,:+,/g, ':')
    .replace(/,+/g, ',')
    .replace(/^,|,$/g, '')
    .replace(/"\[/g, '[')
    .replace(/\]"/g, ']')

  if (!out) return null

  // Normalize bracketed server lists
  out = out.replace(
    /\[(.*?)\]/g,
    (_, servers) =>
      '[' +
      servers
        .split(',')
        .map(s => getServerName(s.trim()))
        .filter(Boolean)
        .map(s => `"${s}"`)
        .join(',') +
      ']'
  )

  // Normalize standalone numeric IDs
  out = out.replace(/\b\d+\b/g, getServerName)

  return out
}

function resolveSheetDate(month, day) {
  const now = dayjs()

  let date = dayjs(
    `${month} ${day} ${now.year()}`,
    'MMMM D YYYY'
  )

  if (date.diff(now, 'month') > MAX_FUTURE_MONTHS) {
    date = date.subtract(1, 'year')
  }

  return date
}

// MAIN
export default async function parseMerge() {
  const lines = fs
    .readFileSync(CSV_PATH, 'utf8')
    .split('\n')

  // Extract publication date
  const header = lines[0]
  const match = header.match(
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})/
  )

  if (!match) {
    throw new Error(
      'Could not extract date from sheet header'
    )
  }

  const parsedDate = resolveSheetDate(match[1], match[2])
  const dateISO = parsedDate.format('YYYY-MM-DD')

  console.log(`✔ Extracted merge data: ${dateISO}`)

  const outPath = path.join(OUT_DIR, `${dateISO}.mjs`)

  // Normalize rows
  const cleaned = lines
    .slice(1)
    .map(normalizeLine)
    .filter(Boolean)

  if (!cleaned.length) {
    throw new Error('No valid merge data found')
  }

  // SINGLE SOURCE OF TRUTH
  const dateData = {}

  for (const line of cleaned) {
    const [key, ...rest] = line.split(':')
    const value = rest.join(':')

    if (!key || !value) continue

    const normalizedKey = key.trim()
    let parsed = JSON.parse(value)

    // Fix solo servers → merge into self
    if (Array.isArray(parsed) && parsed.length === 0) {
      parsed = [normalizedKey]
    }

    // Safety: remove duplicates
    parsed = [...new Set(parsed)]

    dateData[normalizedKey] = parsed
  }

  // Build snapshot from parsed data (NOT raw lines)
  const snapshot = Object.entries(dateData)
    .map(
      ([key, arr]) =>
        `${key}:${JSON.stringify(arr)}`
    )
    .join(',\n')

  fs.writeFileSync(
    outPath,
    `export default {\n${snapshot},\n}\n`
  )

  // Load global merges
  let globalData = {}

  if (fs.existsSync(MERGES_PATH)) {
    const imported = await import(
      MERGES_PATH + `?cacheBust=${Date.now()}`
    )
    globalData = imported.default
  }

  // Use same exact data
  globalData[dateISO] = dateData

  fs.writeFileSync(
    MERGES_PATH,
    `export default ${JSON.stringify(globalData, null, 2)}\n`
  )

  console.log('✔ Merges database updated')
}