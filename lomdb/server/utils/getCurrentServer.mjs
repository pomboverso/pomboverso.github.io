// ----------------------------------------
// ORIGINAL_SERVER: PT_174 -> CURRENT_SERVER: AMEN_006
// ----------------------------------------

import fs from 'fs'
import path from 'path'
import getServerId from './getServerId.mjs'
import getServerName from './getServerName.mjs'

const SERVERS_FILE = path.resolve('server/db/servers.json')
const servers = JSON.parse(
  fs.readFileSync(SERVERS_FILE, 'utf8')
)

export default function (server_name) {
  const server_id = getServerId(server_name)
  const currentServer = servers.find(
    server => server.merge_id === server_id
  )
  return getServerName(currentServer)
}