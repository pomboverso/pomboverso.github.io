# Dr Logic: static site

Standalone, dependency-free port of the Dr Logic site (plain HTML + modern CSS).
No build step: open `index.html` or serve the folder with any static host.

```
index.html  about-us.html  portfolio.html  contact-us.html  404.html
css/style.css     entry point, @imports the files below
css/base/         custom properties, typography, loader, keyframes
css/main/         layout: main, navbar, footer
css/sections/     home, contact, about, testimonials (portfolio)
css/404.css       standalone 404 page
js/main.js        site behaviour (jQuery)
vendor/           Bootstrap 3.3.7, jQuery 2.2.4, Font Awesome 4.7, normalize 7, mCustomScrollbar 3.1.5
img/  documents/  assets (only the ones the pages use)
```

## Plugging it into a portfolio
- All paths are relative, so the folder can live anywhere (`/projects/drlogic/`, a subdomain, or in an `<iframe>`).
- Each page declares itself with `<body data-page="home|about-us|portfolio|contact-us">`; the JS uses it for nav colours / active link instead of reading the URL.
- Only external request: Google Fonts (Montserrat). Download it and swap the `<link>` if you need it fully offline.
- CSS is global (it styles `body`, `h1`, `section`, `.btn`…), so use an iframe or a dedicated page rather than injecting it into another page's DOM.

## Notes
- Contact map is an OpenStreetMap embed with the original pulsing logo marker (replaces Google Maps + its API key).
- Template placeholders kept as-is: "Services" dropdown, "Find out more" and "Reviews" point to `#`.

## CSS
Native nesting, custom properties, `hsl(from …)` relative colours (replacing Sass `darken`/`lighten`),
`color-mix()`, range media queries (`width >= 768px`) and individual transform properties.
Needs a current browser (Chrome/Edge 119+, Safari 16.4+, Firefox 128+).
Vendored libraries in `vendor/` keep their own licence headers.
