import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import backs from '../db/item_backs.mjs'

export default function generateBacksData() {
  const backsData = createItemCards(backs, 'back-accesories')

  backsData.forEach(e => (e.template = minifyHTML(e.template)))
  
  fs.writeFileSync(
    path.join('js', 'data_backs.json'),
    `${JSON.stringify(backsData, null)}`,
    'utf-8'
  )
  console.log('✔ Back Accesories table generated')
}