import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import avians from '../db/item_avians.mjs'

export default function generateAviansData() {
  const aviansData = createItemCards(avians, 'avians')
  
  aviansData.forEach(e => (e.template = minifyHTML(e.template)))
  // console.log({ aviansData })
  fs.writeFileSync(
    path.join('js', 'data_avians.json'),
    `${JSON.stringify(aviansData, null)}`,
    'utf-8'
  )
  console.log('✔ Avians table generated')
}