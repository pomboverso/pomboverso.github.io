import fs from 'fs'
import path from 'path'

let serverMap = null

export default function expandServer(serverName) {
  if (!serverMap) {
    const SERVERS_FILE = path.resolve(
      'server/db/servers.json'
    )

    const servers = JSON.parse(
      fs.readFileSync(SERVERS_FILE, 'utf8')
    )

    serverMap = new Map(servers.map(s => [s.name, s]))
  }

  return serverMap.get(serverName)
}
