// ----------------------------------------
// SAMPLE_SERVER = {
//   id: 39019,
//   name: 'TR_019',
//   opentime: 1710163740,
//   merge_id: 30035,
// }
// ----------------------------------------

import fs from 'fs'
import path from 'path'
import { SPREADSHEETS } from './fetchSpreadsheets.mjs'

export const OUT_DIR = path.resolve('server/db')

// ----------- Helper to extract only needed fields
function simplifyServer(server) {
  const { id, name, opentime, merge_id } = server

  // Split prefix and numeric part
  const [prefix, numStr] = name.split('-')
  const num = String(numStr).padStart(3, '0')

  const opentimeMs = opentime * 1000
  const date = new Date(opentimeMs)
  const opentimeLocal = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(
    2,
    '0'
  )} ${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`

  const days = Math.floor(
    (Date.now() - opentimeMs) / (1000 * 60 * 60 * 24)
  )

  const years = Number((days / 365.2425).toFixed(1))

  return {
    years,
    days,
    id: +id,
    name: `${prefix}_${num}`,
    opentime: opentimeLocal,
    merge_id: +merge_id,
    lang: prefix.toLowerCase(),
  }
}

// ----------- Merge both AM and EU server lists
export default function mergeServerLists() {
  // Read the two JSON files
  const amData = JSON.parse(
    fs.readFileSync(SPREADSHEETS.servers_am.file, 'utf8')
  )
  const euData = JSON.parse(
    fs.readFileSync(SPREADSHEETS.servers_eu.file, 'utf8')
  )

  // Extract server_list arrays and simplify
  const servers = [
    ...amData.server_list.map(simplifyServer),
    ...euData.server_list.map(simplifyServer),
  ]

  // Write to servers.json with indentation
  const outFile = path.join(OUT_DIR, 'servers.json')
  fs.writeFileSync(
    outFile,
    JSON.stringify(servers, null, 2),
    'utf8'
  )

  console.log(`✔ Servers data generated`)
  return servers
}
