import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import artifacts from '../db/item_artifacts.mjs'

export default function generateArtifactsData() {
  const artifactsData = createItemCards(artifacts, 'artifacts')
  
  artifactsData.forEach(e => (e.template = minifyHTML(e.template)))
  // console.log({ artifactsData })
  fs.writeFileSync(
    path.join('js', 'data_artifacts.json'),
    `${JSON.stringify(artifactsData, null)}`,
    'utf-8'
  )
  console.log('✔ Artifacts table generated')
}
