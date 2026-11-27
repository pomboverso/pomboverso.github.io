/* App shell. */
import "./components/pa_nav.js";
import "./components/pa_page-header.js";
import "./components/pa_filters.js";
import "./components/pa_table.js";
import "./components/pa_toast.js";
import { NOTE } from "./data/texts.js";
import { icon, toast } from "./dom.js";

class App extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <pa-nav></pa-nav>
      <main class="page">
        <pa-page-header></pa-page-header>
        <section class="card report">
          <div class="note" role="note">${icon("info", "note-icon")}<p>${NOTE}</p></div>
          <pa-filters></pa-filters>
          <pa-table></pa-table>
        </section>
      </main>
      <pa-toast></pa-toast>
    `;
    /* Links and menus that exist only for looks. */
    this.addEventListener("click", (event) => {
      const demo = event.target.closest("[data-demo]");
      if (demo) { event.preventDefault(); toast(`${demo.dataset.demo} is not part of this demo.`); }
    });
  }
}

customElements.define("pa-app", App);
