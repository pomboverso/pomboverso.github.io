import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import config from '../sharedConfig.mjs'

const PLAYERS_FILE = path.resolve('server/db/players.json')

function generateTable(players) {
  const levels = players.map(u => u.level)
  const max = levels[0]
  const min = levels[0] - 14

  const grouped = Object.groupBy(players, u => u.level)

  for (let lv = min; lv <= max; lv++) {
    if (!grouped[lv]) {
      grouped[lv] = [
        {
          isEmpty: true,
        },
      ]
    }
  }

  const sortedLevels = Object.keys(grouped)
    .map(Number)
    .filter(Boolean)
    .sort((a, b) => b - a)
    // .splice(0, config.MIN_LEVELS_BELOW + 1)

  const rows = []

  for (const lv of sortedLevels) {
    const users = grouped[lv]

    const filter_keys = users
      .flatMap(u => [u.name, 'sv' + u.server_name, u.uid])
      .join(' ')
      .toLowerCase()

    const usersGroup = users
      .map(
        ({
          isEmpty,
          img,
          name,
          server_name,
          lang,
          level_diff,
          uid,
        }) => {
          return isEmpty
            ? `
          <nn-pilar role="cell" class="fusion flex-column">
            <nn-pill color="#081f3c">
              ---
            </nn-pill>

          </nn-pilar>
        `
            : `
          <nn-pilar role="cell" class="fusion flex-column">
            <div class="avatar-wrapper"> 
              <img src="${img}" alt="profile avatar" height="90" class="avatar">                     
            </div>

            <nn-pill color="#081f3c">
              ${name}
            </nn-pill>

            <nn-pill class="${lang}">
              ${server_name} :: ${uid}
            </nn-pill>

            <nn-pill color="${level_diff > 0 ? '#4ead29' : '#c22f54'}">
              ${level_diff > 0 ? `+${level_diff}` : '--'}
            </nn-pill>
          </nn-pilar>
        `
        }
      )
      .join('')

    const row = `
        <nn-pilar size="300px" class="flex-column leading-server" role="cell">
          <span class="index">
            ${lv}
          </span>
          <nn-pill color="#202028">
            #${max - lv + 1}
          </nn-pill>
        </nn-pilar>

        <nn-pilar size="100% - 300px - 0.25rem" role="cell">
          <div role="group">
            <div role="table">
              <div role="rowgroup">
                <nn-fila break="md" class="merge-group" role="row">
                  ${usersGroup}
                </nn-fila>
              </div>
            </div>
          </div>
        </nn-pilar>
      `

    rows.push({ filter_keys, template: row })
  }

  return rows
}

export default async function run() {
  const players = JSON.parse(
    fs.readFileSync(PLAYERS_FILE, 'utf8')
  )

  const playersData = generateTable(players)

  playersData.forEach(
    e => (e.template = minifyHTML(e.template))
  )

  fs.writeFileSync(
    path.join('js', 'data_lv.json'),
    JSON.stringify(playersData),
    'utf-8'
  )

  console.log('✔ Leaderboard table generated')
}
