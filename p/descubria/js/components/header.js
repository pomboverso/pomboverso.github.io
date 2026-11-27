const MENU = [
  ["inicio", "Inicio"],
  ["atracciones", "Atracciones"],
  ["patrocinadores", "Patrocinadores"],
  ["contactanos", "Contáctanos"],
];

/** Red top bar with the logo and the menu. */
class Header extends HTMLElement {
  connectedCallback() {
    const items = MENU.map(
      ([page, caption]) => `<div data-go="${page}" role="link" tabindex="0">${caption}</div>`
    ).join("");

    this.innerHTML = `
      <div id="header">
        <div class="fix">
          <div><div id="logo" data-go="inicio" role="link" tabindex="0" aria-label="Inicio"></div></div>
          <div id="menu">${items}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("ds-header", Header);
