import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import { usersDB as users } from '../processors/users.mjs'
import { getOriginalServer } from '../processors/all_merges.mjs'

function groupByIdWithDuplicatesOnly(array) {
  const groups = array.reduce((acc, obj) => {
    const { id } = obj
    if (!acc[id]) acc[id] = []
    acc[id].push(obj)
    return acc
  }, {})

  return Object.entries(groups).filter(([_, users]) => {
    if (users.length < 2) return false
    // const baseServer = getOriginalServer(users[0].server)
    return users //.every(u => getOriginalServer(u.server) === baseServer)
  })
}

function normalizeData() {
  const data = groupByIdWithDuplicatesOnly(users)
  const rows = []

  data.map(([key, value]) => {
    const servers = value
      .map(user => {
        const currentServer = getOriginalServer(user.server)

        return `
          <nn-pilar class="fusion" role="cell">
            <nn-pill class="${
              currentServer?.key.id || user.lang
            }">
              ${currentServer?.key.label || user.server}
            </nn-pill>
            &nbsp;/&nbsp;
            <nn-pill class="${user.lang}">
              ${user.server}
            </nn-pill>
          </nn-pilar>
            `
      })
      .join('')

    const players = value
      .map(user => {
        const names = user.names
          .map(n => {
            const localName = n?.o ? `${n.o}` : n
            return `
            <nn-pill color="#202028">
              ${localName}
            </nn-pill>
          `
          })
          .join('')

        return `
          <nn-pilar class="fusion ${user.lang}" role="cell">
            ${names}
          </nn-pilar>
            `
      })
      .join('')

    const filter_keys = [
      key,
      value.map(user => {
        const names = user.names?.map(name =>
          name?.o ? name.o : name
        )
        const currentServer = getOriginalServer(user.server)
        return [
          'sv' + currentServer?.key?.label,
          'sv' + user.server,
          names,
        ]
      }),
    ]
      .flat(2)
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    const row = `
      <nn-pilar size="15%" class="leading-server flex-column" role="cell">
        ${key}
      </nn-pilar>
      <nn-pilar size="25%" class="leading-server" role="cell">
        <div role="group" aria-label="Duplicated users with ${key}">
          <div role="table">
            <div role="rowgroup">
              <nn-fila break="md" class="players-group" role="row">
                ${servers}
              </nn-fila>
            </div>
          </div>
        </div>
      </nn-pilar>
      <nn-pilar size="60% - .25rem * 2" role="cell">
        <div role="group" aria-label="Duplicated users with ${key}">
          <div role="table">
            <div role="rowgroup">
              <nn-fila break="md" class="players-group" role="row">
                ${players}
              </nn-fila>
            </div>
          </div>
        </div>
      </nn-pilar>
        `

    rows.push({ filter_keys, template: row })
  })

  return rows
}

const duplicationData = normalizeData()

export default function generatePlayersDuplicationData() {
  duplicationData.forEach(
    e => (e.template = minifyHTML(e.template))
  )
  // console.log({ duplicationData })
  fs.writeFileSync(
    path.join('js', 'data_duplication.json'),
    `${JSON.stringify(duplicationData, null)}`,
    'utf-8'
  )
}
