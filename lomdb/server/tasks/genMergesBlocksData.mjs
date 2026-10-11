import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'

import getCountryCode from '../utils/getCountryCode.mjs'
import getCurrentServer from '../utils/getCurrentServer.mjs'
import getServerId from '../utils/getServerId.mjs'
import mergesGlobal from '../db/merges_global.mjs'

// console.log(mergesGlobal)

const regDic = {
  AM: 'amen',
  EU: 'euen',
}

function allServers(inputs) {
  const merged = {}
  for (const input of inputs) {
    for (const [date, entries] of Object.entries(input)) {
      merged[date] ??= {}
      Object.assign(merged[date], entries)
    }
  }

  const byServer = {}

  for (const [date, servers] of Object.entries(merged)) {
    for (const [key, values] of Object.entries(servers)) {
      const root = getCountryCode(
        getCurrentServer(key)?.key.label,
        date
      )
      if (root) {
        const rootKey = root.id + '::' + root.label
        if (!byServer[rootKey]) {
          byServer[rootKey] = {
            ...root,
            mergeDates: new Set(),
          }
        }
        byServer[rootKey].mergeDates.add(date)
      }

      for (const e of values) {
        const child = getCountryCode(
          getCurrentServer(e)?.key.label,
          date
        )
        if (child) {
          const childKey = child.id + '::' + child.label
          if (!byServer[childKey]) {
            byServer[childKey] = {
              ...child,
              mergeDates: new Set(),
            }
          }
          byServer[childKey].mergeDates.add(date)
        }
      }
    }
  }

  // group servers by region + earliest merge date
  const byRegionDate = {}

  for (const server of Object.values(byServer)) {
    const mergeDates = [...server.mergeDates].sort()
    const firstDate = mergeDates[0] ?? null
    const region = getServerId(server.numericId)

    if (!region || !firstDate) continue

    const key = `${region}::${firstDate}`
    if (!byRegionDate[key]) {
      byRegionDate[key] = {
        region,
        date: firstDate,
        blocks: [],
      }
    }
    byRegionDate[key].blocks.push({
      ...server,
      mergeDates: new Set(mergeDates),
    })
  }

  // sort blocks by index inside each group
  for (const group of Object.values(byRegionDate)) {
    group.blocks.sort((a, b) =>
      a.label.localeCompare(b.label)
    )
  }

  return Object.values(byRegionDate)
}

const data = allServers([mergesGlobal])

function generateTables() {
  const rows = []

  data.forEach(merge => {
    const groups =
      merge.blocks
        .map(cell => {
          const merges = [...cell.mergeDates]
            .map(
              (md, index) => `
            <nn-pill data-tooltip="${
              index + 1
            } merge date">${md}</nn-pill>
            `
            )
            .join('')

          const serverCompButton = `
          <nn-btn
            color="#ffcf24"
            link
            href="timeline.html?filterby=sv${cell.label.toLowerCase()}"
          >
            ${'Server Composition'.toUpperCase()}
          </nn-btn>`

          return `
            <nn-pilar
              class="fusion ${cell.id}"
              role="cell"
              style="order:${cell.numericId}"
            >
              <div class="flex-column">
                ${cell.label}
                ${merges}
                ${serverCompButton}
              </div>
            </nn-pilar>
          `
        })
        .join('') ||
      `<nn-pilar class="fusion ${key.id}" role="cell">--</nn-pilar>`

    const allCompServers = merge.blocks
      .map(i => 'sv' + i.label)
      .flat()

    const playersButton = `
          <nn-btn
            color="#ffcf24"
            link
            href="players.html?filterby=${allCompServers
              .join('%2C')
              .toLowerCase()}"
          >
            ${'Players Board'.toUpperCase()}
          </nn-btn>`

    const filter_keys = [merge.date, allCompServers]
      .flat()
      .join(' ')
      .replace(/-/g, '_')
      .toLowerCase()

    const row = `
        <nn-pilar size="300px" class="leading-server flex-column" role="cell">
          <nn-pill class="${regDic[merge.region]}">
            ${merge.region} :: ${merge.date}
          </nn-pill>
          <nn-pill color="#404a60">
            Size: ${merge.blocks.length}
          </nn-pill>
          ${playersButton}
        </nn-pilar>
        <nn-pilar size="100% - 300px - 0.25rem" role="cell">
          <div role="group" aria-label="Merged servers for ${
            merge.region
          } ${merge.date}">
            <div role="table">
              <div role="rowgroup">
                <nn-fila break="md" class="merge-group" role="row">
                  ${groups}
                </nn-fila>
              </div>
            </div>
          </div>
        </nn-pilar>
          `

    rows.push({
      filter_keys,
      template: row,
    })
  })

  return rows
}

const mergedData = generateTables()

export default function generateMergesData() {
  mergedData.map(
    row => (row.template = minifyHTML(row.template))
  )
  fs.writeFileSync(
    path.join('js', 'data_merges-blocks.json'),
    `${JSON.stringify(mergedData, null)}`,
    'utf-8'
  )
  console.log('✔ Merges Block table generated')
}
