import reg from '../enums/regions.mjs'

const d = {
  triggersStart:
    '{{i}} Triggers at the start of the battle',
  stacks: n => `{{i}} Stacking up to ${n} times`,
  lastUntilEnd: '{{i}} Last until the end of the battle',
}

const listing = [
  {
    name: 'aggressive-lemon',
    svg: true,
    regions: [reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 5s:',
          ['Regenerates 5% of lost {{HP}}'],
        ],
      },
    ],
  },
  {
    name: 'gleam-candle',
    svg: true,
    regions: [reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 11s:',
          [
            'Deals 240% {{SKILL_DMG}} as {{AOE_DMG}} 5 times',
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'coconut-ball',
    regions: [reg.kr],
    svg: true,
    details: [
      {
        regions: [reg.global],
        list: [
          'At the start of the battle:',
          ['Boost {{ATK_SPD}} by 5%'],
          'Every 10% {{HP}} Lost:',
          ['Boost {{ATK_SPD}} by 2%'],
        ],
      },
    ],
  },
  {
    name: 'sheep-balloon',
    svg: true,
    regions: [reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 13s:',
          [
            'Deals 500% of current {{BASIC_ATK}} as {{AOE_DMG}}',
            'Imprison the target for 1s',
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'tomato-egg',
    svg: true,
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deal 325% of current {{BASIC_ATK}} as {{AOE_DMG}} every 12s and boost Basic ATK DMG by 30% for 5s.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'smart-assistant',
    svg: true,
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Increase Pal ATK SPD by 5% every 5s after battle starts, stacking up to 5 times.',
        ],
      },
    ],
  },
  {
    name: 'yoghurt-cocoa',
    svg: true,
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Each Pal Crit boost its Final Crit DMG by 2%, stacking up to 5 times.',
        ],
      },
    ],
  },
  {
    name: 'astronaut-teal',
    svg: true,
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals 450% Basic ATK AoE DMG every 16s and gains a shield equal to 10% of current HP for 6s.',
        ],
      },
    ],
  },
  {
    name: 'impulse-penguin',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Boost Counter DMG by 4% every 10s after battle starts, stacking up to 5 times.',
        ],
      },
    ],
  },
  {
    name: 'dense-cloud',
    svg: true,
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals 1400% AoE Skill DMG every 13s after battle starts and boost Energy Regen by 25% for 5s.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: '3-round-shooter',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals 75% extra AoE Combo DMG every 4 combos.',
        ],
      },
    ],
  },
  {
    name: 'honeypot-warrior',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals DMG equal to 2.5% Max HP every 5s after battle starts.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'pumpkin-witch',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every Skill Crit deals 600% extra AoE Skill DMG.',
        ],
      },
    ],
  },
  {
    name: 'bell-ring',
    svg: true,
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every Crit has a 20% chance to deal 60% extra Basic ATK Bleed DMG.',
          'Ignores DMG Immunity.',
        ],
      },
    ],
  },
  {
    name: 'sunshine-bringer',
    svg: true,
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals 560% of current Basic ATK DMG every 16s after battle starts and reduce the duration of control received by 15% for 5s.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'traveling-jellyfish',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          "Deals 612.5% of current Basic ATK AoE DMG every 15s after battle starts and reduces the target's ATK SPD by 20% for 5s.",
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'whirlwind-leaf',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals 220% extra AoE Skill DMG every 4 Basic Attacks.',
        ],
      },
    ],
  },
  {
    name: 'crispy-moth',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals 630% of current Basic ATK AoE DMG every 17s after battle starts and stuns the target for 1s.',
        ],
      },
    ],
  },
  {
    name: 'yoghurt-champ',
    regions: [reg.global, reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'Each Pal Crit Boosts its Final Crit DMG by 2%.',
          d.stacks(5),

          'Each Pal Combo Boosts its final Combo DMG by 2%',
          d.stacks(5),
        ],
      },
    ],
  },
  {
    name: 'maniac-love',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Fire Cupid's Arrows at random trgets every 5s",
          d.triggersStart,
          'If the target is oneself, reduce DEF by 30% and convert 3 time(s) of the reduced DEF into TK for 5s.',
          'If the target is an enemy, deals 165% of AoE Skill DMG, 70% of current AoE Combo DMG (can be Crit) and reduce their Final DMG RES by 10% for 5s',
        ],
      },
    ],
  },
  {
    name: 'dream-moment',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'Gain a shield that absorbs 6% of Max HP every 12s, lasting for 6s',
          'After a shield expires deal 320% of AoE Skill DMG, 120% of current AoE Combo DMG, and 120% of current AoE Counter DMG and boosts ATK SPD by 20% for 6s.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'chui',
    regions: [reg.kr],
    details: [
      {
        regions: [reg.kr],
        list: [
          'After starting the battle, recovers 5% and boosts DEF by 10%',
        ],
      },
    ],
  },
  {
    name: 'guilmon',
    regions: [reg.kr, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'At the start of the battle, deals 625% AoE Basic ATK DMG every 15s, boosting ATK by 10% for 5s.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'impmon',
    regions: [reg.kr, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'At the start of the battle, deals 625% AoE Basic ATK DMG every 15s, boosting ATK SPD by 15% for 5s.',
        ],
      },
    ],
  },
  {
    name: 'd-phantom-beast-demon-king',
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          'After the start of battle, enemy attack power -5% and damage reduction -5% every 15 seconds, lasts for 5 seconds.',
          'If the enemy is dazzled, launched, disarmed, restrained, frozen, or restrained when the skill is activated, the effect is doubled.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'ganiran',
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          "Each time a critical hit occurs, the target's critical hit resistance is reduced by 12%, which lasts until the end of the battle.",
          d.stacks(10),
        ],
      },
    ],
  },
  {
    name: 'kwajiro',
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          'At the start of battle, attack power increases by 8 for every 10,000 HP.',
        ],
      },
    ],
  },
  {
    name: 'owl',
    svg: true,
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          'Gain 40% skill damage. After the start of the battle, gain an additional 1% normal attack damage for every 1% skill damage you have.',
          d.lastUntilEnd,
        ],
      },
    ],
  },
  {
    name: 'night-rabbit',
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          "Every 8th normal attack deals an additional 75% multi-attack damage and reduces the target's energy regeneration rate by 15%, lasting for 2 seconds.",
        ],
      },
    ],
  },
  {
    name: 'moonlight-grass',
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          'After the start of battle, every 15 seconds, ally combo rate +40%, lasts for 3 seconds.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'ra',
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          'When the battle begins, immediately lose 50% HP and gain a barrier equal to 60% of your maximum HP (barrier value is not affected by PVP decay or barrier destruction effects), lasting for 20 seconds.',
          'After the barrier disappears, attack power is increased by 10%, lasting for 10 seconds.',
        ],
      },
    ],
  },
  {
    name: 'sharkler',
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          'Every 7 attacks (including normal attacks, combo attacks, counterattacks, and activation of special moves) deal an additional 60% of normal attack damage in area of effect (ignoring damage immunity)',
        ],
      },
    ],
  },
  {
    name: 'astronaut-pinky',
    svg: true,
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'Deals 675% Basic ATK AoE DMG every 16s and gains a shield equal to 10% of current HP for 6s.',
        ],
      },
    ],
  },

  {
    name: 'anubis',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Deals 765% Skill DMG, 305% of current Combo DMG, and 305% of current Counter DMG every 15s after the battle starts and reduces the target's ATK by 15% for 5s.",
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'midnight-firefly',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Deals 240% of current Basic ATK DMG every 16s after the battle starts and reduce the target's DMG RES by 15% for 5s.",
          'Deals 600% Skill DMG, 240% of current Combo DMG, and 240% current Counter DMG again after a short delay.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'moonbound-spirit',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Deals 300% Skill DMG, 120% current Combo DMG, and 120% current Counter DMG every 5s after the battle starts, with a 50% chance to deal extra DMG equal to 3% of the target's Max HP",
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'horus-sky-god',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          "Every 6s, deals 240% Skill DMG, 100% of current Combo DMG, 100% of current Counter, plus an amount equal to 2% of target's current HP.",
          "After every 3 casts, deals and additional 480% Skill DMG, 200% of current Combo DMG, and 200% of current Counter DMG and directly defeats the target if its HP is below 5%, after which dealing DMG equal 2% of the target's Max HP per second for 3s.",
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'magic-cat',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 15s, deals 765% Skill DMG, 305% of current Combo DMG, and 305% current Counter DMG and activates Feline MAgic 5 times within 2s, each time reducing the cooldown of a random Active Skill by 2s.',
          'This prioritizes skills in cooldown and can be used on the same skill rpeatedly.',
          '{{i}} Triggers 1s after the start of the battle.',
        ],
      },
    ],
  },
  {
    name: 'puppy-gaze',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 15s, deals 765 Skill DMG, 305% of current Combo DMG, and 305% of current Counter DMG and boosts Pal ATK SPD by 50% for 5s.',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'deity-of-purrs',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'For every 16 times healed (including HP regen, healing, active skill and healing effects of healing of passive skills, Lifesteal of Spectral Chant excluded), deals DMG equal to 4% of current HP to targets within range.',
        ],
      },
    ],
  },
  {
    name: 'michelle',
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'For every 50 instances of damage taken, enemies take an additional 200% AoE DMG, 80% of current Combo AoE DMG, 80% of current Counter AoE DMG, and 2% of current HP AoE DMG and become stunned for 0.5s.',
        ],
      },
    ],
  },

  {
    name: 'moonlight-elf',
    regions: [reg.cn],
    details: [
      {
        regions: [reg.cn],
        list: [
          "After the battle begins, the character's defense is increased by 60% and attack by 10% every 15 seconds for 5 seconds. During the duration, for every 10 normal attacks or combos the character receives, 3% of lost health is restored (released once immediately after the battle begins).",
        ],
      },
    ],
  },

  {
    name: 'chui-jinggeup',
    regions: [reg.kr],
    details: [
      {
        regions: [reg.global],
        list: [
          'After the battle starts, Recovers 5% and boost DEF by 10%, and for every 10% losts HP an additional 0.5% Recovery and boosts DEF by 1%.',
        ],
      },
    ],
  },
  {
    name: 'gallantmon',
    regions: [reg.kr, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'At the start of the battle, deals 765% Skill DMG, 305% Combo DMG, and 305% Counter DMG every 15 sec, boosting ATK by 15% for 5s',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'megidramon',
    regions: [reg.kr, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'Deals 500% Skill DMG, 200% Combo DMG, and 200% Counter DMG every 16s, inflicting target with 200% Skill DMG, 80% Combo DMG, and 80% Counter DMG per sec for 5s',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'beelzemon',
    regions: [reg.kr, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'Deals 765% Skill DMG, 305% Combo, 305% Counter DMG every 15s, boosting ATK SPD by 15% and CRIT DMG by 15% for 5s',
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'flash-owl',
    svg: true,
    regions: [reg.jp],
    details: [
      {
        regions: [reg.jp],
        list: [
          'Gain 40% skill damage and 20% skill critical damage.',
          'After the start of battle, gain an additional 1% normal attack damage for every 1% skill damage, and an additional 3% critical damage for every 1% skill critical damage.',
          d.lastUntilEnd,
        ],
      },
    ],
  },
  {
    name: 'astronaut-b-duck',
    svg: true,
    regions: [reg.global],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 16s Deals 800% Basic ATK AoE DMG, 320% of current Combo and 320% of current Counter DMG and gains a shield equal to 10% of current HP for 6s, during boosts ATK by 15%.',
        ],
      },
    ],
  },
]

export default listing
