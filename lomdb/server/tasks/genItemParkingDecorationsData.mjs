import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import parkingDecorations from '../db/item_parking-decorations.mjs'

const priorities = [
  '{{PARKING_COINS}}',
  '{{ADVENTURE_REWARDS}}',
  '{{REMODELING_POINTS}}',
  '{{ATK}}',
  '{{DEF}}',
  '{{HP}}',
  '{{PROTECTION_TIME}}',
  '{{NOTHING}}',
]

function getPriorityIndex(entry) {
  return priorities.findIndex(p => entry.includes(p))
}

function getNumericValue(entry) {
  const match = entry.match(/([\d.]+)(?=%|m)/)
  return match ? parseFloat(match[1]) : 0
}

const sorted = [...parkingDecorations].sort((a, b) => {
  const aEntry = a.details[0]?.list?.[0] || ''
  const bEntry = b.details[0]?.list?.[0] || ''

  const aPriority = getPriorityIndex(aEntry)
  const bPriority = getPriorityIndex(bEntry)

  if (aPriority !== bPriority) {
    return aPriority - bPriority
  }

  const aValue = getNumericValue(aEntry)
  const bValue = getNumericValue(bEntry)

  // Sort descending numerically if same priority
  return bValue - aValue
})

const parkingDecorationsData = createItemCards(sorted, 'parking-decorations')

export default function generateParkingDecorationsData() {
  parkingDecorationsData.forEach(e => (e.template = minifyHTML(e.template)))
  // console.log({ parkingDecorationsData })
  fs.writeFileSync(
    path.join('js', 'data_parking-decorations.json'),
    `${JSON.stringify(parkingDecorationsData, null)}`,
    'utf-8'
  )
  console.log('✔ Parking Decorations table generated')
}
