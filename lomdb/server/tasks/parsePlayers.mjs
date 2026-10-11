// ----------------------------------------
// SAMPLE_PLAYER = {
//   name: "Doruk",
//   names: ["Doruk", "Kolombo"],
//   label: "40301 :: Doruk",
//   server_id: 11174,
//   server_id_current: 1006,
//   server_name: "PT_174",
//   server_name_current: "AMEN_006",
//   uid: "40301",
//   lang: "pt",
//   level: 202,
//   level_diff: 5,
//   ranks: ["lomdb"]
// }
// ----------------------------------------

import fs from 'fs'
import path from 'path'
import { SPREADSHEETS } from './fetchSpreadsheets.mjs'
import getServerId from '../utils/getServerId.mjs'
import getServerName from '../utils/getServerName.mjs'
import config from '../sharedConfig.mjs'

// helpers
const USERS_IMG_DIR = path.resolve('img/users')
const DEFAULT_IMG = './img/users/lom_mushroom.png'

function getUserImage(name) {
  const filename = `${name.toLowerCase()}.webp`
  const filePath = path.join(USERS_IMG_DIR, filename)

  if (fs.existsSync(filePath)) {
    return `./img/users/${filename}`
  }

  return DEFAULT_IMG
}

// ----------------------------------------
function parsePlayers(serverMap) {
  const csv = fs
    .readFileSync(SPREADSHEETS.players.file, 'utf8')
    .trim()
  const lines = csv.split('\n')
  lines.shift() // remove header

  const players = lines
    .filter(Boolean)
    .map(line => {
      const [
        region,
        isTracking,
        name,
        server,
        uid,
        ranks,
        ...rest
      ] = line
        .replace('\r', '')
        .replaceAll('"', '')
        .split(',')

      const levels = rest
        .map(v => v.trim())
        .filter(v => v !== '' && !Number.isNaN(Number(v)))
        .map(Number)

      const current = levels.at(-1)
      let previous = null
      for (let i = config.LEVELS_CONSIDERED; i >= 2; i--) {
        const previousLevel = levels.at(-i)
        if (previousLevel !== undefined) {
          previous = previousLevel
          break
        }
      }

      const names = name.trim().split('|')
      const serverTrimmed = server.trim()

      const isProphet = serverTrimmed === 'EN_122'

      if (isProphet) {
        return {
          name: names[0],
          names,
          label: [uid.trim(), names[0]]
            .filter(v => v && v !== 'null')
            .join(' :: '),
          server_name: serverTrimmed,
          server_id: getServerId(serverTrimmed),
          server_name_current: 'EN_118',
          server_id_current: 10118,
          uid: uid.trim(),
          lang: serverTrimmed.split('_')[0].toLowerCase(),
          lang_current: serverTrimmed
            .split('_')[0]
            .toLowerCase(),
          leaderboard_pos: undefined,
          level: current,
          level_diff:
            previous !== null ? current - previous : 0,
          ranks: ranks.trim().split('|').filter(Boolean),
          img: getUserImage(names[0]),
        }
      } else if (server) {
        return {
          name: names[0],
          names,
          label: [uid.trim(), names[0]]
            .filter(v => v && v !== 'null')
            .join(' :: '),
          server_name: serverTrimmed,
          server_id: getServerId(serverTrimmed),
          server_name_current: getServerName(
            serverMap[serverTrimmed]
          ),
          server_id_current: serverMap[serverTrimmed],
          uid: uid.trim(),
          lang: serverTrimmed.split('_')[0].toLowerCase(),
          lang_current: getServerName(
            serverMap[serverTrimmed]
          )
            .split('_')[0]
            .toLowerCase(),
          leaderboard_pos: undefined,
          level: current,
          level_diff:
            previous !== null ? current - previous : 0,
          ranks: ranks.trim().split('|').filter(Boolean),
          img: getUserImage(names[0]),
        }
      } else {
        return null
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.level - a.level)

  // -------- find highest level
  const maxLevel = players[0].level
  const minAllowed = maxLevel - config.MIN_LEVELS_BELOW

  // -------- remove level if too low
  for (const player of players) {
    if (player.level > 199 && player.level < minAllowed) {
      player.ranks.unshift('lv200')
      player.level = 200
      player.level_diff = undefined
    } else if (player.level < minAllowed) {
      player.level = undefined
      player.level_diff = undefined
    } else {
      player.leaderboard_pos = maxLevel - player.level + 1
    }
  }

  players.sort((a, b) => {
    const aHasLevel = typeof a.level === 'number'
    const bHasLevel = typeof b.level === 'number'

    const aIsElder = a.ranks.includes('lv200')
    const bIsElder = b.ranks.includes('lv200')

    const aHasRank = (a.ranks?.length ?? 0) > 0
    const bHasRank = (b.ranks?.length ?? 0) > 0

    // Both have level → sort by level descending
    if (aHasLevel && bHasLevel) {
      if (a.level !== b.level) return b.level - a.level
    }

    // One has level, one doesn't → level wins
    if (aHasLevel && !bHasLevel) return -1
    if (!aHasLevel && bHasLevel) return 1

    if (a.level_diff < b.level_diff) return 1
    if (b.level_diff < a.level_diff) return -1

    // Both no level → elder rank wins
    if (aIsElder && !bIsElder) return -1
    if (!aIsElder && bIsElder) return 1

    // Both no level → rank wins
    if (aHasRank && !bHasRank) return -1
    if (!aHasRank && bHasRank) return 1

    // Tie-breaker: server_id ascending
    if (a.server_id !== b.server_id)
      return a.server_id - b.server_id

    // Tie-breaker: uid ascending
    return a.uid.localeCompare(b.uid)
  })

  return players
}

// ----------- Default export
export default function parseData() {
  const SERVERS_FILE = path.resolve(
    'server/db/servers.json'
  )
  const servers = JSON.parse(
    fs.readFileSync(SERVERS_FILE, 'utf8')
  )

  const serverMap = Object.fromEntries(
    servers.map(({ name, merge_id, id }) => {
      const current = merge_id !== 0 ? merge_id : id
      return [name, +current]
    })
  )

  const players = parsePlayers(serverMap)

  const DB_DIR = path.resolve('server/db')
  const outFile = path.join(DB_DIR, 'players.json')
  fs.writeFileSync(
    outFile,
    JSON.stringify(players, null, 2),
    'utf8'
  )
  console.log(`✔ Players data generated`)
}
