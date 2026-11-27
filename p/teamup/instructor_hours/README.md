# provider_app (static demo)

A provider report built with plain web components and CSS. No build step, no backend.
All data is made up. Reloading resets the filters.

Serve the folder over a web server (ES modules do not load from `file://`):

    python3 -m http.server

Then open http://localhost:8000/. On GitHub Pages, upload the folder as it is.

- Rows per page and currency: `js/config.js`
- Sample data: `js/data/providers.js`
