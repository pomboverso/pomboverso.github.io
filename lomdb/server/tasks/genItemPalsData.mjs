import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import pals from '../db/item_pals.mjs'

export default function generatePalsData() {
  const palsData = createItemCards(
    pals.sort((a, b) => a.name.localeCompare(b.name)),
    'pals'
  )

  palsData.forEach(
    e => (e.template = minifyHTML(e.template))
  )

  fs.writeFileSync(
    path.join('js', 'data_pals.json'),
    `${JSON.stringify(palsData, null)}`,
    'utf-8'
  )
  console.log('✔ Pal table generated')
}
