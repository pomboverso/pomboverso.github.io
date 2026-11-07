import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import mergesGlobal from '../db/merges_global.mjs'
import expandServer from '../utils/expandServer.mjs'

function generateTables(data) {
  const tables = []

  data
    .reverse()
    .forEach(([mergeBlockDate, mergeBlockServers]) => {
      const rows = []

      Object.entries(mergeBlockServers).forEach(
        ([serverLead, servers]) => {
          let [serverLeadLang, serverLeadNumericPart] =
            serverLead.split('_')
          serverLeadLang = serverLeadLang.toLowerCase()

          const serverGroup =
            servers
              .map(server => {
                let [lang] = server.split('_')
                lang = lang.toLowerCase()

                return `<nn-pilar class="fusion ${lang}" role="cell">${server}</nn-pilar>`
              })
              .join('') ||
            `<nn-pilar class="fusion ${serverLeadLang}" role="cell">--</nn-pilar>`

          const allCompServers = [
            serverLead,
            ...servers,
          ].map(s => 'sv' + s)

          const playersButton = `
        <nn-btn
          color="#ffcf24"
          link
          href="players.html?filterby=${allCompServers.join('%2C').toLowerCase()}"
        >
          PLAYERS BOARD
        </nn-btn>`

          const filter_keys = [
            mergeBlockDate,
            serverLead,
            allCompServers,
          ]
            .flat()
            .join(' ')
            .replace(/-/g, '_')
            .toLowerCase()

          const attrs = [
            +serverLeadNumericPart <= 450 &&
            serverLeadLang === 'amen'
              ? 'b-duck::no-speeding'
              : null,
            +serverLeadNumericPart <= 807 &&
            serverLeadLang === 'amen'
              ? 'rabbits::no-speeding'
              : null,
          ]
            .filter(Boolean)
            .map(
              e => `<nn-pill color="#2c5770">${e}</nn-pill>`
            )
            .join('')

            
            const serverLeadExpanded =
            expandServer(serverLead)
            
          const row = `
        <nn-fila break="md" gap=".25rem" class="row" role="row">
          <nn-pilar size="300px" class="leading-server flex-column" role="cell">
          <nn-pill class="${serverLeadLang}">${serverLead}</nn-pill>
          <nn-pill color="#404a60">${serverLeadExpanded.years} years</nn-pill>
            ${playersButton}
            ${attrs}
          </nn-pilar>
          <nn-pilar size="100% - 300px - 0.25rem" role="cell">
            <div role="group" aria-label="Merged servers for ${serverLead}">
              <div role="table">
                <div role="rowgroup">
                  <nn-fila break="md" class="merge-group" role="row">
                    ${serverGroup}
                  </nn-fila>
                </div>
              </div>
            </div>
          </nn-pilar>
        </nn-fila>`

          rows.push({ filter_keys, template: row })
        }
      )

      const filter_keys = rows
        .map(row => row.filter_keys)
        .join(' ')

      tables.push({
        date: mergeBlockDate,
        filter_keys,
        rows,
      })
    })

  return tables
}

export default function generateMergesData() {
  const data = Object.entries(mergesGlobal)
  const mergedData = generateTables(data)

  mergedData.forEach(table => {
    table.rows.forEach(
      row => (row.template = minifyHTML(row.template))
    )
  })

  fs.writeFileSync(
    path.join('js', 'data_merged.json'),
    JSON.stringify(mergedData, null),
    'utf-8'
  )

  console.log('✔ Merge table generated')
}
