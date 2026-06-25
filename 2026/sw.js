const CACHE = 'pv-v1'

const PRECACHE = [
  '/',
  './index.html',
  './css/2026.css',
  './js/2026.js',
  './js/_helpers.js',
  './js/arr_projects.js',
  './js/cmp_list.js',
  './js/cmp_search.js',
  './js/obj_category.js',
  './js/obj_license.js',
  './js/obj_org.js',
  './js/obj_skill.js',
  './js/parser.js',
  './fonts/jersey25_regular.ttf',
  './fonts/pomboverso.ttf',
  './fonts/pomboverso.otf',
  './fonts/pomboverso.woff',
  './fonts/pomboverso.woff2',
  './img/icon_192x192.png',
  './img/icon_512x512.png',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached ?? fetch(event.request))
  )
})
