import reg from '../enums/regions.mjs'

const listing = [
  {
    name: 'abaddon-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'happy-arrival',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+5% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'alex-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'highway-parking-lot',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{HP}}'],
      },
    ],
  },
  {
    name: 'archway',
    regions: [reg.sea],
    details: [
      {
        regions: [reg.global],
        list: ['{{NOTHING}}'],
      },
    ],
  },
  {
    name: 'holiday-forever',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ATK}}', '+3% {{HP}}', '+3% {{DEF}}'],
      },
    ],
  },
  {
    name: 'artistic-streetlamp',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'holiday-pool',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+4% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'barbed-wire',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{DEF}}'],
      },
    ],
  },
  {
    name: 'ice-pond',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+8% {{REMODELING_POINTS}}'],
      },
    ],
  },
  {
    name: 'bunny-lamp',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'infinite-happiness',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+3% {{ATK}}', '+3% {{HP}}', '+3% {{DEF}}'],
      },
    ],
  },
  {
    name: 'cartoon-gate',
    regions: [reg.sea],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'lotus-leaves',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+8% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'paper-fox',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'carved-gazebo',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+20m {{PROTECTION_TIME}}'],
      },
    ],
  },
  {
    name: 'luffy-house',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'chrishroom-s-secret',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{PARKING_COINS}}', '+5% {{REMODELING_POINTS}}'],
      },
    ],
  },
  {
    name: 'luffy-luffy-rune-rune',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: [
          '+5% {{PARKING_COINS}}',
          '+5% {{REMODELING_POINTS}}',
          '+3% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'christmas-crystal-house',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+4% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'luffy-viking',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: [
          '+4% {{REMODELING_POINTS}}',
          '+4% {{PARKING_COINS}}',
          '+2% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'christmas-tree',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'luna-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'classic-lantern',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{ATK}}'],
      },
    ],
  },
  {
    name: 'mars-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'clown-ferris-wheel',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: [
          '+4% {{PARKING_COINS}}',
          '+4% {{REMODELING_POINTS}}',
          '+2% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'may-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'conch-house',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{DEF}}'],
      },
    ],
  },
  {
    name: 'mona-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'cradle-gazebo',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+20m {{PROTECTION_TIME}}'],
      },
    ],
  },
  {
    name: 'observatory-platform',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'crazy-anniversary',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'oriental-courtyard-gate',
    regions: [reg.sea],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'cupid-s-fountain',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+20m {{PROTECTION_TIME}}'],
      },
    ],
  },
  {
    name: 'origin-of-divinity',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'dana-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'pepe-door',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: [
          '+5% {{PARKING_COINS}}',
          '+5% {{REMODELING_POINTS}}',
          '+3% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'davi-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'pepe-lamp',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ATK}}', '+3% {{HP}}', '+3% {{DEF}}'],
      },
    ],
  },
  {
    name: 'default-spot',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['{{NOTHING}}'],
      },
    ],
  },
  {
    name: 'polar-bear',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{ATK}}'],
      },
    ],
  },
  {
    name: 'dragon-god-idol',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{ATK}}'],
      },
    ],
  },
  {
    name: 'regular-streetlamp',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['{{NOTHING}}'],
      },
    ],
  },
  {
    name: 'duck-lamp',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ATK}}', '+3% {{HP}}', '+3% {{DEF}}'],
      },
    ],
  },
  {
    name: 'revival-begins',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+3% {{ATK}}', '+3% {{HP}}', '+3% {{DEF}}'],
      },
    ],
  },
  {
    name: 'duxander-gate',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'rupee-land',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: [
          '+5% {{PARKING_COINS}}',
          '+5% {{REMODELING_POINTS}}',
          '+3% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'echo-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'sack-panda',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: [
          '+4% {{PARKING_COINS}}',
          '+4% {{REMODELING_POINTS}}',
          '+2% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'european-railings',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{REMODELING_POINTS}}'],
      },
    ],
  },
  {
    name: 'safety-fence',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+30m {{PROTECTION_TIME}}'],
      },
    ],
  },
  {
    name: 'european-streetlamp',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{REMODELING_POINTS}}'],
      },
    ],
  },
  {
    name: 'eve-of-reunion',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: [
          '+5% {{PARKING_COINS}}',
          '+5% {{REMODELING_POINTS}}',
          '+3% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'shroomie-gazebo',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+2% {{ATK}}', '+2% {{HP}}', '+2% {{DEF}}'],
      },
    ],
  },
  {
    name: 'fantasia',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+8% {{REMODELING_POINTS}}'],
      },
    ],
  },
  {
    name: 'shroomie-grassland',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{ATK}}'],
      },
    ],
  },
  {
    name: 'festival-carousel',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+8% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'shroomie-security-booth',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+20m {{PROTECTION_TIME}}'],
      },
    ],
  },
  {
    name: 'festive-ferris-wheel',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ATK}}', '+3% {{HP}}', '+3% {{DEF}}'],
      },
    ],
  },
  {
    name: 'snow-feast-and-lanterns',
    regions: [],
    details: [
      {
        regions: [reg.jp],
        list: ['+3% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'fierce-tiger',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+5% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'spring-awakening',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: [
          '+5% {{PARKING_COINS}}',
          '+5% {{REMODELING_POINTS}}',
          '+3% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'floral-vines',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'sunlight',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+3% {{ATK}}', '+3% {{HP}}', '+3% {{DEF}}'],
      },
    ],
  },
  {
    name: 'flower-gate',
    regions: [reg.sea],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'tamamo-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'flower-of-hope',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+6% {{HP}}'],
      },
    ],
  },
  {
    name: 'traditional-archway',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{REMODELING_POINTS}}'],
      },
    ],
  },
  {
    name: 'flowerside-storytelling',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{PARKING_COINS}}', '+5% {{REMODELING_POINTS}}'],
      },
    ],
  },
  {
    name: 'traditional-stone-balustrade',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{HP}}'],
      },
    ],
  },
  {
    name: 'fortune-tree',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: [
          '+4% {{PARKING_COINS}}',
          '+4% {{REMODELING_POINTS}}',
          '+2% {{ADVENTURE_REWARDS}}',
        ],
      },
    ],
  },
  {
    name: 'triumphal-arch',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+8% {{ATK}}'],
      },
    ],
  },
  {
    name: 'frej-stand',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'vacation-bench',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{HP}}'],
      },
    ],
  },
  {
    name: 'gate-of-enlightenment',
    regions: [],
    details: [
      {
        regions: [reg.jp],
        list: ['+5% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'honey-goldman-kondo',
    regions: [],
    details: [
      {
        regions: [reg.jp],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'gold-shroomie',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+10% {{PARKING_COINS}}'],
      },
    ],
  },
  {
    name: 'vintage-streetlamp',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+5% {{DEF}}'],
      },
    ],
  },
  {
    name: 'graceful-partition-screen',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'welcome-spring',
    regions: [],
    details: [
      {
        regions: [reg.kr],
        list: ['+30m {{PROTECTION_TIME}}'],
      },
    ],
  },
  {
    name: 'hanging-floral-lantern',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['+3% {{ADVENTURE_REWARDS}}'],
      },
    ],
  },
  {
    name: 'wooden-fence',
    regions: [],
    details: [
      {
        regions: [reg.global],
        list: ['{{NOTHING}}'],
      },
    ],
  },
]

export default listing
