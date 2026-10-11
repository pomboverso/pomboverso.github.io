import fs from 'fs'
import path from 'path'

export default function generate3DData() {
  const SERVERS_FILE = path.resolve(
    'server/db/timeline.json'
  )
  const timeline = JSON.parse(
    fs.readFileSync(SERVERS_FILE, 'utf8')
  )

  const scolorHex = {
    amen: '#4f6618',
    amer: '#4f6618',
    es: '#3a761e',
    espt: '#20773d',
    pt: '#1d634a',
    euen: '#2e669e',
    mush: '#2e539e',
    de: '#2e2e9e',
    fr: '#412e9e',
    tr: '#792e9e',
    ru: '#8a2859',

    // cn: '#9d4b3b',
    // seacn: '#9d4b3b',
    // vn: '#9e662e',
    // id: '#8b9e2e',
    // en: '#669e2e',
    // th: '#2e8b9e',

    // kr: '#9f399f',
    // jp: '#9e2e66',
    // tw: '#9e2e2e',
  }

  const data = timeline
    .map(({ name: leadName, servers }) => {
      // const {lang, name} = servers

      const filter_keys = [
        'sv' + leadName,
        servers.map(i => 'sv' + i.name),
      ]
        .flat()
        .join(' ')
        .toLowerCase()

      const colors = servers.map(s => scolorHex[s.lang])

      return {
        filter_keys,
        colors,
        label: leadName,
        size: servers.length,
      }
    })
    .sort((a, b) => b.size - a.size)

  // console.log({ data })
  fs.writeFileSync(
    path.join('js', 'data_3d.json'),
    `${JSON.stringify(data, null)}`,
    'utf-8'
  )

  console.log('✔ 3D data generated')
}
