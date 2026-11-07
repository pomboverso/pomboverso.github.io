import fs from 'fs'
import path from 'path'
import minifyHTML from '../utils/minifyHTML.mjs'
import createItemCards from '../processors/items.mjs'
import itemOrder from '../db/item_mounts_rewards_order.mjs'
import mounts from '../db/item_mounts.mjs'

function sortMountsByItemScore(mounts, itemOrder) {
  const getScore = items =>
    items.reduce(
      (total, item) => total + (itemOrder[item] || 0),
      0
    )

  return mounts
    .slice()
    .sort((a, b) => getScore(b.items) - getScore(a.items))
    .map(mount => ({
      ...mount,
      items: mount.items
        .slice()
        .sort(
          (a, b) =>
            (itemOrder[b] || 0) - (itemOrder[a] || 0)
        ),
    }))
}

export default function generateMountsData() {
  const mountsData = createItemCards(
    sortMountsByItemScore(mounts, itemOrder),
    'mounts'
  )

  mountsData.forEach(
    e => (e.template = minifyHTML(e.template))
  )
  fs.writeFileSync(
    path.join('js', 'data_mounts.json'),
    `${JSON.stringify(mountsData, null)}`,
    'utf-8'
  )
  console.log('✔ Mounts table generated')
}
