import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'

function generateRows(timeline) {
  const rows = []

  timeline.forEach(leadServer => {
    const nestedServers = leadServer.servers

    const nestedServersHTML = nestedServers
      .map(({ lang, id, name, players }) => {
        if (players.length > 0) {
          const hasStaff = players.find(
            player => player.ranks?.length > 0
          )
  
          const hasElder = players.find(
            player => player.leaderboard_pos
          )
  
          const has200Elder = players.find(
            player => player.ranks.find(rank => rank.includes('lv200'))
          )

          const cellStyle = hasElder ? 'cell-elder' : has200Elder ? 'cell-200' : hasStaff ? 'cell-staff' : ''

          const playersHTML = players
            .map(({ label, leaderboard_pos, ranks }) => {
              const pills = ranks
                .map(
                  rank =>
                    `<nn-pill class="${rank}">${rank}</nn-pill>`
                )
                .join('')

              const elder = leaderboard_pos
                ? `<nn-pill class="top">${leaderboard_pos}</nn-pill>`
                : ''

              return `<li>${pills} ${elder} ${label}</li>`
            })
            .join('')

          return `
            <nn-pilar
              role="cell"
              class="fusion ${[lang, cellStyle].join(' ')}"
              style="order:${id}"
            >
              <details>
                <summary>${name}</summary>
                <ul>${playersHTML}</ul>
              </details>
            </nn-pilar>
          `
        }

        return `
          <nn-pilar
            role="cell"
            class="fusion ${lang}"
            style="order:${id}"
          >
            ${name}
          </nn-pilar>
        `
      })
      .join('')

    const allCompServers = nestedServers.map(
      ({ name }) => 'sv' + name.toLowerCase()
    )

    const playersButton = `
      <nn-btn color="#ffcf24" link
        href="players.html?filterby=${allCompServers.join('%2C')}">
        PLAYERS BOARD
      </nn-btn>`

    const mergeCompButton = `
      <nn-btn color="#ffcf24" link
        href="merges.html?filterby=${allCompServers.join('%2C')}">
        MERGE COMPOSITION
      </nn-btn>`

    // const mergeBlockButton = `
    //   <nn-btn color="#ffcf24" link
    //     href="merges-blocks.html?filterby=${allCompServers.join('%2C')}">
    //     MERGE BLOCK
    //   </nn-btn>`

    const filter_keys = allCompServers
      .join(' ')
      .toLowerCase()

    const template = `
      <nn-pilar size="300px" class="leading-server flex-column" role="cell">
        <span class="index">${leadServer.index}</span>

        <nn-pill text-color="#fff" class="${leadServer.lang}">
          ${leadServer.name}
        </nn-pill>

        <nn-pill color="#404a60">
          Size: ${nestedServers.length}
        </nn-pill>

        ${playersButton}
        ${mergeCompButton}
      </nn-pilar>

      <nn-pilar size="100% - 300px - 0.25rem" role="cell">
        <div role="group" aria-label="Merged servers for ${leadServer.name}">
          <div role="table">
            <div role="rowgroup">
              <nn-fila break="md" class="merge-group" role="row">
                ${nestedServersHTML}
              </nn-fila>
            </div>
          </div>
        </div>
      </nn-pilar>
    `

    rows.push({ filter_keys, template })
  })

  return rows
}

export default function generateTimelineData() {
  const TIMELINE_FILE = path.resolve(
    'server/db/timeline.json'
  )
  const timeline = JSON.parse(
    fs.readFileSync(TIMELINE_FILE, 'utf8')
  )

  const timelineData = generateRows(timeline)

  timelineData.forEach(
    e => (e.template = minifyHTML(e.template))
  )

  fs.writeFileSync(
    path.join('js', 'data_timeline.json'),
    JSON.stringify(timelineData, null),
    'utf8'
  )

  console.log('✔ Timeline table generated')
}
