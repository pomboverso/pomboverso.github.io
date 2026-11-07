import fs from 'fs'
import path from 'path'
import { spreadServers } from '../processors/all_merges.mjs'

const serverConfigs = [
  { title: 'AMEN (1)', filter: 'amen', starts: 1, ends: 1026 },
  { title: 'AMER (2)', filter: 'amer', starts: 1027 },
  { title: 'ES (6)', filter: 'es', starts: 1 },
  {
    title: 'ESPT (11)',
    filter: 'espt',
    internalfilter: 'pt',
    starts: 248,
  },
  { title: 'PT (11)', filter: 'pt', starts: 1, ends: 247 },
  {
    title: 'EUEN (30)',
    filter: 'euen',
    starts: 1,
    ends: 261,
  },
  {
    title: 'MUSH (30)',
    filter: 'mush',
    internalfilter: 'euen',
    starts: 262,
  },
  { title: 'DE (33)', filter: 'de', starts: 1 },
  { title: 'FR (36)', filter: 'fr', starts: 1 },
  { title: 'ME (39)', filter: 'me', starts: 1, ends: 90 },
  {
    title: 'TR (39)',
    filter: 'tr',
    internalfilter: 'me',
    starts: 91,
  },
  { title: 'RU (42)', filter: 'ru', starts: 1 },
  // { title: 'SEACN (1)', filter: 'seacn', starts: 1 },
  // { title: 'VN (4)', filter: 'vn', starts: 1 },
  // { title: 'ID (7)', filter: 'id', starts: 1 },
  // { title: 'EN (10)', filter: 'en', starts: 1 },
  // { title: 'TH (13)', filter: 'th', starts: 1 },
  // { title: 'CN', filter: 'cn', starts: 1 },
  // { title: 'KR', filter: 'kr', starts: 0 },
  // { title: 'JP', filter: 'jp', starts: 1 },
  // { title: 'TW', filter: 'tw', starts: 1001 },
]

function generateRange(start, end) {
  return Array.from(
    { length: end - start + 1 },
    (_, i) => i + start
  )
}

function normalizeList() {
  return serverConfigs.map(config => {
    const internal = config.internalfilter || config.filter
    const merged = spreadServers
      .filter(s =>
        s.startsWith(internal.toUpperCase() + '_')
      )
      .map(s => +s.split('_')[1])
    const mergedSet = new Set(merged)

    const ends =
      typeof config.ends === 'number'
        ? config.ends
        : merged.length > 0
        ? Math.max(...merged)
        : 0

    const range = generateRange(config.starts, ends)

    return {
      title: config.title,
      filter_keys: 'sv' + config.filter,
      range: {
        starts: config.starts,
        ends,
      },
      missing_servers: range.filter(
        id => !mergedSet.has(id)
      ),
    }
  })
}

const gapsData = normalizeList()

export default function generateMergeGapsData() {
  // console.log({ gapsData })
  fs.writeFileSync(
    path.join('js', 'data_gaps.json'),
    `${JSON.stringify(gapsData, null)}`,
    'utf-8'
  )
}
