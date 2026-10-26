// Maps shown on the "GO TO MAP" page.
import { I, TILE, cell, drawPond, PONDS, place, randomizedItemGroup, rng, tile } from './obj_game.js'

const POND = n => PONDS[n - 1].shape
function handWritten() {
  const W = cell(TILE.WATER) //                    25
  const G = cell(TILE.GRASS) //                    15
  const S = cell(TILE.SAND) //                     35
  const T = G + I.TREE //                          8000015  grass + tree
  const F = G + I.FLOWER_BLUE //                   15000015 grass + blue flowers
  const L = W + I.LILYPOND_1 //                    27000025 water + lilypad
  const D = G + I.HOLE_DOWN //                     2000015  grass + hole down

  const tiles = [
    [W, W, W, W, W, W, W, W],
    [W, tile(0, 2, 5, 1, 7), tile(0, 2, 5, 1, 8), tile(0, 2, 5, 1, 8), tile(0, 2, 5, 1, 9), W, L, W],
    [W, tile(0, 2, 5, 1, 4), T, F, tile(0, 2, 5, 1, 6), W, W, W],
    [W, tile(0, 2, 5, 1, 4), F, D, tile(0, 2, 5, 1, 6), W, L, W],
    [W, tile(0, 2, 5, 1, 1), tile(0, 2, 5, 1, 2), tile(0, 2, 5, 1, 2), tile(0, 2, 5, 1, 3), W, W, W],
    [W, W, W, W, W, W, S, S],
    [L, W, W, W, W, W, S, S],
  ]

  return { tiles, spawnRow: 3, spawnCol: 3 }
}

function lake(seed) {
  const random = rng(seed)
  const tiles = Array.from({ length: 30 }, () => Array(30).fill(cell(TILE.WATER))) // 25

  drawPond(tiles, 2, 2, TILE.WATER, POND(2), TILE.GRASS)
  drawPond(tiles, 10, 6, TILE.WATER, POND(3), TILE.GRASS, TILE.DEEP_WATER)
  drawPond(tiles, 24, 24, TILE.WATER, POND(4), TILE.GRASS)
  drawPond(tiles, 3, 18, TILE.WATER, POND(5), TILE.GRASS, TILE.DEEP_WATER)
  drawPond(tiles, 15, 13, TILE.WATER, POND(2), TILE.GRASS)
  drawPond(tiles, 17, 23, TILE.WATER, POND(3), TILE.GRASS)
  drawPond(tiles, 24, 0, TILE.WATER, POND(4), TILE.GRASS)

  tiles[27][2] += I.HOLE_DOWN

  randomizedItemGroup(
    tiles, 2, 28, 2, 28,
    [25011, 25012, 25013, 25014, 25015, 25016, 25017, 25018, 25019],
    random,
    place(I.TREE, 30, 2),
    place(I.FLOWER_BLUE, 50, 1),
    place(I.FLOWER_YELLOW, 10, 1)
  )

  randomizedItemGroup(
    tiles, 1, 29, 1, 29,
    [25, 25061, 25062, 25063, 25064, 25065, 25066, 25067, 25068, 25069],
    random,
    place(I.FLOWER_PINK, 10, 3),
    place(I.LILYPOND_1, 20, 3),
    place(I.LILYPOND_2, 20, 3)
  )

  return { tiles, spawnRow: 18, spawnCol: 15 }
}

export const STAGES = [
  { key: 'lake', name: 'Lake (Maps.lake)', random: true, make: lake },
  { key: 'hand', name: 'Hand-written array (example)', random: false, make: handWritten },
]
