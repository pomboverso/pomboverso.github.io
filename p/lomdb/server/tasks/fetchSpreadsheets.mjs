import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'

const OUT_DIR = path.resolve('server/db_0')
fs.mkdirSync(OUT_DIR, { recursive: true })

export const SPREADSHEETS = {
  players: {
    // The source spreadsheet no longer exists: keep the last
    // downloaded server/db_0/players.csv and don't fetch it again.
    skip: true,
    url: 'https://docs.google.com/spreadsheets/d/1LKO5DT4CpOU27TPbM1EKWzMKW712qMdr9SMJ4ePhDNI/export?format=csv#gid=0',
    file: path.join(OUT_DIR, 'players.csv'),
    type: 'csv',
  },
  // latest_official_merge_list: {
  //   url: 'https://docs.google.com/spreadsheets/d/1RkuA1kK7KWbr4tBWt6orNUf3zOOECtO-ZU4VJFdLs14/export?format=csv',
  //   file: path.join(
  //     OUT_DIR,
  //     'latest_official_merge_list.csv'
  //   ),
  //   type: 'csv',
  // },
  servers_am: {
    url: 'https://slogin1001-mix-us-xxjzz.joynetgamestudio.com/client/server_list',
    file: path.join(OUT_DIR, 'servers_am.json'),
    type: 'json',
  },
  servers_eu: {
    url: 'https://slogin1001-mix-us2-xxjzz.joynetgamestudio.com/client/server_list',
    file: path.join(OUT_DIR, 'servers_eu.json'),
    type: 'json',
  },

  // servers_sea: {
  //   url: 'https://slogin1001-mix-en-xxjzz.joyagegames.com/client/server_list',
  //   file: path.join(OUT_DIR, 'servers_sea.json'),
  //   type: 'json',
  //   params: {
  //     time: '1712794824',
  //     uid: '',
  //     plat: '4012',
  //     ticket: '3fa53d90588ab12b10a152fb34748148',
  //   },
  // },
}

// Download a single sheet
async function downloadSheet({ url, file, type }) {
  const res = await fetch(url)
  if (!res.ok)
    throw new Error(`HTTP ${res.status} ${res.statusText}`)

  if (type === 'csv') {
    // stream CSV directly
    await pipeline(
      Readable.fromWeb(res.body),
      fs.createWriteStream(file)
    )
  } else if (type === 'json') {
    // parse JSON first to pretty-print
    const data = await res.json()
    fs.writeFileSync(
      file,
      JSON.stringify(data, null, 2),
      'utf8'
    )
  }

  console.log(`✔ Downloaded: ${file}`)
  return file
}

// Download all sheets
export default async function fetchSpreadsheets() {
  const results = {}
  for (const key of Object.keys(SPREADSHEETS)) {
    const sheet = SPREADSHEETS[key]
    if (sheet.skip) {
      console.log(`↷ Skipped (using existing file): ${sheet.file}`)
      results[key] = sheet.file
      continue
    }
    results[key] = await downloadSheet(sheet)
  }
  return results
}
