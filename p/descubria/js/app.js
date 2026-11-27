import "./components/header.js";
import "./components/corner-buttons.js";
import "./components/home.js";
import "./components/attraction-pages.js";
import "./components/attraction-grid.js";
import "./components/sponsors.js";
import "./components/faqs.js";
import "./components/contact.js";
import { HOME, pageColors, currentPage, goTo, onPageChange } from "./router.js";

/** Page shell: shows one section at a time. */
class App extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <ds-header></ds-header>
      <ds-corner-buttons></ds-corner-buttons>
      <div id="cov"><div id="pattern"></div></div>
      <ds-attraction-pages></ds-attraction-pages>
      <ds-about></ds-about>
      <ds-faqs></ds-faqs>
      <ds-attraction-grid></ds-attraction-grid>
      <ds-sponsors></ds-sponsors>
      <ds-contact></ds-contact>
      <ds-home></ds-home>
    `;

    // Anything with data-go="page" navigates (mouse and keyboard).
    this.addEventListener("click", (event) => {
      const link = event.target.closest("[data-go]");
      if (link) goTo(link.dataset.go);
    });
    this.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target.matches("[data-go]")) {
        goTo(event.target.dataset.go);
      }
    });
    addEventListener("keyup", (event) => {
      if (event.key === "Escape" && currentPage() !== HOME) goTo(HOME);
    });

    const cover = this.querySelector("#cov");
    cover.style.backgroundColor = "#8BC5EB";

    onPageChange((page) => {
      document.body.dataset.page = page;
      cover.classList.toggle("is-visible", page !== HOME);
      if (pageColors[page]) cover.style.backgroundColor = pageColors[page];
      this.querySelectorAll(".modulo").forEach((module) =>
        module.classList.toggle("is-visible", module.id === page)
      );
      scrollTo(0, 0);
    });
  }
}

customElements.define("ds-app", App);

// Slide the loading screen away once images and fonts are ready.
const reveal = () => {
  const loading = document.getElementById("cubierta");
  loading.classList.add("is-gone");
  loading.addEventListener("transitionend", () => loading.remove(), { once: true });
};
if (document.readyState === "complete") reveal();
else addEventListener("load", reveal, { once: true });
