import reg from '../enums/regions.mjs'
import item from './item_mounts_rewards.mjs'

const d = {
  triggersStart:
    '{{i}} Triggers at the start of the battle',
  stacks: n => `{{i}} Stacking up to ${n} times`,
  lastUntilEnd: '{{i}} Last until the end of the battle',
}

const noDetails = (...args) => [
  {
    regions: args,
    list: ['No Advance Effects'],
  },
]

export default [
  {
    name: 'guardian-spaceship',
    regions: [reg.global, reg.kr],
    items: [
      item.gold,
      item.magic_lamp,
      item.ore,
      item.remodeling_guide,
      item.chrono_key,
      item.divine_hammer,
      item.divine_feather_coin,
      item.feather_coin,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'Gain a shield equal to 6% Max HP every 9s for 6s. 6s later, reflects 20% of the total DMG received within the 6s to all enemies. (Only DMG absorbed and blocked by the shield can be reflected, not DMG ignored by Immunity.)',
        ],
      },
    ],
  },
  {
    name: 'dingchun',
    regions: [reg.jp, reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.uku_fruit,
      item.mimir_spring,
      item.gem_of_love,
      item.divine_feather_coin,
      item.feather_coin,
    ],
  },
  // flowers/leaf/trees/flora/fruits
  {
    name: 'lotus-leaf',
    svg: true,
    alt_name: 'Lily Pad',
    items: [
      item.pickaxe,
      item.gold,
      item.speedup_coupon,
      item.magic_lamp,
      item.magic_lamp_key,
      item.divine_hammer,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'lotus-throne',
    svg: true,
    items: [
      item.speedup_coupon,
      item.ore,
      item.magic_lamp,
      item.dungeon_key,
      item.fruit_offerings,
      item.soul_crystal,
      item.divine_hammer,
      item.awakening_scroll,
    ],
    details: noDetails(
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'rainbow-melon-mariner',
    alt_name: 'Vibrant Watermelon Ship',
    regions: [reg.global, reg.sea, reg.jp, reg.cn, reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.uku_fruit,
      item.clock_winder,
      item.gem_of_love,
      item.awakening_scroll,
      item.runestone_essence,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 11s',
          [
            'Boosts {{ATK}} by 10% for 5s',
            'Boosts {{DEF}} by 30% for 5s',
            'After this, unleash a wave that:',
            [
              '{{KNOCKUP}} enemies for 0.5s',
              'Dealing 2000% {{SKILL_DMG}} as {{AOE_DMG}}',
              'Dealing 800% {{COMBO_DMG}} as {{AOE_DMG}}',
              'Dealing 800% {{COUNTER_DMG}} as {{AOE_DMG}}',
              d.triggersStart,
            ],
          ],
        ],
      },
    ],
  },
  {
    name: 'pumpkin-carriage',
    regions: [reg.global, reg.jp, reg.cn, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_essence,
      item.soul_crystal,
      item.fruit_offerings,
      item.divine_hammer,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.cn],
        list: [
          'Every 11s:',
          [
            'Deals 2000% {{SKILL_DMG}} as {{AOE_DMG}}',
            'Deals 800% current {{COMBO_DMG}} as {{AOE_DMG}}',
            'Deals 800% current {{COUNTER_DMG}} as {{AOE_DMG}}',
          ],
          'Every second:',
          [
            'The target received {{DMG}} equal to 2% of current {{HP}}',
            'The target reduces {{ATK}} by 10% for 5s',
            'The target reduces {{DMG_RES}} by 10% for 5s',
            d.triggersStart,
          ],
        ],
      },
    ],
  },

  // clouds/celestial/stars
  {
    name: 'cloud-drifter',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw,
    ],
    items: [
      item.gold,
      item.magic_lamp,
      item.purple_soul,
      item.skill_coupon,
      item.soul_essence,
      item.dungeon_key,
      item.soul_crystal,
      item.orange_skill,
      item.red_skill,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [
          reg.global,
          reg.sea,
          reg.kr,
          reg.jp,
          reg.tw,
        ],
        list: [
          'Increase {{SKILL_CRIT_RATE}} by 10%',
          'After a {{SKILL_CRIT}}:',
          ['Bost {{ATK}} by 20% for 5s'],
        ],
      },
      {
        regions: [reg.cn],
        list: [
          'Increase {{SKILL_CRIT_RATE}} by 10%',
          'After a {{SKILL_CRIT}}:',
          ['Bost {{ATK}} by 30% for 5s'],
        ],
      },
    ],
  },
  {
    name: 'rainbow-cloud',
    regions: [reg.cn, reg.sea, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.remodeling_guide,
      item.uku_fruit,
      item.mimir_spring,
      item.feather_coin,
      item.gem_of_love,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.sea, reg.cn],
        list: [
          'When HP first drops below 90%:',
          [
            'Gains 3% {{ATK}}',
            'Gains 3% {{DMG_RES}}',
            d.lastUntilEnd,
          ],
          'When {{HP}} drops below 80% for the first time:',
          [
            'Gains 3% {{ATK}}',
            'Gains 3% {{DMG_RES}}',
            d.lastUntilEnd,
          ],
          'When {{HP}} drops below 70% for the first time:',
          [
            'Gains 3% {{ATK}}',
            'Gains 3% {{DMG_RES}}',
            d.lastUntilEnd,
          ],
          'At max stacks:',
          [
            'Gain an additional 15% {{CRIT_DMG}}',
            'Gain an additional 15% {{SKILL_CRIT_DMG}}',
            'Gain an additional 15% {{PAL_CRIT_DMG}}',
            d.lastUntilEnd,
          ],
        ],
      },
    ],
  },
  {
    name: 'draco-ascension',
    svg: true,
    alt_name: 'Soaring Wings',
    items: [
      item.magic_lamp,
      item.soul_essence,
      item.uku_fruit,
      item.mimir_spring,
      item.gem_of_love,
      item.feather_coin,
      item.divine_feather_coin,
      item.empowerment_gear,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'silvery-crescent',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw,
    ],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.purple_soul,
      item.soul_essence,
      item.soul_crystal,
      item.orange_soul,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'Upon taking lethal {{DMG}} the first time:',
          [
            'Gain death immunity for 2s',
            '{{i}} Recover 10% {{MAX_HP}} after the immunity is over',
          ],
        ],
      },
      {
        regions: [reg.sea],
        list: [
          'Upon taking lethal DMG the first time:',
          '{{i}} Recover 10% {{MAX_HP}} after the immunity is over',
          ['Gain death immunity for 3s'],
        ],
      },
    ],
  },
  {
    name: 'azure-feather',
    svg: true,
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.remodeling_guide,
      item.skill_coupon,
      item.pal_coupon,
      item.soul_essence,
      item.soul_crystal,
      item.divine_hammer,
      item.awakening_scroll,
      item.empowerment_gear,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'eternal-unicorn',
    alt_name: 'Dazzling Unicorn',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw,
    ],
    items: [
      item.gold,
      item.magic_lamp,
      item.uku_fruit,
      item.mimir_spring,
      item.gem_of_love,
      item.feather_coin,
      item.divine_feather_coin,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 12s:',
          [
            'Resist {{DMG}} of the next {{ACTIVE_SKILL}} hit on the Character (excluding Class, Avian, and Sumonning Skills)',
            'Boosts {{DEF}} by 50%',
            'Ignores all {{CTR}}',
          ],
          'After the unicorns resist {{DMG}}, the {{DEF}} boosts and {{CTR}} immunity disappear',
          'Meanwhile, the Character reflects the {{ACTIVE_SKILL}} to the attacker:',
          [
            'Boosts {{ATK}} by 4%',
            'Boosts {{DMG_RES}} by 4%',
            d.stacks(3),
            d.triggersStart,
            d.lastUntilEnd,
          ],
        ],
      },
    ],
  },
  {
    name: 'scorpio',
    regions: [reg.global, reg.kr, reg.sea, reg.cn],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.runestone_essence,
      item.pact_coin,
      item.pact_coupon,
      item.gem_of_love,
      item.divine_hammer,
      item.runestone_block_potion,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 15s:',
          [
            'Inflicts 1 stack of Poison on enemies near by',
            "Each stack deal bleed {{DMG}} equal to 0.8% of the target's current {{HP}} per second",
            '{{i}} Ignores immunity',
            d.stacks(10),
            d.triggersStart,
          ],
        ],
      },
    ],
  },

  // animals
  {
    name: 'panda-charge',
    alt_name: 'Panda Attack',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw,
    ],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.uku_fruit,
      item.clock_winder,
      item.gem_of_love,
      item.awakening_scroll,
      item.runestone_essence,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 10s:',
          [
            'Ignores {{CTR}} for 3-5s',
            'Boosts {{ATK}} by 5%-12% for 10s',
            'Boosts {{DMG_RES}} by 5%-12% for 10s',
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'round-frog',
    regions: [reg.kr, reg.jp, reg.cn, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.high_yield_fertilizer,
      item.advance_seed,
      item.skill_coupon,
      item.dungeon_key,
      item.premium_seed,
      item.fruit_offerings,
      item.orange_skill,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 10s:',
          [
            'Defeat 1 enemy',
            'Boosts {{ATK}} by 15% for 5s',
            '{{i}} {{STUNS}} Boss or PVP enemy for 1 additional second',
          ],
        ],
      },
    ],
  },
  {
    name: 'rum-barrel',
    regions: [reg.kr, reg.cn, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.uku_fruit,
      item.fruit_offerings,
      item.divine_hammer,
      item.mimir_spring,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'For every 20% {{MAX_HP}} missing:',
          [
            'Deal 800% {{BASIC_ATK}} as {{AOE_DMG}} within a range',
            'Boosts {{ATK}} by 10% for 5s',
            'Boosts {{DMG_RES}} by 10% for 5s',
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'long-legged-bird',
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_crystal,
      item.fruit_offerings,
      item.feather_coin,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.kr],
        list: [
          'Every 4s, aftet the battle starts there is a 50% chance to:',
          [
            'Boosts {{ATK}} by 4%',
            'Boosts {{DMG_RES}} by 4%',
            'Boosts {{CTR_TIME_RED}} by 10%',
            d.lastUntilEnd,
            d.stacks(3),
            '{{i}} The chances of the 3 effects are independently calculated',
          ],
          'There is a 100% chance to grant the Summon:',
          [
            '4% {{ATK}}',
            '4% {{DMG_RES}}',
            '10% {{CTR_TIME_RED}}',
            '{{i}} Last until the summon dissapears',
            d.stacks(3),
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'purple-wing',
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.chrono_key,
      item.clock_winder,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [
          reg.global,
          reg.sea,
          reg.kr,
          reg.cn,
          reg.jp,
          reg.tw,
        ],
        list: [
          'Every 11s:',
          [
            'Deals 5000% {{AOE_DMG}}',
            '{{KNOCKUP}} targets within the range for 0.5s',
            d.triggersStart,
          ],
        ],
      },
    ],
  },

  // dragons/dinosaurs/phoenix
  {
    name: 'blue-queen',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.purple_soul,
      item.skill_coupon,
      item.soul_essence,
      item.soul_crystal,
      item.orange_skill,
      item.orange_soul,
      item.red_skill,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          'When dealing {{DMG}}:',
          [
            'Distribute 10% of {{DMG}} dealt to up to 5 surrounding enemies',
          ],
        ],
      },
    ],
  },
  {
    name: 'emperor-dragon-of-life',
    regions: [reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.uku_fruit,
      item.clock_winder,
      item.gem_of_love,
      item.divine_hammer,
      item.mimir_spring,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.cn],
        list: [
          'Every 4s:',
          [
            '1. Randomly boosts {{CTR_TIME_RED}} by 12%~30%',
            '2. Randomly boosts {{DEF}} by 8%~20%',
            '3. Randomly boosts {{ATK_SPD}} by 12%~30%',
            '4. Randomly boosts {{DMG_RES}} by 5%~12%',
            '5. Randomly boosts {{ATK}} by 5%~12%',
            '{{i}} Effects will be obtained in sequence',
            '{{i}} Each Effect can only be obtained once',
          ],
        ],
      },
    ],
  },
  {
    name: 'blazing-roar',
    alt_name: 'Skyward Blaze',
    regions: [reg.jp, reg.cn, reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.purple_soul,
      item.orange_soul,
      item.clock_winder,
      item.divine_hammer,
      item.feather_coin,
      item.divine_feather_coin,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.kr],
        list: [
          'Every 10s:',
          [
            'Deals 600% current {{BASIC_ATK}} to an Area',
            'Burns the targets:',
            [
              'Deals 40% current {{BASIC_ATK}} per second',
              d.lastUntilEnd,
              d.stacks(3),
            ],
          ],
          'Until the battle ends:',
          [
            'Boosts {{ATK}} by 4%',
            'Boosts {{DEF}} by 4%',
            'Boosts {{DMG_RES}} by 4%',
            d.stacks(3),
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'divine-seraphigon',
    alt_name: 'Holy Dragon',
    regions: [reg.kr, reg.jp, reg.cn, reg.tw],
    items: [
      item.gold,
      item.speedup_coupon,
      item.magic_lamp,
      item.soul_essence,
      item.fruit_offerings,
      item.soul_crystal,
      item.divine_hammer,
      item.gem_of_love,
      item.runestone_essence,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 11s:',
          [
            'Gain 3 stacks of guard',
            'Each stack boosts {{DEF}} by 100%',
          ],
          'Every second:',
          ['Lose 1 stack'],
          'At the end of the guard:',
          [
            'Deal 2000% {{SKILL_DMG}}',
            'Deal 800% current {{COMBO_DMG}}',
            'Deal 800% current {{COUNTER_DMG}}',
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'twin-phoenix-glaives',
    svg: true,
    alt_name: 'Cyan Phoenixes',
    items: [
      item.gold,
      item.magic_lamp,
      item.feather_coin,
      item.mimir_spring,
      item.awakening_scroll,
      item.gem_of_love,
      item.divine_hammer,
      item.divine_feather_coin,
    ],
    details: noDetails(reg.global, reg.kr, reg.sea, reg.cn),
  },
  {
    name: 'dragon-of-plenty',
    regions: [reg.cn],
    items: [
      item.magic_lamp,
      item.speedup_coupon,
      item.advance_seed,
      item.fruit_offerings,
      item.remodeling_guide,
      item.clock_winder,
      item.gem_of_love,
      item.divine_hammer,
    ],
    details: [
      {
        regions: [reg.sea, reg.kr],
        list: [
          'Every 8s:',
          [
            'Restores 12% of lost {{HP}}',
            'Boosts {{ATK}} by 10%',
            'When {{HP}} is above 60%:',
            [
              'Boosts {{ATK_SPD}} by 10%',
              'Boosts {{PAL_ATK_SPD}} by 10%',
              'Boosts {{ENERGY_REGEN_SPD}} by 10%',
            ],
            'When HP is below 60%:',
            [
              'Restore 6% of {{MAX_HP}}',
              'Boosts {{DMG_RES}} by 8%',
              'Boosts {{CTR_TIME_RED}} by 30%',
            ],
            '{{i}} All effects last 8s',
            d.triggersStart,
          ],
        ],
      },
    ],
  },

  //tigers/wolfs
  {
    name: 'blue-ox',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.high_yield_fertilizer,
      item.advance_seed,
      item.pal_coupon,
      item.magic_lamp_key,
      item.diamond_key,
      item.premium_seed,
      item.fruit_offerings,
      item.orange_pal,
      item.red_pal,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          'Boosts {{DMG_RES}} by 10%',
          'Boosts {{CTR_TIME_RED}} by 30%',
        ],
      },
    ],
  },
  {
    name: 'white-tiger',
    regions: [reg.jp, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.skill_coupon,
      item.dungeon_key,
      item.orange_skill,
      item.red_skill,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn, reg.kr],
        list: [
          'Targets with {{HP}} percentage below your own:',
          ['Reduces their {{DMG_RES}} by 15%'],
          'Targets with {{HP}} percentage above your own:',
          ['Reduces their {{ATK}} by 10%'],
        ],
      },
    ],
  },
  {
    name: 'sangun',
    items: [
      item.gold,
      item.magic_lamp,
      item.uku_fruit,
      item.clock_winder,
      item.gem_of_love,
      item.divine_hammer,
      item.mimir_spring,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.kr],
        list: [
          'At the start of the battle:',
          [
            'Boosts {{DMG_RES}} by 40%',
            'Boosts {{DEF}} by 150%',
            '{{i}} Unable to {{BASIC_ATK}}, {{COUNTER}}, {{COMBO}} or launch {{ACTIVE_SKILL}}',
          ],
          'After 6s or when {{HP}} drops below 60% for the first time:',
          [
            'Can attack again',
            'Loses the {{DMG_RES}} and {{DEF}} bonus',
            'Deals {{SKILL_DMG}} 4000% to {{AREA_ENEMIES}}',
            'Deals {{COMBO_DMG}} 1600%',
            'Deals {{COUNTER_DMG}} 1600%',
            'Deals damage equal to 8% of {{MAX_HP}}',
            'Boosts {{DMG_RES}} by 10%',
            'Boosts {{ATK}} by 10%',
            'Reduces {{CTR_TIME}} by 20%',
          ],
        ],
      },
    ],
  },
  {
    name: 'bulham',
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.purple_soul,
      item.soul_essence,
      item.soul_crystal,
      item.orange_soul,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.kr],
        list: [
          'Every {{BASIC_ATK}} there is a 10% chance to:',
          [
            'Deal 1000% {{SKILL_DMG}}',
            'Deal 400% {{COMBO_DMG}}',
            'Deal 400% {{COUNTER_DMG}}',
            'Boosts {{DMG_RES}} by 10% for 2s',
          ],
        ],
      },
    ],
  },
  {
    name: 'cheetah-unit-00',
    alt_name: 'Cheetah Zero',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw,
    ],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.purple_soul,
      item.orange_soul,
      item.clock_winder,
      item.divine_hammer,
      item.feather_coin,
      item.divine_feather_coin,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'After taking lethal damage:',
          [
            'Gain Death Immunity for 3s ',
            "Ignore new {{CTR}} (doesn't affect existing control)",
            'Gain 10% {{ATK}}',

            'Gain 10% {{CRIT_RATE}}',
            'Gain 10% Final {{CRIT_DMG}}',

            'Gain 10% {{SKILL_CRIT_RATE}}',
            'Gain 10% Final {{SKILL_CRIT_DMG}}',

            'Gain 10% {{PAL_CRIT_RATE}}',
            'Gain 10% Final {{PAL_CRIT_DMG}}',

            'The next basic attack:',
            [
              'Deals 3000% {{SKILL_DMG}}',
              'Deals 1200% Current {{COMBO_DMG}} (can be Crit)',
              'Deals 1200% Current {{COUNTER_DMG}} (can be Crit)',
              'Deals {{DMG}} equal to 8% of your {{MAX_HP}} to {{AREA_ENEMIES}}.',
            ],
            '{{i}} The character explodes at the end of the duration',
          ],
        ],
      },
      {
        regions: [reg.sea],
        list: [
          'After taking lethal damage:',
          [
            'Gain Death Immunity for 4s ',
            "Ignore new {{CTR}} (doesn't affect existing control)",
            'Gain 10% {{ATK}}',

            'Gain 20% {{CRIT_RATE}}',
            'Gain 15% Final {{CRIT_DMG}}',

            'Gain 20% {{SKILL_CRIT_RATE}}',
            'Gain 15% Final {{SKILL_CRIT_DMG}}',

            'Gain 20% {{PAL_CRIT_RATE}}',
            'Gain 15% Final {{PAL_CRIT_DMG}}',

            'The next basic attack:',
            [
              'Deals 3000% {{SKILL_DMG}}',
              'Deals 1200% Current {{COMBO_DMG}} (can be Crit)',
              'Deals 1200% Current {{COUNTER_DMG}} (can be Crit)',
              'Deals {{DMG}} equal to 8% of your {{MAX_HP}} to {{AREA_ENEMIES}}.',
            ],
            '{{i}} The character explodes at the end of the duration',
          ],
        ],
      },
    ],
  },
  {
    name: 'cinder-wolf',
    regions: [reg.kr, reg.jp, reg.global],
    items: [
      item.empowerment_gear,
      item.divine_hammer,
      item.soul_crystal,
      item.clock_winder,
      item.remodeling_guide,
      item.runestone_essence,
      item.magic_lamp,
      item.gold,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'After the battle starts',
          [
            'Boosts {{ATK}} by 10%',
            'Boosts Final {{CRIT_RES}} by 16%',
          ],
          'When {{HP}} drops below 39% the first time:',
          [
            'Cleanses debuffs',
            'Becomes immune to damage for 1s',
            'Converts {{HP}} into 10% {{MAX_HP}}',
            'Gains a shield equal to 45% of {{MAX_HP}} (Ignores PvP reduction and shield breaks)',
          ],
          "For the shield's duration:",
          [
            'Reduces {{HP}} Regen by 100%',
            'Ignores {{CTR}}',
            'Boosts {{DMG_RES}} by 10%',

            "The character's {{BASIC_ATK}}:",
            [
              'deals 250% extra {{SKILL_DMG}}',
              'deals 50% extra {{COMBO_DMG}} (can be Crit)',
              'deals 50% extra {{COUNTER_DMG}} (can be Crit)',
            ],

            '{{PAL_BASIC_ATK}}:',
            ['deals 50% extra {{PAL_DMG}} (can be Crit)'],
          ],
        ],
      },
    ],
  },

  // boats/submarines/water
  {
    name: 'quack-splash',
    svg: true,
    items: [
      item.gold,
      item.magic_lamp,
      item.skill_coupon,
      item.pal_coupon,
      item.diamond_key,
      item.red_skill,
      item.red_pal,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'flyboard',
    svg: true,
    items: [
      item.gold,
      item.relic_shard,
      item.magic_lamp,
      item.skill_coupon,
      item.pal_coupon,
      item.guardian_key,
      item.divine_hammer,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'surfboard',
    svg: true,
    items: [
      item.pickaxe,
      item.basic_seed,
      item.common_fertilizer,
      item.ore,
      item.advance_seed,
      item.high_yield_fertilizer,
      item.drill,
      item.bomb,
      item.premium_seed,
      item.fruit_offerings,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'ride-the-waves',
    alt_name: 'Storm Rider',
    regions: [reg.global, reg.kr, reg.sea, reg.cn, reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.uku_fruit,
      item.clock_winder,
      item.gem_of_love,
      item.awakening_scroll,
      item.runestone_essence,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'At the start of the battle:',
          [
            'Boosts {{DMG_RES}} by 5%',
            'Boosts {{CTR_TIME_RED}} by 15%',
          ],
          'When {{HP}} drops below 80% the first time:',
          [
            'Boosts {{DMG_RES}} by 8%',
            'Boosts {{CTR_TIME_RED}} by 25% for 8s',
          ],
          'When {{HP}} drops below 60% the first time:',
          [
            'Boosts {{DMG_RES}} by 8%',
            'Boosts {{CTR_TIME_RED}} by 25% for 12s',
          ],
          'When {{HP}} drops below 40% the first time:',
          [
            'Boosts {{DMG_RES}} by 8%',
            'Boosts {{CTR_TIME_RED}} by 25% until the battle ends',
          ],
          '{{i}} Each effect is counted independenly and stackable',
        ],
      },
    ],
  },
  {
    name: 'wave-cruiser',
    regions: [reg.cn],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.chrono_key,
      item.divine_hammer,
      item.feather_coin,
      item.divine_feather_coin,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'At the start of the battle gains 5 wave stack(s)',
          'Each wave',
          [
            "Reduce enemy' Final {{CRIT_DMG}} by 4%",
            "Reduce enemy' Final {{PAL_CRIT_DMG}} by 4%",
            "Reduce enemy' Final {{SKILL_CRIT_DMG}} by 4%",
            '{{i}} A wave breaks every 6s or after every 20 {{BASIC_ATK}}',
          ],
          'When a wave break:',
          [
            'Boosts {{MOV_SPD}} by 8%',
            'Boosts {{ATK}} by 6%',
            d.stacks(5),
            d.lastUntilEnd,
          ],
        ],
      },
    ],
  },
  {
    name: 'light-upon-the-sea',
    alt_name: 'Sea of Lanterns',
    regions: [reg.kr, reg.cn, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.runestone_essence,
      item.pact_coin,
      item.pact_coupon,
      item.gem_of_love,
      item.divine_hammer,
      item.runestone_block_potion,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'After 15s:',
          [
            'Becomes immune to {{DMG}} for 2s',
            'Gain 15% Final {{CRIT_DMG}}',
            'Gain 15% Final {{SKILL_CRIT_DMG}}',
            'Gain 15% Final {{PAL_CRIT_DMG}}',
            d.lastUntilEnd,
          ],
          'During {{DMG}} immunity:',
          [
            'Current {{HP}} changes into 40% of your {{MAX_HP}}',
          ],
        ],
      },
    ],
  },
  {
    name: 'koi-paper-kite',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.speedup_coupon,
      item.ore,
      item.magic_lamp,
      item.purple_soul,
      item.soul_essence,
      item.fruit_offerings,
      item.soul_crystal,
      item.orange_soul,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          'Every 3 {{COMBO}} triggers an additional 500% {{AOE_DMG}}',
        ],
      },
    ],
  },

  // bikes
  {
    name: 'hot-wheels',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.advance_seed,
      item.purple_soul,
      item.soul_essence,
      item.dungeon_key,
      item.premium_seed,
      item.soul_crystal,
      item.orange_soul,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          'Boosts {{PAL_ATK_SPD}} by 2% per second (up to 40%)',
        ],
      },
    ],
  },
  {
    name: 'mini-motorcycle',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw,
    ],
    items: [
      item.gold,
      item.magic_lamp,
      item.high_yield_fertilizer,
      item.advance_seed,
      item.skill_coupon,
      item.pal_coupon,
      item.premium_seed,
      item.fruit_offerings,
      item.orange_skill,
      item.red_skill,
      item.red_pal,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 1 {{COUNTER}}:',
          [
            'Increase global {{COUNTER_DMG}}} by 10% for 3s (up to 30%)',
            '{{i}} The duration refreshes with each new {{COUNTER}} trigger',
          ],
        ],
      },
    ],
  },
  {
    name: 'behemoth',
    regions: [reg.kr, reg.sea, reg.jp, reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.uku_fruit,
      item.clock_winder,
      item.gem_of_love,
      item.soul_crystal,
      item.mimir_spring,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.sea],
        list: [
          'When {{HP}} is below 70%:',
          ['Boosts {{ATK}} by 5%'],
          'Every second:',
          [
            'Boosts {{ATK}} by 1%',
            'Boosts {{DMG_RES}} by 1%',
            d.stacks(10),
          ],
        ],
      },
    ],
  },
  {
    name: 'grani',
    regions: [reg.kr, reg.sea, reg.jp, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_essence,
      item.soul_crystal,
      item.fruit_offerings,
      item.uku_fruit,
      item.divine_hammer,
      item.mimir_spring,
    ],
    details: [
      {
        regions: [reg.sea],
        list: [
          'Boosts {{ATK}} by 10%',
          'Reduces the {{CTR_TIME}} by 30%',
        ],
      },
    ],
  },
  {
    name: 'blazing-gg',
    regions: [reg.cn],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.dungeon_key,
      item.fruit_offerings,
      item.soul_crystal,
      item.divine_hammer,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.cn],
        list: [
          'For every 10% {{HP}} lost:',
          [
            'Release a flame dealing at least 500% of current {{BASIC_ATK_DMG}}',
            '{{i}} Scales with lost {{HP}}',
          ],
        ],
      },
    ],
  },
  {
    name: 'firestorm-ride',
    alt_name: 'Blazing Motorcycle',
    regions: [reg.global, reg.kr, reg.sea, reg.jp],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.dungeon_key,
      item.fruit_offerings,
      item.soul_crystal,
      item.divine_hammer,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'For every 10% {{HP}} lost:',
          [
            'Release a flame dealing at least 500% of current {{BASIC_ATK_DMG}}',
            '{{i}} Scales with lost {{HP}}',
          ],
        ],
      },
    ],
  },
  {
    name: 'wheels-rolling',
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.remodeling_guide,
      item.clock_winder,
      item.chrono_key,
      item.divine_hammer,
      item.awakening_scroll,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.cn, reg.jp],
        list: [
          'Every 8s:',
          [
            'When your {{HP}} is more than 50%, for every 10% {{HP}} you have:',
            [
              'Boosts {{ATK}} by 2% for 8s',
              'Boosts {{DEF}} by 2% for 8s',
            ],
            'When your {{HP}} is lower than 50%:',
            [
              'Recover 12% of lost {{HP}} for 8s',
              'Boosts {{DMG_RES}} by 10% for 8s',
            ],
          ],
          d.triggersStart,
        ],
      },
    ],
  },
  {
    name: 'speed',
    alt_name: 'Speed of Death',
    items: [
      item.empowerment_gear,
      item.divine_hammer,
      item.soul_crystal,
      item.clock_winder,
      item.remodeling_guide,
      item.runestone_essence,
      item.magic_lamp,
      item.gold,
    ],
    details: [
      {
        regions: [reg.kr, reg.global],
        list: [
          'At the start of the battle:',
          [
            'Gains 20% {{EVASION}}',
            'Activates Speed-Up Mode',
          ],
          'During Speed-Up Mode:',
          [
            'Every 1 {{EVASION}}, 8 {{BASIC_ATK}}, 8 {{COMBO}}, 8 {{COUNTER}}, or 2 {{ACTIVE_SKILL}} used:',
            ['Boosts {{MOV_SPD}} by 8% until Burst Mode'],
          ],
          'When {{MOV_SPD}} reaches 200% of initial value:',
          [
            'Activates Charge Mode',
            'Boosts {{DMG_RES}} by 9% for 5s',
          ],
          'After Charge Mode ends:',
          [
            'Activates Burst Mode',
            'Cleanses and ignores {{CTR}}',
            'Recovers 12% of lost {{HP}} per second for 5s',

            'Boosts {{DMG_RES}} by 12% for 5s',
            'Boosts {{ATK}} by 32% for 5s',
            'Boosts {{DEF}} by 32% for 5s',
            'Boosts {{ATK_SPD}} by 32% for 5s',
            'Boosts {{ENERGY_REGEN_SPD}} by 32% for 5s',
            'Boosts {{PAL_ATK_SPD}} by 32% for 5s',
          ],
          'After Burst Mode ends:',
          ['Returns to Speed-Up Mode'],
        ],
      },
    ],
  },
  // cars
  {
    name: 'horizon-racer',
    regions: [reg.tw],
    items: [
      item.speedup_coupon,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.soul_essence,
      item.dungeon_key,
      item.soul_crystal,
      item.divine_hammer,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn, reg.kr],
        list: [
          'Every 10s:',
          [
            'Deal 800% {{BASIC_ATK_DMG}} as {{AOE_DMG}}',
            '{{KNOCKUP}} targets',
          ],
        ],
      },
    ],
  },
  {
    name: 'gator-tyrant',
    alt_name: 'Gator Menace',
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_essence,
      item.soul_crystal,
      item.fruit_offerings,
      item.uku_fruit,
      item.divine_hammer,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 5s after the battle starts:',
          [
            'Deals {{DMG}} equal to 4% of the {{MAX_HP}} to all targets within range',
            'Reduce their {{DMG_RES}} by 2%',
            'Reduce their {{CRIT_RES}} by 20%',
            d.lastUntilEnd,
            d.stacks(5),
          ],
        ],
      },
      {
        regions: [reg.sea, reg.kr],
        list: [
          'Every 16s after the battle starts:',
          [
            'Deals 2000% {{SKILL_DMG}} as {{AOE_DMG}}',
            'Deals 800% {{COMBO_DMG}} as {{AOE_DMG}}',
            'Deals 800% {{COUNTER_DMG}} as {{AOE_DMG}}',
          ],
          'Every second:',
          [
            'Targets take 2% of their current {{HP}} as {{DMG}}',
            'Reduces {{ATK}} by 10% for 5s',
            'Reduces {{DMG_RES}} by 10% for 5s',
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'jade-rabbit-no-1',
    regions: [reg.jp, reg.tw],
    items: [
      item.speedup_coupon,
      item.ore,
      item.magic_lamp,
      item.purple_soul,
      item.pal_coupon,
      item.soul_essence,
      item.soul_crystal,
      item.orange_pal,
      item.orange_soul,
      item.red_pal,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.cn, reg.kr],
        list: [
          'Every 10s:',
          [
            'Boosts {{DMG_RES}} by 10%',
            'Restore 15% of lost {{HP}}',
          ],
        ],
      },
    ],
  },

  // slides
  {
    name: 'new-years-joy',
    regions: [reg.tw],
    items: [
      item.speedup_coupon,
      item.ore,
      item.magic_lamp,
      item.soul_essence,
      item.soul_crystal,
      item.clock_winder,
      item.awakening_scroll,
      item.divine_hammer,
    ],
    details: [
      {
        regions: [reg.cn, reg.kr],
        list: [
          'Every 10s:',
          [
            'Purify and ignore the {{CTR}} for 1s',
            'Boosts {{ATK}} by 20%',
            'Boosts {{DEF}} by 20%',
            'Boosts {{DMG_RES}} by 15%',
            'Reduce {{CTR}} by 1/5 per second',
          ],
        ],
      },
    ],
  },
  {
    name: 'snowy-night',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.purple_soul,
      item.soul_essence,
      item.soul_crystal,
      item.orange_soul,
      item.feather_coin,
      item.divine_hammer,
      item.divine_feather_coin,
    ],
    details: [
      {
        regions: [reg.cn],
        list: [
          'Every 10s, randomly get one of the following effects:',
          [
            '{{or}} Purify and ignores {{CTR}} for 4s',
            '{{or}} Boosts {{ATK}} by 15% for 4s',
            '{{or}} Boosts {{CRIT_DMG}} for 20% for 4s',
            '{{or}} Boosts {{SKILL_CRIT_DMG}} for 20% for 4s',
            '{{or}} Restores 10% of {{MAX_HP}}',
          ],
        ],
      },
    ],
  },
  {
    name: 'snow-wanderer',
    alt_name: 'Blizzard Visitor',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_essence,
      item.soul_crystal,
      item.fruit_offerings,
      item.feather_coin,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          "Reduces all target's {{MOV_SPD}} by 25%",
          'For every 10% {{MOV_SPD}} they lose:',
          [
            'Reduces their {{ATK}} by an extra 2%',
            'Their {{CTR_TIME}} is increased by 2%',
          ],
        ],
      },
    ],
  },
  {
    name: 'journey-with-poetry',
    regions: [reg.kr, reg.tw, reg.jp],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.remodeling_guide,
      item.skill_coupon,
      item.dungeon_key,
      item.clock_winder,
      item.orange_skill,
      item.divine_hammer,
      item.red_skill,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.sea, reg.cn],
        list: [
          'Every 6 {{SKILL}} casts:',
          ['Restore full energy to 1 random {{SKILL}}'],
        ],
      },
    ],
  },
  {
    name: 'magic-carpet',
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.remodeling_guide,
      item.skill_coupon,
      item.dungeon_key,
      item.clock_winder,
      item.orange_skill,
      item.divine_hammer,
      item.red_skill,
      item.awakening_scroll,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'Every 6 {{SKILL}} casts:',
          ['Restore full energy to 1 random {{SKILL}}'],
        ],
      },
    ],
  },

  // planes / spaceships
  {
    name: 'skyglider',
    svg: true,
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.chrono_key,
      item.clock_winder,
      item.divine_hammer,
      item.red_pal,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'flying-shark',
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.pal_coupon,
      item.chrono_key,
      item.clock_winder,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.cn],
        list: [
          'Every 12s:',
          [
            'Deals 1600% {{SKILL_DMG}}',
            'Recovers {{HP}} equal to the {{DMG}} caused',
            '{{i}} Restored value is not affected by PVP decay',
            '{{i}} Single restore does not exceed 30% of {{MAX_HP}}',
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'dimensional-wings',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.chrono_key,
      item.divine_hammer,
      item.feather_coin,
      item.divine_feather_coin,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Gain one bar of Rage when you meet one of the following conditons:',
          [
            '{{or}} For every 15 {{BASIC_ATK}}',
            '{{or}} For every 12 {{COMBO}}',
            '{{or}} For every 12 {{COUNTER}}',
            '{{or}} For every 3 {{ACTIVE_SKILL}}',
            '{{or}} After taking {{DMG}} equal to 18% of {{MAX_HP}}',
            '{{i}} Each bar of Rage boosts {{DEF}} by 3%',
          ],
          'When Rage reaches 5 points, all points are consumed to:',
          [
            'Boosts {{DMG_RES}} by 12% for 5s',
            'Boosts {{ATK}} by 12% for 5s',
            'Boosts {{SKILL_CRIT_DMG}} by 12% for 5s',
            'Boosts {{SKILL_CRIT_RATE}} by 12% for 5s',
            'Boosts {{CRIT_DMG}} by 12% for 5s',
            'Boosts {{CRIT_RATE}} by 12% for 5s',
            'Boosts {{PAL_CRIT_DMG}} by 12% for 5s',
            'Boosts {{PAL_CRIT_RATE}} by 12% for 5s',
          ],
        ],
      },
    ],
  },
  {
    name: 'nebula-orbiter',
    alt_name: 'Nebular Shuttle',
    regions: [reg.jp, reg.cn, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_crystal,
      item.fruit_offerings,
      item.feather_coin,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.kr],
        list: [
          'Every 11s:',
          [
            'Grants a shield that equal to 10% of your {{MAX_HP}} for 8s',
          ],
          'When the shield is active:',
          [
            'Boost {{DMG_RES}} by 6% until the shield wears off',
          ],
          'When the shield wears off:',
          [
            'Cleanses',
            'Boosts Final {{DMG_RES}} by 3%',
            'Boosts {{ATK}} by 3%',
            d.lastUntilEnd,
            d.stacks(3),
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'wings-of-victory-no-1',
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.chrono_key,
      item.divine_hammer,
      item.feather_coin,
      item.divine_feather_coin,
    ],
    details: [
      {
        regions: [reg.jp, reg.tw],
        list: [
          'At the start of the battle:',
          [
            "Reduces enemies' {{ATK}} by 10% for 15s",
            "Reduces enemies' {{DMG_RES}} by 10% for 15s",
          ],
          'When {{HP}} drops below 75% for the first time:',
          [
            'Boosts {{ATK_SPD}} by 10% for 15s',
            'Boosts {{ENERGY_REGEN_SPD}} by 10% for 15s',
            'Boosts {{PAL_ATK_SPD}} by 10% for 15s',
            'Boosts {{PAL_REGEN_SPD}} by 10% for 15s',
          ],
          'When {{HP}} drops below 40% for the first time:',
          ['Triggers both of the above effects again'],
          '{{i}} The effects can be stacked.',
          '{{i}} Duration of each stack is calculated independently.',
        ],
      },
    ],
  },
  {
    name: 'diving-duck',
    regions: [reg.kr, reg.jp, reg.cn, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.soul_essence,
      item.uku_fruit,
      item.mimir_spring,
      item.gem_of_love,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 11s to all enemies in the area:',
          [
            'Deal 2000% {{SKILL_DMG}}',
            'Deal 800% {{COMBO_DMG}}',
            'Deal 800% {{COUNTER_DMG}}',
            'Reduce their {{ATK}} by 10% until the end of the battle',
            '{{i}} This effect does not stack',
          ],
          'Each cast increase the {{DMG}} by 50% of the next cast',
          'Repeated {{ATK}} reduction on the same target:',
          [
            'Reduces their {{ATK}} by an additional 3%',
            d.stacks(2),
            d.triggersStart,
          ],
        ],
      },
    ],
  },
  {
    name: 'croak-dreamer',
    alt_name: 'Trembling Pepe',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_essence,
      item.soul_crystal,
      item.fruit_offerings,
      item.feather_coin,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          'Every 8s the following two buffs will alternate to take effect:',
          [
            '{{or}} Gain a shield with 8% of {{MAX_HP}} for 8s',
            '{{or}} Boost {{ATK}} by 8% and reduce the {{CTR_TIME}} by 30% for 8s',
          ],
        ],
      },
    ],
  },

  //robots
  {
    name: 'kabuda-base',
    items: [
      item.gold,
      item.magic_lamp,
      item.uku_fruit,
      item.mimir_spring,
      item.feather_coin,
      item.gem_of_love,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.cn],
        list: [
          'At the start of the battle, place the character in a sealed state',
          'During sealing:',
          [
            'Boosts {{DMG_RES}} by 40%',
            'Boosts {{DEF}} by 150%',
            '{{i}} Unable to {{BASIC_ATK}}, {{COUNTER}}, {{COMBO}} or launch {{ACTIVE_SKILL}}',
            '{{i}} The seal breaks after 7s or when the {{HP}} drops below 50% for the first time',
          ],
          'When the seal breaks:',
          [
            'Effects disappear',
            'Deals 3000% {{SKILL_DMG}} to {{AREA_ENEMIES}}',
            'Deals 1200% current {{COMBO_DMG}} to {{AREA_ENEMIES}}',
            'Deals 1200% current {{COUNTER_DMG}} to {{AREA_ENEMIES}}',
            'Deals 8% of your {{MAX_HP}} to {{AREA_ENEMIES}}',
            'Boosts {{DMG_RES}} by 10%',
            'Boosts {{ATK}} by 10%',
            'Reduced {{CTR_TIME}} by 20%',
          ],
        ],
      },
      {
        regions: [reg.jp],
        list: [
          'At the start of the battle, place the character in a sealed state',
          'During sealing:',
          [
            'Boosts {{DMG_RES}} by 40%',
            'Boosts {{DEF}} by 150%',
            '{{i}} Unable to {{BASIC_ATK}}, {{COUNTER}}, {{COMBO}} or launch {{ACTIVE_SKILL}}',
            '{{i}} The seal breaks after 6s or when the {{HP}} drops below 60% for the first time',
          ],
          'When the seal breaks:',
          [
            'Effects disappear',
            'Deals 3000% {{SKILL_DMG}} to {{AREA_ENEMIES}}',
            'Deals 1200% current {{COMBO_DMG}} to {{AREA_ENEMIES}}',
            'Deals 1200% current {{COUNTER_DMG}} to {{AREA_ENEMIES}}',
            'Deals 8% of your {{MAX_HP}} to {{AREA_ENEMIES}}',
            'Boosts {{DMG_RES}} by 10%',
            'Boosts {{ATK}} by 10%',
            'Reduced {{CTR_TIME}} by 20%',
          ],
        ],
      },
    ],
  },

  // ?

  {
    name: 'amethys-gourd',
    svg: true,
    items: [
      item.gold,
      item.magic_lamp,
      item.purple_soul,
      item.dungeon_key,
      item.soul_essence,
      item.soul_crystal,
      item.red_skill,
    ],
    details: noDetails(
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw
    ),
  },
  {
    name: 'magic-broom',
    items: [
      item.speedup_coupon,
      item.ore,
      item.magic_lamp,
      item.dungeon_key,
      item.fruit_offerings,
      item.soul_crystal,
      item.divine_hammer,
      item.awakening_scroll,
    ],
    details: noDetails(reg.global),
  },

  {
    name: 'pyrebreaker',
    regions: [
      reg.global,
      reg.kr,
      reg.sea,
      reg.jp,
      reg.cn,
      reg.tw,
    ],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.pal_coupon,
      item.chrono_key,
      item.clock_winder,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Increase base {{CRIT_RATE}} by 1% per second (up to 20%)',
          'Increase base {{CRIT_DMG}} by 5% per second (up to 100%)',
        ],
      },
    ],
  },
  {
    name: 'night-fish-light',
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.remodeling_guide,
      item.clock_winder,
      item.chrono_key,
      item.divine_hammer,
      item.awakening_scroll,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.jp],
        list: [
          'At the start of the battle:',
          [
            'Reduce {{DMG_RES}} by 10%',
            'Boosts {{ACT_SKILL_TIME}} by 15%',
          ],
          'When {{HP}} drops below 75% for the first time:',
          [
            'Boosts {{DMG_RES}} by 2%',
            'Boosts {{ACT_SKILL_TIME}} by 3%',
          ],
          'When {{HP}} drops below 50% for the first time:',
          [
            'Boosts {{DMG_RES}} by 2%',
            'Boosts {{ACT_SKILL_TIME}} by 3%',
          ],
          '{{i}} The effects can be stacked.',
          d.lastUntilEnd,
        ],
      },
    ],
  },
  {
    name: 'book-of-cosmic-justice',
    alt_name: 'Book of the Universe',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.magic_lamp,
      item.skill_coupon,
      item.soul_essence,
      item.soul_crystal,
      item.orange_skill,
      item.red_skill,
      item.awakening_scroll,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          'When casting an {{ACTIVE_SKILL}}:',
          [
            'Has 15% chances to cast it again (excluding those cast by Past Revisited and Eye of Raven)',
          ],
        ],
      },
    ],
  },
  {
    name: 'hearts-resonance',
    alt_name: "Heart's Desire",
    regions: [reg.kr, reg.jp, reg.cn, reg.tw],
    items: [
      item.speedup_coupon,
      item.magic_lamp,
      item.high_yield_fertilizer,
      item.remodeling_guide,
      item.clock_winder,
      item.gem_of_love,
      item.awakening_scroll,
      item.runestone_essence,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.kr],
        list: [
          'For the first 20s of battle, every second there is a 60% chance to:',
          [
            'Boosts {{ATK}} by 1%',
            'Boosts {{DMG_RES}} by 1%',
            d.lastUntilEnd,
          ],
          'After the first 20s:',
          [
            'Deal 8000% {{SKILL_DMG}} as {{AOE_DMG}}',
            '{{KNOCKUP}} targets for 0.5s',
          ],
        ],
      },
    ],
  },
  {
    name: 'time-machine',
    regions: [reg.kr, reg.jp, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.soul_essence,
      item.soul_crystal,
      item.fruit_offerings,
      item.feather_coin,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea, reg.cn],
        list: [
          'For the first 20s after the battle starts:',
          [
            'Negates and stores 40% of all {{DMG}} received',
            'Boosts {{ATK}} by 8%',
            'Boosts Final {{CRIT_DMG}} by 10%',
            'Boosts Final {{SKILL_CRIT_DMG}} by 10%',
            'Boosts Final {{PAL_CRIT_DMG}} by 10%',
          ],
          'After the first 20s of the battle:',
          [
            'Receives and additional 6% of the storaged {{DMG}} (Ignores immunity) per second for a total of 10s',
          ],
        ],
      },
    ],
  },

  {
    name: 'adapto-slime',
    regions: [reg.kr, reg.jp, reg.cn, reg.tw],
    items: [
      item.gold,
      item.ore,
      item.magic_lamp,
      item.remodeling_guide,
      item.chrono_key,
      item.divine_hammer,
      item.feather_coin,
      item.divine_feather_coin,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'When {{HP}} drops below 80%:',
          ['Increase {{ATK}} by 15% for 10s'],
          'When {{HP}} drops below 60%:',
          [
            'Gains a shield equal to 10% of {{MAX_HP]} for 10s',
          ],
          'When {{HP}} drops below 30%:',
          ['Boosts {{DMG_RES}} by 15% for 10s'],
        ],
      },
    ],
  },
  {
    name: 'thundering-warbeat',
    alt_name: 'Boom Da Bang',
    regions: [reg.kr, reg.jp, reg.cn, reg.tw],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.pal_coupon,
      item.chrono_key,
      item.clock_winder,
      item.divine_hammer,
      item.empowerment_gear,
    ],
    details: [
      {
        regions: [reg.global, reg.sea],
        list: [
          'Every 10s:',
          [
            'Boosts {{ATK}} by 4%',
            'Boosts {{ATK_SPD}} by 4%',
            'Boosts {{ENERGY_REGEN_SPD}} by 4%',
            'Boosts {{PAL_ATK_SPD}} by 4%',
            d.stacks(6),
            d.triggersStart,
          ],
          'At 6 stacks or when {{HP}} drops below 40%:',
          [
            '{{STUNS}} all enemies for 1.5s',
            'Reduces their {{DMG_RES}} by 10%',
            d.lastUntilEnd,
          ],
        ],
      },
    ],
  },
  {
    name: 'ethereal-phoenix',
    items: [
      item.chrono_key,
      item.divine_feather_coin,
      item.feather_coin,
      item.divine_hammer,
      item.remodeling_guide,
      item.ore,
      item.magic_lamp,
      item.gold,
    ],
    details: [
      {
        regions: [reg.global],
        list: [
          'Cleanse and ignore control effects for 1s for every 18% Max HP lost. Gain a shield equal to 8% Max HP, lasting 5s. After the shield expires, ATK increases by 4% until the battle ends, stacking up to 6 times.',
        ],
      },
    ],
  },
  {
    name: 'oil-painting-fan',
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.uku_fruit,
      item.clock_winder,
      item.gem_of_love,
      item.awakening_scroll,
      item.runestone_essence,
    ],
    details: [
      {
        regions: [reg.jp, reg.kr],
        list: [
          'Every 11 seconds, gain +30% Critical Rate and +30% Skill Critical Rate for 3 seconds.',
          'During this duration, each time 5 Critical Hits or 1 Skill Critical Hit occur, fire fireworks that deal 200% of current normal attack as area damage to enemies (can be crit), and increase your Final Critical Damage and Final Skill Critical Damage by +6% for 3 seconds. Stacks up to 5 times.',
          d.triggersStart,
        ],
      },
    ],
  },

  {
    name: 'lightning-battle-rider',
    regions: [reg.kr],
    items: [
      item.gold,
      item.magic_lamp,
      item.remodeling_guide,
      item.clock_winder,
      item.mimir_spring,
      item.divine_hammer,
      item.empowerment_gear,
    ],
  },
]
