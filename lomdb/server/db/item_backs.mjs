import reg from '../enums/regions.mjs'

const d = {
  triggersStart:
    '{{i}} Triggers at the start of the battle',
  stacks: n => `{{i}} Stacking up to ${n} times`,
  lastUntilEnd: '{{i}} Last until the end of the battle',
}

const listing = [
  { name: 'raccoon-tail', regions: [reg.global] },
  { name: 'wolf-tail', regions: [reg.global] },
  { name: 'fox-tail', regions: [reg.global] },
  { name: '19th-century', regions: [reg.global] },
  { name: 'alien-dimension', regions: [reg.global] },
  { name: 'arackar-lock', regions: [reg.global] },
  { name: 'ascending-dragon', regions: [reg.cn] },
  { name: 'beastbone-breeze', regions: [reg.global] },
  {
    name: 'republic-of-heroes',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'After the battle starts, every 10% Max HP lost grants a shield equal to 6% Max HP that lasts 3s, triggering up to 15 times. Every 10 basic attack(s) restores HP equal to 400% DEF.',
        ],
      },
    ],
  },
  {
    name: 'beelzebumon-blast-mode-wings',
    regions: [reg.kr],
  },
  {
    name: 'bit-gateway',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'Increases DEF by 16% after the battle starts.',
          'After 15s into battle or HP first drops below 70%, increases ATK by 10%. After 30s into battle or HP first drops below 30%, increases DMG RES by 10% and restores 10% of lost HP per second for 10s.',
        ],
      },
    ],
  },
  { name: 'blade-pursuit', regions: [reg.global] },
  {
    name: 'celestial-surprises',
    svg: true,
    regions: [reg.global],
  },
  { name: 'chrono-prism', regions: [reg.global] },
  { name: 'cosmic-rescue', regions: [reg.global] },
  {
    name: 'dawn-of-dawn',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'After the battle starts, gain 12% extra Evasion and Movement SPD that lasts till the battle ends. Reduce the duration of all enemies Class Skills by 20% for 60s.',
        ],
      },
    ],
  },
  { name: 'dingchun', regions: [reg.jp, reg.tw] },
  { name: 'dukemon-crimson-mode-wings', regions: [reg.kr] },
  { name: 'emerald-embrace', regions: [reg.global] },
  { name: 'fallen-angel', regions: [reg.global] },
  {
    name: 'firework-invitation',
    details: [
      {
        regions: [reg.kr, reg.jp],
        list: [
          'Every 11 seconds, fires 7 small fireworks consecutively over 3 seconds. Each small firework deals 250% area skill damage to all enemies, plus 50% of current combo damage (can be crit) and 50% of current counter damage (can be crit).',
          'After 3 seconds, deals an additional 30% of the total damage taken by all enemies during this 3‑second period (including damage absorbed by barriers and blocked damage, but excluding nullified damage). This additional damage ignores damage nullification.',
          d.triggersStart,
        ],
      },
    ],
  },
  { name: 'frostland-specter', regions: [reg.global] },
  { name: 'ghost-behind', regions: [reg.global] },
  { name: 'glory-glow', regions: [reg.global] },
  { name: 'great-sage-arrives', regions: [reg.cn] },
  { name: 'ingredients-for-dinner', regions: [reg.global] },
  {
    name: 'iridescent-aura',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'Gain 10% Skill Crit Rate. After every 4s, the next Skill Crit hit reduces all active skill cooldowns by 1s and increases Final Skill Crit DMG by 4% until the battle ends, stacking up to 5 times.',
        ],
      },
    ],
  },
  { name: 'koukis-breakthrough', regions: [reg.jp] },
  {
    name: 'lord-of-light',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Reduce enemy's Crit RES by 10% after the battle starts. When Character HP first drops below 50%, trigger Avenging Light, increasing Character Crit Rate, Skill Crit Rate, and Pal Crit Rate by 6% and Final Crit DMG, Final Skill Crit DMG, and Final Pal Crit DMG by 8% for 20s.",
        ],
      },
    ],
  },
  { name: 'lustrous-plumage', regions: [reg.global] },
  { name: 'metamorphosis', regions: [reg.global] },
  { name: 'miracle-mirage', regions: [reg.global] },
  {
    name: 'mirror-world',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Reduces all enemies' Energy Regen SPD, HP Regen, ATK SPD and Pal ATK SPD by 10% after the battle starts. Allied pals have a 50% chance to become demonized, gaining 30% Pal ATK SPD and dealing extra damage equal to 1% of enemies' Current HP every 10 basic attacks.",
        ],
      },
    ],
  },
  { name: 'moonlit-wisp', regions: [reg.global] },
  { name: 'pepe-style-thruster', regions: [reg.global] },
  { name: 'phoenix-frost', regions: [reg.global] },
  { name: 'rushing-above-the-clouds', regions: [reg.kr] },
  { name: 'shell-shade', regions: [reg.global] },
  { name: 'six-wings-lingtian', regions: [reg.cn] },
  { name: 'sound-of-gunfire', regions: [reg.kr] },
  { name: 'summer-parasol', regions: [reg.global] },
  { name: 'till-death-apart', regions: [reg.global] },
  {
    name: 'titans-hold',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Every 10 basic attack hits trigger a Combo Punch, dealing 1000% AoE Skill DMG and 200% current Combo AOE DMG (can be Crit) and reducing target's ATK by 4% for 5s, stacking up to 5 times. Every 30 basic attack or combo hits taken trigger a Counter Punch, dealing 1000% AoE Skill DMG and 200% current Counter AoE DMG (can be Crit) and gaining a shield equal to 3.2% Max HP for 2s.",
        ],
      },
    ],
  },
  { name: 'tobimas-sky', regions: [reg.jp, reg.cn] },
  { name: 'trapped-wrath', regions: [reg.global] },
  { name: 'virtual-connection', regions: [reg.global] },
]

export default listing
