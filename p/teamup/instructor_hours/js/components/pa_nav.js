import { NAV_LINKS, USER_NAME } from "../data/texts.js";
import { esc, icon } from "../dom.js";

class Nav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="topbar">
        <nav class="topbar-links" aria-label="Main">
          ${NAV_LINKS.map((text) => `
            <button type="button" data-demo="${esc(text)}">${esc(text)}${text.startsWith("Refer") ? icon("heart", "heart") : ""}</button>`).join("")}
        </nav>
        <button type="button" class="user" data-demo="The account menu">${esc(USER_NAME)} ${icon("down")}</button>
      </header>
    `;
  }
}

customElements.define("pa-nav", Nav);
