import reg from '../enums/regions.mjs'

const pill = (color, label) =>
  `<nn-pill color="${color}">${label}</nn-pill>`
const replacements = {
  '{{i}}': '<div class="warning"><span>i</span></div>',
  '{{or}}': '<div class="neutral"><span>OR</span></div>',
  '{{and}}': '<div class="neutral"><span>AND</span></div>',

  '{{DEF}}': pill('#691aac', 'Defense'),
  '{{DMG_IMMUNITY}}': pill('#691aac', 'Damage Immunity'),
  '{{ATK}}': pill('#691aac', 'Attack'),
  '{{DMG}}': pill('#691aac', 'Damage'),
  '{{HP}}': pill('#691aac', 'Health'),
  '{{MAX_HP}}': pill('#691aac', 'Max HP'),
  '{{MOV_SPD}}': pill('#691aac', 'Movement Speed'),
  '{{EVASION}}': pill('#691aac', 'Evasion'),
  '{{KNOCKUP}}': pill('#691aac', 'Knocks up'),
  '{{STUNS}}': pill('#691aac', 'Stuns'),
  '{{AOE_DMG}}': pill('#691aac', 'AoE Damage'),
  '{{MIX_DMG}}': pill('#691aac', 'Mixed Damage'),
  '{{FINAL_DMG_BONUS}}': pill('#691aac', 'Final Damage Bonus'),
  '{{MAX_THOUGHNESS}}': pill('#691aac', 'Max Thoughness'),
  '{{THOUGHNESS}}': pill('#691aac', 'Thoughness'),

  '{{DMG_RES}}': pill('#1a60ac', 'Damage Resistance'),
  '{{FINAL_DMG_RES}}': pill('#1a60ac', 'Final Damage Resistance'),
  '{{CRIT_RES}}': pill('#1a60ac', 'Critical Resistance'),

  '{{SKILL_DMG}}': pill('#1c6841', 'Skill Damage'),
  '{{PAL_DMG}}': pill('#1c6841', 'Pal Damage'),
  '{{PAL_ATK}}': pill('#1c6841', 'Pal Attack'),
  '{{COUNTER_DMG}}': pill('#1c6841', 'Counter Damage'),
  '{{COMBO_DMG}}': pill('#1c6841', 'Combo Damage'),

  '{{BASIC_ATK}}': pill('#1c6841', 'Basic Attack'),
  '{{BASIC_ATK_DMG}}': pill(
    '#1c6841',
    'Basic Attack Damage'
  ),
  '{{PAL_BASIC_ATK}}': pill(
    '#1c6841',
    "Pals' Basic Attack"
  ),
  '{{COMBO}}': pill('#1c6841', 'Combo'),
  '{{COUNTER}}': pill('#1c6841', 'Counter'),
  '{{SKILL}}': pill('#1c6841', 'Skill'),
  '{{ACTIVE_SKILL}}': pill('#1c6841', 'Active Skill'),

  '{{CRIT_DMG}}': pill('#5b0c0c', 'Critical Damage'),
  '{{SKILL_CRIT}}': pill('#5b0c0c', 'Skill Critical'),
  '{{SKILL_CRIT_DMG}}': pill(
    '#5b0c0c',
    'Skill Critical Damage'
  ),
  '{{PAL_CRIT_DMG}}': pill(
    '#5b0c0c',
    'Pal Critical Damage'
  ),

  '{{CRIT_RATE}}': pill('#9b3434', 'Critical Rate'),
  '{{SKILL_CRIT_RATE}}': pill(
    '#9b3434',
    'Skill Critical Rate'
  ),
  '{{PAL_CRIT_RATE}}': pill('#9b3434', 'Pal Critical Rate'),

  '{{ATK_SPD}}': pill('#9b4a92', 'Attack Speed'),
  '{{PAL_ATK_SPD}}': pill('#9b4a92', 'Pal Attack Speed'),
  '{{ENERGY_REGEN_SPD}}': pill(
    '#9b4a92',
    'Energy Recovery Speed'
  ),
  '{{SKILL_REGEN_SPD}}': pill(
    '#9b4a92',
    'Skill Recovery Speed'
  ),
  '{{RECOVERY_EFFECTS}}': pill(
    '#9b4a92',
    'Recovery Effects'
  ),
  '{{REGEN_SPD}}': pill('#9b4a92', 'Recovery Speed'),
  '{{ALL_SHIELD_EFFECTS}}': pill('#9b4a92', 'All Shield Effects'),
  '{{PAL_REGEN_SPD}}': pill(
    '#9b4a92',
    'Pal Recovery Speed'
  ),

  '{{CTR}}': pill('#5f4811', 'Control Effect'),
  '{{CTR_TIME}}': pill('#5f4811', 'Control Time'),
  '{{CTR_TIME_RED}}': pill(
    '#5f4811',
    'Control Time Reduction'
  ),
  '{{ACT_SKILL_TIME}}': pill(
    '#5f4811',
    "Active Skill's Duration"
  ),

  '{{AREA_ENEMIES}}': pill(
    '#272727',
    'Enemies in the area'
  ),
  '{{ADVENTURE_REWARDS}}': pill(
    '#691aac',
    "Adventure Reward's Trigger Chance"
  ),
  '{{PROTECTION_TIME}}': pill('#691aac', 'Protection Time'),
  '{{PARKING_COINS}}': pill('#691aac', 'Parking Coins'),
  '{{REMODELING_POINTS}}': pill(
    '#691aac',
    'Remodeling Points'
  ),
  '{{NOTHING}}': pill('#333', 'No Bonus'),
}

function createCard(
  { name, alt_name, items, details, regions, svg, child },
  folder
) {
  const localItems = items
    ?.map(
      item => `
          <li data-tooltip="${item}">
            <img
              width="32"
              height="32"
              alt="${item}"
              src="./img/items/${item}.webp"
            >
          </li>
        `
    )
    .join('')

  function renderList(items) {
    let html = '<ul>'

    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      for (const [
        placeholder,
        replacement,
      ] of Object.entries(replacements)) {
        item = item.replace(
          new RegExp(placeholder, 'g'),
          replacement
        )
      }

      if (typeof item === 'string') {
        // Check if next item is a nested list
        const next = items[i + 1]
        if (Array.isArray(next)) {
          html += `<li>${item}${renderList(next)}</li>`
          i++ // skip next item since it’s already rendered
        } else {
          html += `<li>${item}</li>`
        }
      } else if (Array.isArray(item)) {
        // orphaned array (no string before it)
        html += `<li>${renderList(item)}</li>`
      }
    }

    html += '</ul>'
    return html
  }

  const detailsLocal = () => {
    const availableRegions =
      details?.flatMap(d => d.regions) || []
    const allRegions = regions || []

    const unavailableRegions = allRegions.filter(
      r => !availableRegions.includes(r)
    )

    let detailsEmpty

    if (unavailableRegions.length > 0) {
      detailsEmpty = `
        <details class="unavailable">
          <summary>
            ${unavailableRegions
              .map(
                e => `<nn-pill class="${e}">${e}</nn-pill>`
              )
              .join('')}
          </summary>
          <ul>
            <li>
              No Description
            </li>
          </ul>
        </details>
      `
    }

    let result
    if (details) {
      result = details?.map(item => {
        const regionsLocal = item.regions
          ?.sort((a, b) => reg[a].localeCompare(reg[b]))
          .map(
            region => `
              <nn-pill class="${region}">
                ${reg[region]}
              </nn-pill>
          `
          )
          .join('')

        const description = renderList(item.list)

        return `
          <details>
            <summary>
              ${regionsLocal}
            </summary>
            ${description}
          </details>
        `
      })
    }

    return [result, detailsEmpty]
      .flat()
      .filter(Boolean)
      .join('')
  }

  const imgPath = svg
    ? `./img/svg/${folder}/${name}.svg`
    : `./img/${folder}/${name}.webp`

  let childImg = ''
  if (child) {
    const childImgPath = svg
      ? `./img/svg/${folder}/${child}.svg`
      : `./img/${folder}/${child}.webp`

    childImg = `<img
    src="${childImgPath}"
    alt="${child}"
  >`
  }

  const resutl = `
  <h3>${name} ${
    alt_name ? `<nn-pill>${alt_name}</nn-pill>` : ''
  }</h3>

  <div class="item-preview">
    <img
      src="${imgPath}"
      alt="${name}"
    >
    ${childImg}
  </div>

  ${
    localItems
      ? `<ul class="flex-row items">${localItems}</ul>`
      : ''
  }
  ${detailsLocal?.() ? detailsLocal() : ''}
`

  return resutl
}

export default (list, folder) => {
  return list.map(item => {
    const filter_keys = [
      item.name,
      item.alt_name,
      item.regions,
      item.details?.flatMap(d => d.regions),
    ]
      .flat()
      .filter(Boolean)
      .join(' ')
      .replace(/-/g, ' ')
      .toLowerCase()

    return {
      filter_keys,
      template: createCard(item, folder),
    }
  })
}
