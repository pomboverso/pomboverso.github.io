import org from "./obj_org.js"
import category from "./obj_category.js"
import skill from "./obj_skill.js"
import license from "./obj_license.js"

export default [
  {
    date: '2026-06-06',
    org: org.rama,
    name: 'Teyin',
    category: category.androidApp,
    // preview: 'img-preview.webp',
    tags: [skill.kotlin],
    description: [
      '[p](*Teyin* is a lightweight, privacy-first *File manager* designed for speed, and simplicity.)',
      '[p](Built entirely in native *Kotlin*, Teyin runs fully *on-device* and avoids tracking.)',
    ],
    link: {
      web: 'https://rama-io.github.io/teyin.html',
      github: 'https://github.com/rama-io/teyin',
      fdroid: 'https://f-droid.org/app/com.rama.teyin',
      obtanium:
        'https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/rama-io/teyin',
    },
    license: license.gplv3,
  },
  {
    date: '2026-04-25',
    org: org.rama,
    name: 'Tūī',
    category: category.androidApp,
    tags: [skill.kotlin],
    description: [
      '[p](*Tūī* is a minimal, privacy-first *local music player* that skips metadata entirely. What you see is exactly what you name, no hidden tags, no surprises.)',
      '[p](Built entirely in native *Kotlin*, Tūī runs fully *on-device*, avoids tracking, no internet access, and no external APIs.)',
    ],
    link: {
      web: 'https://rama-io.github.io/tui.html',
      github: 'https://github.com/rama-io/tui',
      fdroid: 'https://f-droid.org/app/com.rama.tui',
      obtanium:
        'https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/rama-io/tui',
    },
    license: license.gplv3,
  },
  {
    date: '2026-03-07',
    org: org.rama,
    name: 'Txori',
    category: category.androidApp,
    tags: [skill.kotlin],
    description: [
      '[p](*Txori* is a minimal, privacy-first *focus session app* designed to help you stay present and intentional with your time.)',
      '[p](Built entirely in native *Kotlin*, Txori runs fully *on-device*, avoids tracking, no internet access, and no external APIs.)',
    ],
    link: {
      web: 'https://rama-io.github.io/txori.html',
      github: 'https://github.com/rama-io/txori',
      fdroid: 'https://f-droid.org/app/com.rama.txori',
      obtanium:
        'https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/rama-io/txori',
    },
    license: license.gplv3,
  },
  {
    date: '2025-12-19',
    org: org.rama,
    name: 'Mako',
    category: category.androidApp,
    tags: [skill.kotlin],
    description: [
      '[p](*Mako* is a minimal, privacy-first *android launcher* designed for focus, speed, and simplicity.)',
      '[p](Built entirely in native *Kotlin*, Mako runs fully *on-device*, avoids tracking, and keeps distractions to a minimum by emphasizing clarity and intentional interaction.)',
    ],
    link: {
      web: 'https://rama-io.github.io/mako.html',
      github: 'https://github.com/rama-io/mako',
      fdroid: 'https://f-droid.org/app/com.rama.mako',
      obtanium:
        'https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/rama-io/mako',
    },
    license: license.gplv3,
  },
]
