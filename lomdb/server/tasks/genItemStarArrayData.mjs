import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import starArray from '../db/item_star-array.mjs'

export default function generateStarArrayData() {
  const starArrayData = createItemCards(
    starArray,
    'star-array'
  )

  starArrayData.forEach(
    e => (e.template = minifyHTML(e.template))
  )

  fs.writeFileSync(
    path.join('js', 'data_star-array.json'),
    JSON.stringify(starArrayData, null),
    'utf-8'
  )
  console.log('✔ Star Array table generated')
}
