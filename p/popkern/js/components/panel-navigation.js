import { store } from "../store.js";
import { routes, onRouteChange } from "../router.js";

/**
 * Icon sidebar: the whole navigation of the app.
 * Clicking the icon of the current section opens or closes its side panel.
 */
class PanelNavigation extends HTMLElement {
  connectedCallback() {
    const links = Object.entries(routes)
      .map(([name, { title, icon }]) => `
        <nn-btn data-route="${name}" nn-tag="a" nn-href="#/${name}" nn-mode="nav"
          nn-color="shamrock" nn-glyph="${icon}" title="${title}"></nn-btn>
      `)
      .join("");

    this.innerHTML = `
      <nn-column nn-size="50" class="mr-primary-navbar">
        <nn-scroll-area nn-color="royal-purple" nn-no-horizontal>
          <nn-row>
            <nn-column nn-size="100%">
              <nav>${links}</nav>
              <hr>
              <nn-btn data-action="theme" nn-mode="nav" nn-color="gold-tips"
                title="Toggle theme"></nn-btn>
              <nn-btn data-action="fullscreen" nn-mode="nav" nn-color="gold-tips"
                title="Toggle Fullscreen"></nn-btn>
            </nn-column>
          </nn-row>
        </nn-scroll-area>
      </nn-column>
    `;

    let current;

    this.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action], [data-route]");
      if (!button) return;
      const { action, route } = button.dataset;
      if (action) store.toggle(action);
      else if (route === current && routes[route].panel) store.toggle("panel");
    });

    onRouteChange((name) => {
      current = name;
      this.querySelectorAll("[data-route]").forEach((button) => {
        const active = button.dataset.route === name;
        button.setAttribute("nn-active", active);
        button.querySelector("a").toggleAttribute("aria-current", active);
      });
    });

    const theme = this.querySelector('[data-action="theme"]');
    const fullscreen = this.querySelector('[data-action="fullscreen"]');

    this.unsubscribe = store.subscribe((state) => {
      theme.setAttribute("nn-glyph", state.theme ? "sun-o" : "moon-o");
      theme.setAttribute("nn-active", state.theme);
      fullscreen.setAttribute("nn-glyph", state.fullscreen ? "compress" : "expand");
      fullscreen.setAttribute("nn-active", state.fullscreen);
    });
  }

  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define("pk-panel-navigation", PanelNavigation);
