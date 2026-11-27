import "./nano/index.js";
import "./components/panel-navigation.js";
import "./components/cube-panel.js";
import "./components/cube-view.js";
import "./components/icons-panel.js";
import "./components/icons-view.js";
import "./components/colors-view.js";
import "./components/ruler-view.js";
import { store } from "./store.js";
import { routes, onRouteChange } from "./router.js";

/** Application shell (the former app.vue). */
class App extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <main>
        <nn-row class="mr-app">
          <pk-panel-navigation></pk-panel-navigation>
          <nn-column class="panel" nn-size="0"></nn-column>
          <nn-column nn-size="35" class="mr-toggle-panel">
            <nn-btn class="panel-ctrl" title="Toggle panel button"
              nn-glyph="arrow-angle" nn-color="charcoal"></nn-btn>
          </nn-column>
          <nn-column class="mr-workarea"></nn-column>
        </nn-row>
      </main>
    `;

    const find = (selector) => this.querySelector(selector);
    const main = find("main");
    const panel = find(".panel");
    const toggle = find(".mr-toggle-panel");
    const toggleBtn = find(".panel-ctrl");
    const workarea = find(".mr-workarea");
    let route;

    const layout = () => {
      if (!route) return;
      const { theme, panel: open, fullscreen } = store.state;
      const hasPanel = Boolean(routes[route].panel) && !fullscreen;

      main.className = `section-${route} ${theme ? "nn-light" : "nn-dark"}`;
      main.classList.toggle("mr-fullscreen", fullscreen);

      panel.hidden = toggle.hidden = !hasPanel;
      panel.setAttribute("nn-size", open ? "300" : "0");
      toggleBtn.setAttribute("nn-direction", open ? "left" : "right");

      let size = "100%-50";
      if (hasPanel) size = open ? "100%-300-50-35" : "100%-50-35";
      workarea.setAttribute("nn-size", size);
    };

    toggleBtn.addEventListener("click", () => store.toggle("panel"));
    store.subscribe(layout);

    onRouteChange((name) => {
      route = name;
      const { view, panel: panelView } = routes[name];
      panel.replaceChildren(...(panelView ? [document.createElement(panelView)] : []));
      layout();
      workarea.replaceChildren(document.createElement(view));
    });
  }
}

customElements.define("pk-app", App);
