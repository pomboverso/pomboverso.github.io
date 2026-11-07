import fs from 'fs'
import path from 'path'

function buildRowTemplate(row) {
  const groups = row.servers
    .sort((a, b) => a.id - b.id)
    .map(
      ({ name, opentime, lang }) => `
    <nn-pilar
      role="cell"
      class="fusion ${lang} flex-column"
    >
      ${name}
      <nn-pill>
        ${opentime}
      </nn-pill>
    </nn-pilar>
  `
    )
    .join('')

  return `
    <nn-fila class="row" gap=".25rem" role="row" break="md">
      <nn-pilar size="300px" class="leading-server flex-column" role="cell">
        <div class="index-group">
          <span class="index">${row.servers[0].years}</span>
          <span>years</span>
        </div>
        <nn-pill color="#404a60">
          Days: ${row.servers[0].days}
        </nn-pill>
        <nn-pill color="#404a60">
          Size: ${row.servers.length}
        </nn-pill>
      </nn-pilar>

      <nn-pilar size="100% - 300px - 0.25rem" role="cell">
        <div role="group">
          <div role="table">
            <div role="rowgroup">
              <nn-fila break="md" class="merge-group" role="row">
                ${groups}
              </nn-fila>
            </div>
          </div>
        </div>
      </nn-pilar>
    </nn-fila>
  `
}

function generateRows(servers) {
  const rows = []

  for (const { name, opentime, id, years, days, lang } of servers) {
    const filter_keys = 'sv' + name.toLowerCase()

    rows.push({
      filter_keys,
      data: {
        years,
        days,
        id,
        name,
        opentime,
        lang,
      },
    })
  }

  const grouped = Object.values(
    rows.reduce((acc, { filter_keys, data }) => {
      if (!acc[data.days]) {
        acc[data.days] = {
          days: data.days,
          filter_keys,
          servers: [],
        }
      } else {
        acc[data.days].filter_keys += ' ' + filter_keys
      }

      acc[data.days].servers.push(data)
      return acc
    }, {})
  ).sort((a, b) => b.days - a.days)

  return grouped.map(row => ({
    years: row.years,
    filter_keys: row.filter_keys,
    template: buildRowTemplate(row),
  }))
}

export default function generateAgeData() {
  const SERVERS_FILE = path.resolve('server/db/servers.json')
  const servers = JSON.parse(
    fs.readFileSync(SERVERS_FILE, 'utf8')
  )

  const ageData = generateRows(servers)

  fs.writeFileSync(
    path.join('js', 'data_age.json'),
    JSON.stringify(ageData),
    'utf-8'
  )

  console.log(`✔ Age table generated`)
}
