// ----------------------------------------
// SAMPLE_TIMELINE = [
//   {
//     id: 39019,
//     name: 'TR_019',
//     opentime: 1710163740,
//     merge_id: 30035,
//     servers: [
//       {
//         // SAMPLE_SERVER
//         id: 39019,
//         name: 'TR_019',
//         opentime: 1710163740,
//         merge_id: 30035,
//         players: [
//           // SAMPLE_PLAYER
//           {
//             name: 'Doruk',
//             names: ['Doruk', 'Kolombo'],
//             label: '40301 :: Doruk',
//             server_id: 11174,
//             server_id_current: 1006,
//             server_name: 'PT_174',
//             server_name_current: 'AMEN_006',
//             uid: '40301',
//             lang: 'pt',
//             level: 202,
//             level_diff: 5,
//             ranks: ['lomdb'],
//           },
//           // SAMPLE_PLAYER_2
//           {
//             name: 'Doruk',
//             names: ['Doruk', 'Kolombo'],
//             label: '40301 :: Doruk',
//             server_id: 11174,
//             server_id_current: 1006,
//             server_name: 'PT_174',
//             server_name_current: 'AMEN_006',
//             uid: '40301',
//             lang: 'pt',
//             level: 202,
//             level_diff: 5,
//             ranks: ['lomdb'],
//           },
//         ],
//       },
//       {
//         // SAMPLE_SERVER_2
//         id: 39019,
//         name: 'TR_019',
//         opentime: 1710163740,
//         merge_id: 30035,
//         players: [
//           // SAMPLE_PLAYER_2
//           {
//             name: 'Doruk',
//             names: ['Doruk', 'Kolombo'],
//             label: '40301 :: Doruk',
//             server_id: 11174,
//             server_id_current: 1006,
//             server_name: 'PT_174',
//             server_name_current: 'AMEN_006',
//             uid: '40301',
//             lang: 'pt',
//             level: 202,
//             level_diff: 5,
//             ranks: ['lomdb'],
//           },
//         ],
//       },
//     ],
//   },
// ]
// ----------------------------------------

import fs from 'fs'
import path from 'path'

const DB_DIR = path.resolve('server/db')

const SERVERS_FILE = path.resolve('server/db/servers.json')
const servers = JSON.parse(
  fs.readFileSync(SERVERS_FILE, 'utf8')
)

const PLAYERS_FILE = path.resolve('server/db/players.json')
const players = JSON.parse(
  fs.readFileSync(PLAYERS_FILE, 'utf8')
)

function buildTimeline(servers, players) {
  const timelineMap = new Map()
  const serverMap = new Map()

  // create server map
  for (const s of servers) {
    serverMap.set(s.id, { ...s, players: [] })
  }

  // create timeline roots
  for (const s of servers) {
    if (s.merge_id === 0) {
      timelineMap.set(s.id, {
        id: s.id,
        name: s.name,
        opentime: s.opentime,
        merge_id: s.merge_id,
        servers: [],
      })
    }
  }

  // assign servers to timeline groups
  for (const s of servers) {
    const rootId = s.merge_id === 0 ? s.id : s.merge_id

    const timeline = timelineMap.get(rootId)
    if (!timeline) continue

    timeline.servers.push(serverMap.get(s.id))
  }

  // attach players
  for (const p of players) {
    const server = serverMap.get(p.server_id)
    if (!server) continue
    server.players.push(p)
  }

  return [...timelineMap.values()]
}

// ----------- Default export
export default function parseData() {
  const timeline = buildTimeline(servers, players).sort(
    (a, b) => a.id - b.id
  )

  // region counters
  const regionIndex = {}

  for (const t of timeline) {
    const lang = t.name.split('_')[0].toLowerCase()

    if (!regionIndex[lang]) regionIndex[lang] = 0

    regionIndex[lang]++
    t.index = regionIndex[lang]
    t.lang = lang
  }

  const outFile = path.join(DB_DIR, 'timeline.json')
  fs.writeFileSync(
    outFile,
    JSON.stringify(timeline, null, 2),
    'utf8'
  )
  console.log(`✔ Timeline data generated`)
}
