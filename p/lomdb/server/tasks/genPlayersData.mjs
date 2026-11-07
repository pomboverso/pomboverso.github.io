import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'

function generateTable(players) {
  const rows = []

  players.forEach(
    ({
      server_name_current,
      names,
      ranks,
      uid,
      server_name,
      lang,
      lang_current,
      level,
      leaderboard_pos,
    }) => {
      const serverCompButton = `
      <nn-btn
        color="#ffcf24"
        link
        href="timeline.html?filterby=sv${server_name_current.toLowerCase() || ''}"
      >
        SERVER COMPOSITION
      </nn-btn>`

      const localNames = names
        .map(
          name => `
        <nn-pill class="${lang}">
          ${name}
        </nn-pill>
      `
        )
        .join('')

      const localRanks = ranks
        .filter(Boolean)
        .map(
          rank => `
        <nn-pill class="${rank}">
          ${rank}
        </nn-pill>
      `
        )
        .join('')

      const elder = leaderboard_pos
        ? `<nn-pill class="top">#${leaderboard_pos} :: Lv${level}</nn-pill>`
        : ''

      const filter_keys = [
        uid,
        names,
        'sv' + server_name,
        'sv' + server_name_current,
      ]
        .flat()
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const row = `
      <nn-pilar size="20%" class="flex-column" role="cell">
        <div class="flex-row">
          <nn-pill class="${lang_current}">${server_name_current}</nn-pill>
          &nbsp;/&nbsp;
          <nn-pill class="${lang}">${server_name}</nn-pill>
        </div>
        ${serverCompButton}
      </nn-pilar>

      <nn-pilar size="20%" class="flex-row" role="cell">
        ${uid}
      </nn-pilar>

      <nn-pilar size="35% - 0.25rem * 3" class="flex-row" role="cell">
        ${localNames}
      </nn-pilar>

      <nn-pilar size="25%" class="flex-column" role="cell">
        ${elder}
        ${localRanks}
      </nn-pilar>
    `

      rows.push({
        filter_keys,
        template: row,
      })
    }
  )

  return rows
}

export default function generatePlayersData() {
  const PLAYERS_FILE = path.resolve('server/db/players.json')
  const players = JSON.parse(
    fs.readFileSync(PLAYERS_FILE, 'utf8')
  )

  const playersData = generateTable(players)

  playersData.forEach(
    e => (e.template = minifyHTML(e.template))
  )

  fs.writeFileSync(
    path.join('js', 'data_players.json'),
    JSON.stringify(playersData, null),
    'utf-8'
  )

  console.log('✔ Players table generated')
}
