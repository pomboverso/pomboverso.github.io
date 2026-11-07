import reg from '../enums/regions.mjs'

const d = {
  triggersStart:
    '{{i}} Triggers at the start of the battle',
  stacks: n => `{{i}} Stacking up to ${n} times`,
  lastUntilEnd: '{{i}} Last until the end of the battle',
}

const listing = [
  {
    name: 'artifact-blaster',
    regions: [reg.jp, reg.sea, reg.kr, reg.jp, reg.tw],
  },
  {
    name: 'aurora-sword',
    regions: [reg.cn, reg.tw],
    child: 'aurora-sword-perfect',
  },
  {
    name: 'beastroar-bow',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'blue-flame-amulet-sword',
    regions: [reg.jp, reg.sea, reg.jp],
    child: 'blue-flame-amulet-sword-perfect',
  },
  {
    name: 'candy-gatling',
    regions: [reg.global, reg.cn, reg.kr, reg.jp, reg.tw],
  },
  {
    name: 'castle-candelabrum',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'chaotic-warlords-hammer',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'countdown-blast',
    regions: [reg.global, reg.sea, reg.cn, reg.kr, reg.tw],
    child: 'countdown-blast-premium',
  },
  {
    name: 'cryoshield-flame',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
    child: 'cryoshield-flame-scarlet',
  },
  {
    name: 'dance-of-tides',
    regions: [reg.global, reg.sea, reg.cn, reg.kr, reg.tw],
    child: 'dance-of-tides-premium',
  },
  {
    name: 'dazzling-moment',
    details: [
      {
        regions: [reg.kr, reg.jp, reg.sea, reg.jp],
        list: [
          'Every 11 seconds, launch a massive firework.',
          'After 1.5 seconds, the first explosion deals 3000% area skill damage to enemies, plus 500% of current combo damage (can be crit), 500% of current counter damage (can be crit), and 5% of the target’s Max HP as damage. (The first explosion damage ignores damage nullification.) Also reduces the cooldown of all your active skills by 1.2 seconds.',
          'After 0.5 seconds, triggers a second explosion dealing 3000% area skill damage, plus 500% of current combo damage (can be crit) and 500% of current counter damage (can be crit).',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'demeters-sickle',
    regions: [reg.global, reg.sea, reg.kr, reg.jp],
  },
  {
    name: 'divine-champion',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
    child: 'divine-champion-premium',
    details: [
      {
        regions: [reg.global],
        list: [
          "ATK increases by 10% after the battle starts. Each basic attack hit has a 10% chance to deal an extra 50% of current Basic ATK DMG and apply 1 stack of Lightning. Active Skill deals an extra 150% of Skill DMG to up to 3 targets and applies 1 stack of Lightning. Each pal attack hit has a 10% chance to deal an extra 50% of current Pal DMG and apply 1 stack of Lightning. Each Lightning stack reduces DEF by 2%, stacking up to 7 times,and cannot be Cleansed. At 7 stacks, clear all stacks to summon lightning, dealing 1000% of AoE Skill DMG, 400% of current AoE Combo DMG, and 400% of current AoE Counter DMG (Lightning DMG can be Crit and ignores immunity) and reducing target's Skill DMG RES, Combo DMG RES, Counter DMG RES, Basic ATK DMG RES and Pal DMG RES by 4%, lasting until the battle ends, stacking up to 5 times.",
        ],
      },
    ],
  },
  {
    name: 'double-edged-string',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'dragon-breath-spray-gun',
    regions: [reg.cn, reg.kr, reg.tw],
  },
  {
    name: 'electric-shock-baton',
    regions: [reg.jp, reg.cn, reg.jp],
  },
  {
    name: 'eternal-flame',
    regions: [reg.global, reg.sea, reg.cn, reg.kr, reg.tw],
  },
  {
    name: 'extreme-caution',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'eye-of-raven',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'flaming-carnage',
    regions: [reg.global, reg.sea, reg.kr],
  },
  {
    name: 'frosbite-spear',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.cn,
      reg.jp,
      reg.tw,
    ],
  },
  { name: 'glaze-jade-fan', regions: [reg.sea, reg.cn] },
  {
    name: 'gungnir-and-blutgang',
    regions: [reg.jp, reg.sea, reg.kr, reg.jp, reg.tw],
  },
  {
    name: 'lanterns-scroll',
    regions: [reg.global, reg.sea, reg.cn, reg.kr, reg.tw],
    child: 'lanterns-scroll-premium',
  },
  {
    name: 'luminary-lantern',
    regions: [reg.sea, reg.cn, reg.tw],
  },
  {
    name: 'mayonnaise-bazooka',
    svg: true,
    regions: [reg.jp, reg.tw],
  },
  {
    name: 'moonlight-box',
    regions: [reg.tw, reg.cn, reg.tw],
  },
  {
    name: 'pixel-universe',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          "Every 14s, charges for 3s and blocks 40% damage, during which all attacks are banned except for counters. After the charge, releases the Charged Slash, dealing 5000% of AoE Skill DMG. 1000% of current AoE Basic ATK DMG (can be Crit), 1000% of current AoE Combo DMG (can be Crit), and 1000% of current AoE Counter DMG (can be Crit). The Charged Slash breaks targets' Shield and ignores Immunity. Every 1% HP lost increases the Charged Slash s damage by 1%.",
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'sanguine-love',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'sirens-whisper',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'skyward-blade',
    regions: [reg.global, reg.cn, reg.kr, reg.jp],
  },
  {
    name: 'sovereign-dragon',
    regions: [reg.global, reg.sea, reg.cn, reg.kr, reg.tw],
  },
  {
    name: 'space-time-magic-ring',
    regions: [reg.global, reg.kr, reg.sea, reg.cn, reg.kr],
    child: 'space-time-magic-ring-perfect',
    details: [
      {
        regions: [reg.global],
        list: [
          "After the battle starts, gain 10% extra ATK SPD, Energy Regen SPD, and Pal ATK SPD and reduce all enemies' ATK SPD, Energy Regen SPD, and Pal ATK SPD by 10%. When HP drops below 5% for the first time, recover HP over 1s to the value from 3s ago, ignoring all Death, DMG, and other effects. After HP recovery, reduce all active skills' cooldowns by 3s",
        ],
      },
    ],
  },
  {
    name: 'spring-chord',
    regions: [reg.global, reg.cn, reg.kr, reg.tw],
  },
  {
    name: 'staff-of-hermes',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          "Reduces all enemies' DMG RES by 8% at the start of battle. Crimson Bite triggers every 5s, making the next basic attack deal extra DMG equal to 1500% of AoE Skill DMG, 300% of current AoE Combo DMG, and 300% of current AoE Counter DMG, and regenerating HP equal to 50% of the DMG dealt. (DMG can be Crit and ignores Immunity. HP Regen ignores PvP healing reduction but cannot exceed 3% of Max HP each time.) Umbra Curse triggers every 2 active skills, dealing DMG equal to 3% of the target's Max HP and reducing their HP Regen, ATK SPD, Energy Regen, and Pal ATK SPD by 10% for 5s.",
        ],
      },
    ],
  },
  {
    name: 'sun-scorching-dart',
    regions: [reg.jp],
    child: 'sun-scorching-dart-complete',
  },
  {
    name: 'tear-attack',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'thousandfold-pagoda',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  {
    name: 'thunder-verdict',
    svg: true,
    regions: [reg.global, reg.kr, reg.cn, reg.sea, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          "After the battle starts, ATK SPD, Energy Regen SPD, and Pal ATK SPD increase by 10%. Basic attack, combo, and counter hits have a 8% chance and pal basic attack and combo hits have a 15% chance to deal extra DMG equal to 1% of the target's Max HP (ignores Immunity)",
        ],
      },
    ],
  },
  { name: 'ultimate-shield', regions: [reg.jp, reg.tw] },
  {
    name: 'unchained-staff',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'For every 25% Max HP lost, freezes all enemies and their pals for 2s (the effect ignores Control Immunity and Control Duration Reduction), during which they cannot use Basic ATK, Combo, Counter or skills, and their Energy Regen SPD (including Active Skills and Avian Active Skills) and Regen Attributes are reduced to 0. The skill triggers up to 3 times. When frozen targets take DMG equal to 25% of their HP at the start of the freeze, they and their pals and Avians will be unfrozen.',
        ],
      },
    ],
  },
  {
    name: 'under-the-dome',
    regions: [
      reg.global,
      reg.jp,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
    child: 'under-the-dome-perfection',
  },
  {
    name: 'universe-encyclopedia',
    details: [
      {
        regions: [reg.global],
        list: [
          "After the battle starts, activate Calm World and switch between Calm World and Chaos World every 15s. Calm World: All enemies' ATK is reduced by 16%; Chaos World: ATK increases by 16%, and deals 1500% of AoE Skill DMG, 300% of current Combo AoE DMG (can be Crit), 300% of current Counter AoE DMG (can be Crit), and DMG equal to 3% of the target's Max HP every 5s.",
        ],
      },
    ],
  },
  {
    name: 'webbed-chainsaw',
    regions: [
      reg.global,
      reg.sea,
      reg.cn,
      reg.kr,
      reg.jp,
      reg.tw,
    ],
  },
  { name: 'zeros-spear', regions: [reg.jp, reg.tw] },
]

export default listing
