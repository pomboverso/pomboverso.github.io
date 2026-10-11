import fs from 'fs'
import * as cheerio from 'cheerio'

export default function () {
  const htmlFiles = [
    '3d-chart',
    'about',
    'age',
    'artifacts',
    'avians',
    'back-accesories',
    'budget',
    'calendar',
    'changelog',
    'design',
    'gaps',
    'guardians',
    'index',
    'leaderboard',
    'merges-blocks',
    'merges',
    'mount-calculator',
    'mounts',
    'normalizer',
    'pals',
    'parking-decorations',
    'players-duplication',
    'players',
    'ring-calculator',
    'star-array',
    'team',
    'timeline',
  ]

  htmlFiles.forEach(htmlFile => {
    // files
    const INSERT_FILE = './server/html/navbar.html'
    const SOURCE_FILE = `./${htmlFile}.html`

    // read files
    const html = fs.readFileSync(SOURCE_FILE, 'utf8')
    const navbar = fs
      .readFileSync(INSERT_FILE, 'utf8')
      .trim()

    // load html
    const $ = cheerio.load(html, { xmlMode: false })

    // replace navbar
    $('lom-navbar nn-caja').replaceWith(navbar)

    // save file
    fs.writeFileSync(SOURCE_FILE, $.html())
  })

  console.log('✔ Navbar replaced')
}
