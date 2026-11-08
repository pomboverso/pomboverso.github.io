# Mineriza a tu familia

Standalone port of the APAP "Mineriza a tu familia" character builder: native web components
(Shadow DOM) + modern CSS. No build step, no framework, no jQuery.

ES modules and `fetch` are used, so serve the folder over HTTP (`npx serve`, `python3 -m http.server`,
any static host). Opening `index.html` from `file://` will not work.

```
index.html              standalone page (loads Montserrat, page.css and js/main.js)
js/main.js              entry point
js/config.js            character catalogue (option counts), labels, asset helper
js/components/
  mineriza-app.js       shell: loader, header, routing between screens
  mineriza-home.js      intro
  mineriza-form.js      registration form
  mineriza-choose.js    pick male / female / pet
  mineriza-editor.js    avatar editor (one element per gender + age, plus pet)
  mineriza-preview.js   background picker
  mineriza-share.js     final screen
js/lib/                 Screen base class, stylesheet loader, icon font loader
css/                    one stylesheet per component + shared.css; page.css is for the standalone page only
img/  fonts/            assets used by the app
```

## Plugging it into a portfolio
```html
<script type="module" src="path/to/apap/js/main.js"></script>
<mineriza-app></mineriza-app>
```
Everything is inside Shadow DOM, so no styles leak in or out. All asset paths are resolved from the
module location, so the folder can live anywhere. Montserrat is loaded by the host page (see `index.html`);
without it the app falls back to Helvetica.

### Theming and sizing
Override these custom properties on the element from the outside:

```css
mineriza-app {
  --stage-height: 640px;
  --yellow: #f4d242;
  --light-blue: #41afd7;
  --dark-blue: #1f67ac;
  --button-text: #0168b3;
}
```
Responsive behaviour uses container queries on the element itself, so it adapts to the width it is
given, not to the viewport.

## Browser support
Current evergreen browsers: native CSS nesting (Chrome/Edge 120+, Safari 17.2+, Firefox 117+),
container queries, constructable stylesheets, `100svh`.

## Known unfinished bits carried over from the original
- "Agregar" returns to the selection screen but does not add the character to the preview.
- "Comparte" and "Descarga" on the last screen do nothing.
- The registration fields are not validated or stored.
