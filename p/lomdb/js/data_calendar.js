import calendar_events from './data_calendar_events.js'

const calendar_ranges = [
  // {
  //   every: '2024-03-01',
  //   event: calendar_events.anniversary(['AMEN-001..250']),
  // },
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  {
    from: '2025-09-01',
    to: '2025-09-01',
    event: calendar_events.merge('2025-09-01'),
  },
  {
    from: '2025-09-02',
    to: '2025-09-08',
    event: calendar_events.mech1,
  },
  {
    from: '2025-09-02',
    to: '2025-09-08',
    event: calendar_events.seven_day_login,
  },
  {
    from: '2025-09-02',
    to: '2025-09-15',
    event: calendar_events.new_stars,
  },
  {
    from: '2025-09-02',
    to: '2025-09-08',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-09-08',
    to: '2025-09-08',
    event: calendar_events.limited_pack_reset,
  },
  {
    from: '2025-09-09',
    to: '2025-09-09',
    event: calendar_events.fortune_cat,
  },
  {
    from: '2025-09-15',
    to: '2025-09-15',
    event: calendar_events.merge('2025-09-15'),
  },
  {
    from: '2025-09-17',
    to: '2025-09-17',
    event: calendar_events.update,
  },
  {
    from: '2025-09-19',
    to: '2025-09-25',
    event: calendar_events.mech2,
  },
  {
    from: '2025-09-19',
    to: '2025-09-25',
    event: calendar_events.cumulative_recharge,
  },

  {
    from: '2025-09-29',
    to: '2025-09-29',
    event: calendar_events.update,
  },
  {
    from: '2025-09-26',
    to: '2025-09-28',
    event: calendar_events.starlight_award,
  },
  {
    from: '2025-09-29',
    to: '2025-09-29',
    event: calendar_events.merge('2025-09-29'),
  },
  {
    from: '2025-09-09',
    to: '2025-09-18',
    event: calendar_events.mini_event,
  },
  {
    from: '2025-09-26',
    to: '2025-09-30',
    event: calendar_events.mini_event,
  },
  // ---------------------------------------------------------------------
  {
    from: '2025-10-01',
    to: '2025-10-01',
    event: calendar_events.limited_pack_reset,
  },
  {
    from: '2025-10-03',
    to: '2025-10-03',
    event: calendar_events.fortune_cat,
  },
  {
    from: '2025-10-03',
    to: '2025-10-09',
    event: calendar_events.moon,
  },
  {
    from: '2025-10-03',
    to: '2025-10-09',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-10-10',
    to: '2025-10-16',
    event: calendar_events.mini_event,
  },
  {
    from: '2025-10-13',
    to: '2025-10-13',
    event: calendar_events.merge('2025-10-13'),
  },
  {
    from: '2025-10-15',
    to: '2025-10-15',
    event: calendar_events.update,
  },
  {
    from: '2025-10-17',
    to: '2025-10-23',
    event: calendar_events.elements,
  },
  {
    from: '2025-10-17',
    to: '2025-10-23',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-10-24',
    to: '2025-10-30',
    event: calendar_events.mini_event,
  },
  {
    from: '2025-10-27',
    to: '2025-10-27',
    event: calendar_events.merge('2025-10-27'),
  },
  {
    from: '2025-10-29',
    to: '2025-10-29',
    event: calendar_events.update,
  },
  // ---------------------------------------------------------------------
  {
    from: '2025-11-01',
    to: '2025-11-01',
    event: calendar_events.limited_pack_reset,
  },
  {
    from: '2025-10-31',
    to: '2025-11-06',
    event: calendar_events.halloween,
  },
  {
    from: '2025-10-31',
    to: '2025-11-06',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-11-07',
    to: '2025-11-13',
    event: calendar_events.mini_event,
  },
  {
    from: '2025-11-10',
    to: '2025-11-10',
    event: calendar_events.merge('2025-11-10'),
  },
  {
    from: '2025-11-12',
    to: '2025-11-12',
    event: calendar_events.update,
  },
  {
    from: '2025-11-14',
    to: '2025-11-20',
    event: calendar_events.frozen,
  },
  {
    from: '2025-11-14',
    to: '2025-11-20',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-11-21',
    to: '2025-11-27',
    event: calendar_events.mini_event,
  },
  {
    from: '2025-11-21',
    to: '2025-11-23',
    event: calendar_events.starlight_award,
  },
  {
    from: '2025-11-24',
    to: '2025-11-24',
    event: calendar_events.merge('2025-11-24'),
  },
  {
    from: '2025-11-26',
    to: '2025-11-26',
    event: calendar_events.update,
  },
  {
    from: '2025-11-28',
    to: '2025-11-28',
    event: calendar_events.fortune_cat,
  },
  // ---------------------------------------------------------------------
  {
    from: '2025-12-01',
    to: '2025-12-17',
    event: calendar_events.onepunchman_collab,
  },
  {
    from: '2025-12-01',
    to: '2025-12-01',
    event: calendar_events.limited_pack_reset,
  },
  {
    from: '2025-12-01',
    to: '2025-12-03',
    event: calendar_events.heroic_journey,
  },
  {
    from: '2025-12-01',
    to: '2025-12-03',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-12-11',
    to: '2025-12-17',
    event: calendar_events.ultimate_battle,
  },
  {
    from: '2025-12-11',
    to: '2025-12-17',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-12-18',
    to: '2025-12-20',
    event: calendar_events.christmas_count_down,
  },
  {
    from: '2025-12-21',
    to: '2025-12-27',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2025-12-28',
    to: '2025-12-31',
    event: calendar_events.mini_event,
  },
  {
    from: '2025-12-30',
    to: '2025-12-30',
    event: calendar_events.update,
  },
  {
    from: '2025-12-18',
    to: '2025-12-18',
    event: calendar_events.update,
  },
  {
    from: '2025-12-08',
    to: '2025-12-08',
    event: calendar_events.merge('2025-12-08'),
  },
  {
    from: '2025-12-21',
    to: '2025-12-21',
    event: calendar_events.fortune_cat,
  },
  {
    from: '2025-12-21',
    to: '2025-12-27',
    event: calendar_events.christmas,
  },
  // ---------------------------------------------------------------------
  // {
  //   from: '2026-01-19',
  //   to: '2026-01-19',
  //   event: calendar_events.merge('2026_01_19'),
  // },
  {
    from: '2026-01-26',
    to: '2026-01-26',
    event: calendar_events.merge('2026_01_26'),
  },
  {
    from: '2026-01-14',
    to: '2026-01-14',
    event: calendar_events.update,
  },
  {
    from: '2026-01-28',
    to: '2026-01-28',
    event: calendar_events.update,
  },

  {
    from: '2026-01-01',
    to: '2026-01-07',
    event: calendar_events.new_year,
  },
  {
    from: '2026-01-01',
    to: '2026-01-07',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2026-01-16',
    to: '2026-01-22',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2026-01-08',
    to: '2026-01-15',
    event: calendar_events.ice_fishing,
  },
  {
    from: '2026-01-16',
    to: '2026-01-22',
    event: calendar_events.starry,
  },
  {
    from: '2026-01-23',
    to: '2026-01-25',
    event: calendar_events.starlight_award,
  },
  {
    from: '2026-01-23',
    to: '2026-01-31',
    event: calendar_events.mini_game_duel,
  },
  {
    from: '2026-01-01',
    to: '2026-01-01',
    event: calendar_events.limited_pack_reset,
  },
  // ---------------------------------------------------------------------
  {
    from: '2026-02-01',
    to: '2026-02-01',
    event: calendar_events.limited_pack_reset,
  },
  {
    from: '2026-02-02',
    to: '2026-02-08',
    event: calendar_events.starry2,
  },
  {
    from: '2026-02-02',
    to: '2026-02-08',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2026-02-09',
    to: '2026-02-15',
    event: calendar_events.mini_event,
  },
  {
    from: '2026-02-16',
    to: '2026-02-22',
    event: calendar_events.gourmet,
  },
  {
    from: '2026-02-16',
    to: '2026-02-22',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2026-02-23',
    to: '2026-02-28',
    event: calendar_events.mini_event,
  },
  // {
  //   from: '2026-02-09',
  //   to: '2026-02-09',
  //   event: calendar_events.merge('2026_02_09'),
  // },
  {
    from: '2026-02-11',
    to: '2026-02-11',
    event: calendar_events.update,
  },
  {
    from: '2026-02-25',
    to: '2026-02-25',
    event: calendar_events.update,
  },
  {
    from: '2026-02-16',
    to: '2026-02-16',
    event: calendar_events.fortune_cat,
  },
  // ---------------------------------------------------------------------
  {
    from: '2026-03-01',
    to: '2026-03-01',
    event: calendar_events.limited_pack_reset,
  },
  {
    from: '2026-03-01',
    to: '2026-03-06',
    event: calendar_events.palword_collab_preheat,
  },
  {
    from: '2026-03-07',
    to: '2026-03-27',
    event: calendar_events.palword_collab,
  },
  {
    from: '2026-03-07',
    to: '2026-03-13',
    event: calendar_events.cumulative_recharge,
  },
  {
    from: '2026-03-07',
    to: '2026-03-07',
    event: calendar_events.fortune_cat,
  },
  {
    from: '2026-03-07',
    to: '2026-03-13',
    event: calendar_events.pal_paradise,
  },
  {
    from: '2026-03-21',
    to: '2026-03-30',
    event:
      calendar_events.consecutive_recharge_rebate_wu_kong,
  },
  {
    from: '2026-03-21',
    to: '2026-03-27',
    event: calendar_events.fantasy_adventure,
  },
  {
    from: '2026-03-28',
    to: '2026-03-31',
    event: calendar_events.mini_event,
  },

  {
    from: '2026-03-02',
    to: '2026-03-02',
    event: calendar_events.merge('2026_03_02'),
  },
  {
    from: '2026-03-04',
    to: '2026-03-04',
    event: calendar_events.update,
  },
  {
    from: '2026-03-16',
    to: '2026-03-16',
    event: calendar_events.merge('2026_03_16'),
  },
  {
    from: '2026-03-18',
    to: '2026-03-18',
    event: calendar_events.update,
  },
  {
    from: '2026-03-30',
    to: '2026-03-30',
    event: calendar_events.merge('2026_03_30'),
  },
]

export { calendar_ranges }
