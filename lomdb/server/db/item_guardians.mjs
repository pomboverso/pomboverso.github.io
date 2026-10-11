import reg from '../enums/regions.mjs'

const d = {
  triggersStart:
    '{{i}} Triggers at the start of the battle',
  stacks: n => `{{i}} Stacking up to ${n} times`,
  lastUntilEnd: '{{i}} Last until the end of the battle',
}

const listing = [
  {
    name: 'exorcism-rabbit',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+6% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+160% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+2% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'deer-spirit',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+8% {{FINAL_DMG_RES}}',
            '+12% {{PAL_ATK_SPD}}',
            'When attacking non guardian units',
            ['+60% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+2% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'fighting-dog',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+12% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+50% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+2% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'magic-cat',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+8% {{FINAL_DMG_RES}}',
            '+6% {{ENERGY_REGEN_SPD}}',
            'When attacking non guardian units',
            ['+90% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+2% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  //----------------------
  {
    name: 'commander',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+16% {{FINAL_DMG_RES}}',
            '+18% {{PAL_ATK_SPD}}',
            'When attacking non guardian units',
            ['+110% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+4% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'bullfighter',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+24% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+100% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+4% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'destiny-hunter',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+12% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+290% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+4% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'leader-of-oh',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+16% {{FINAL_DMG_RES}}',
            '+10% {{ENERGY_REGEN_SPD}}',
            'When attacking non guardian units',
            ['+160% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+4% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'wilderness-shooter',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+18% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+450% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+6% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'witch-doctor',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+24% {{FINAL_DMG_RES}}',
            '+18% {{ENERGY_REGEN_SPD}}',
            'When attacking non guardian units',
            ['+250% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+6% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  //----------------------------

  {
    name: 'beast-king',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+24% {{FINAL_DMG_RES}}',
            '+30% {{PAL_ATK_SPD}}',
            'When attacking non guardian units',
            ['+170% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+6% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },

  {
    name: 'combat-expert',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+36% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+150% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+6% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },

  {
    name: 'crazy-thief',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+32% {{FINAL_DMG_RES}}',
            '+20% {{EVASION}}',
            '+20% {{ENERGY_REGEN_SPD}}',
            'When attacking non guardian units',
            ['+400% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+8% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },

  {
    name: 'ghost-predator',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+32% {{FINAL_DMG_RES}}',
            'Every 5 {{BASIC_ATK}} hit by the character and Every 5 {{PAL_ATK}}',
            [
              'Extra +1.2% {{DMG}} of {{MAX_HP}}',
              '{{i}} Ignores {{DMG_IMMUNITY}} and counts separately for each pal.',
            ],
            'When attacking non guardian units',
            ['+280% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+8% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'hidden-hunter',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+24% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            [
              '+720% {{MIX_DMG}}',
              '-30% {{RECOVERY_EFFECTS}} on the targets for 3s',
            ],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+8% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },

  {
    name: 'machine-master',
    regions: [reg.kr, reg.cn, reg.sea],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When the guardian is present',
          [
            '+48% {{FINAL_DMG_RES}}',
            '+30% {{ALL_SHIELD_EFFECTS}}',
            'When attacking non guardian units',
            ['+240% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+8% Character's {{FINAL_DMG_BONUS}}",
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  //-------------------------------------
  {
    name: 'flame-spirit',

    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+30% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            [
              '+1130% {{MIX_DMG}}',
              "+1% target's {{HP}} as {{DMG}} per second (ignores {{DMG_IMMUNITY}}) for 4s",
              d.stacks(5),
            ],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'tide-spirit',

    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+40% {{FINAL_DMG_RES}}',
            "-25% Enemies' {{CRIT_RATE}}",
            "-25% Enemies' {{SKILL_CRIT_RATE}}",
            'When attacking non guardian units',
            ['+440% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              '+3% {{ATK}} (lasts until end of battle)',
              d.stacks(8),
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'rock-spirit',

    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+60% {{FINAL_DMG_RES}}',
            '+20% {{DEF}}',
            'When attacking non guardian units',
            ['+400% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "+10% Shield based on Character's {{MAX_HP}}",
              'When the shield expires',
              [
                '+400% {{DEF}} as {{DMG}} to all enemies (ignores {{DMG_IMMUNITY}})',
              ],
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'wind-spirit',

    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+40% {{FINAL_DMG_RES}}',
            '+20% {{EVASION}}',
            '+20% {{ATK_SPD}}',
            '+20% {{PAL_ATK_SPD}}',
            '+20% {{SKILL_REGEN_SPD}}',
            'When attacking non guardian units',
            ['+630% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },

  //-------------------------------------
  {
    name: 'goddess-of-wisdom',
    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+48% {{FINAL_DMG_RES}}',
            "-15% Enemies' {{ATK}}",
            "-15% Enemies' {{DEF}}",
            "-15% Enemies' {{ENERGY_REGEN_SPD}}",
            "-15% Enemies' {{ATK_SPD}}",
            "-15% Enemies' {{PAL_ATK_SPD}}",
            'When attacking non guardian units',
            ['+640% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'hercules',
    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+72% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+540% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            ['+6% {{ATK}}', d.stacks(8)],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'lord-of-thunder',
    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+36% {{FINAL_DMG_RES}}',
            'When attacking non guardian units',
            ['+1630% {{MIX_DMG}}'],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Each summon',
            [
              "-150% Enemy Guardians' {{THOUGHNESS}}",
              '+2445% {{MIX_DMG}}',
            ],
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
        ],
      },
    ],
  },
  {
    name: 'valkyrie',
    details: [
      {
        regions: [reg.no_region],
        list: [
          'When the guardian is present',
          [
            '+48% {{FINAL_DMG_RES}}',
            '+30% {{ATK}}',
            '+30% {{DEF}}',
            'When attacking non guardian units',
            [
              '+910% {{MIX_DMG}}',
              "-40% Target's {{DEF}} for 4s",
            ],
          ],
          'Passive',
          [
            'Summon a Guardian 2s after battle starts, with resummons every 15s.',
            'Every Second',
            ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          ],
          // 'Passive',
          // [
          //   'Summon a Guardian 2s after battle starts, with resummons every 15s.',
          //   'Each summon',
          //   [
          //     "+8% Character's {{FINAL_DMG_BONUS}}",
          //     d.stacks(8),
          //   ],
          //   'Every Second',
          //   ["-10% Guardian's {{MAX_THOUGHNESS}}"],
          // ],
        ],
      },
    ],
  },
]

export default listing
