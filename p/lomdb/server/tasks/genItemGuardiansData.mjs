import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import guardians from '../db/item_guardians.mjs'

export default function generateGuardiansData() {
  const guardiansData = createItemCards(
    guardians,
    'guardians'
  )

  guardiansData.forEach(
    e => (e.template = minifyHTML(e.template))
  )
  fs.writeFileSync(
    path.join('js', 'data_guardians.json'),
    `${JSON.stringify(guardiansData, null)}`,
    'utf-8'
  )
  console.log('✔ Guardians table generated')
}
