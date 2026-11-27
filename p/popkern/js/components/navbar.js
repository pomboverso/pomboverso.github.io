import { routes, onRouteChange } from "../router.js";

/** Top bar with the section links. */
class Navbar extends HTMLElement {
  connectedCallback() {
    const links = Object.entries(routes)
      .map(([name, { caption }]) => `<li><a href="#/${name}">${caption}</a></li>`)
      .join("");

    this.innerHTML = `
      <nn-container>
        <nav>
          <p>Popkern</p>
          <nn-btn class="menu-toggle" nn-mode="ghost" title="Toggle menu"></nn-btn>
          <ul>${links}</ul>
        </nav>
      </nn-container>
    `;

    const toggle = this.querySelector(".menu-toggle");
    const setMenu = (open) => {
      toggle.classList.toggle("open-menu", open);
      toggle.setAttribute("nn-glyph", open ? "times" : "bars");
      toggle.setAttribute("nn-color", open ? "persian-red" : "shamrock");
    };

    toggle.addEventListener("click", () =>
      setMenu(!toggle.classList.contains("open-menu"))
    );
    this.querySelector("ul").addEventListener("click", () => setMenu(false));
    setMenu(false);

    onRouteChange((route) => {
      this.querySelectorAll("a").forEach((link) => {
        link.classList.toggle("router-link-active", link.hash === `#/${route}`);
      });
    });
  }
}

customElements.define("pk-navbar", Navbar);
