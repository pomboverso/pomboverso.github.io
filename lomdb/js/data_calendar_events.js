export default {
  anniversary: servers => ({
    id: 'anniversary',
    title: `Anniversary`,
    servers: servers,
    priority: 2,
  }),

  // Mini Events
  mini_event: {
    id: 'mini_event',
    title: 'Mini Event',
    priority: 3,
  },
  mini_game_duel: {
    id: 'mini_game_duel',
    title: 'Mini-Game Duel',
    priority: 4,
  },
  ice_fishing: {
    id: 'ice_fishing',
    title: 'Ice Fishing Event',
    priority: 5,
  },
  starlight_award: {
    id: 'starlight_award',
    title: 'Starlight Award',
    priority: 6,
  },
  gourmet: {
    id: 'gourmet',
    title: 'Gourmet Event',
    priority: 7,
  },

  // Special Events
  new_year: {
    id: 'new_year',
    title: 'New Year Event',
    priority: 50,
  },
  onepunchman_collab: {
    id: 'onepunchman_collab',
    title: 'One Punch Man Collab',
    priority: 51,
  },
  heroic_journey: {
    id: 'heroic_journey',
    title: 'Heroic Journey Event',
    priority: 52,
  },
  ultimate_battle: {
    id: 'ultimate_battle',
    title: 'Ultimate Battle Event',
    priority: 53,
  },
  christmas_count_down: {
    id: 'christmas_count_down',
    title: 'Christmas Count Down',
    priority: 54,
  },
  christmas: {
    id: 'christmas',
    title: 'Christmas Event',
    priority: 55,
  },
  halloween: {
    id: 'halloween',
    title: 'Halloween Event',
    priority: 56,
  },
  frozen: {
    id: 'frozen',
    title: 'Frozen Event',
    priority: 57,
  },
  moon: { id: 'moon', title: 'Moon Event', priority: 50 },
  elements: {
    id: 'elements',
    title: 'Elements Event',
    priority: 58,
  },
  mech1: {
    id: 'mech',
    title: 'Mech Theme Event I',
    priority: 59,
  },
  mech2: {
    id: 'mech',
    title: 'Mech Theme Event II',
    priority: 60,
  },
  new_stars: {
    id: 'newstars',
    title: 'New Star Heroes',
    priority: 61,
  },
  starry: {
    id: 'starry',
    title: 'Starry Event',
    priority: 62,
  },
  starry2: {
    id: 'starry',
    title: 'Starry Event II',
    priority: 63,
  },
  palword_collab_preheat: {
    id: 'palword_collab_preheat',
    title: 'Pallword Collab Preheat',
    priority: 64,
  },
  palword_collab: {
    id: 'palword_collab',
    title: 'Pallword Collab',
    priority: 65,
  },
  pal_paradise: {
    id: 'pal_paradise',
    title: 'Pal Paradise',
    priority: 66,
  },
  fantasy_adventure: {
    id: 'fantasy_adventure',
    title: 'Fantasy Adventure',
    priority: 67,
  },
  consecutive_recharge_rebate_wu_kong: {
    id: 'cumulative_recharge',
    title: 'Consecutive Recharge Rebate (Wu Kong)',
    priority: 68,
  },

  // Money Recharge Event
  cumulative_recharge: {
    id: 'cumulative_recharge',
    title: 'Cumulative Recharge Rebate',
    priority: 7000,
  },
  limited_pack_reset: {
    id: 'limited_pack_reset',
    title: 'Limited Packs Reset',
    priority: 7001,
  },
  fortune_cat: {
    id: 'fortune_cat',
    title: 'Fortune Cat',
    priority: 7002,
  },

  // F2P Event
  seven_day_login: {
    id: 'seven_day',
    title: '7-Day Login Gift',
    priority: 8000,
  },

  // Game Events
  update: {
    id: 'update',
    title: 'Update',
    priority: 1,
  },
  merge: date => ({
    id: 'merge',
    title: 'Merge',
    url: `https://lomdb.github.io/merges.html?filterby=${date}`,
    priority: 0, // last in the list
  }),
}
