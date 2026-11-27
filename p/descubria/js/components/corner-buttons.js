import { HOME, onPageChange } from "../router.js";

const SOCIAL = [
  ["facebook", "https://www.facebook.com/descubria", "SM-08"],
  ["twitter", "https://twitter.com/Descubria", "SM-09"],
  ["instagram", "https://instagram.com/descubriard", "SM-12"],
  ["youtube", "https://www.youtube.com/user/descubriard/", "SM-11"],
];

/** Social links, the FAQ ribbon and the "back to attractions" button. */
class CornerButtons extends HTMLElement {
  connectedCallback() {
    const links = SOCIAL.map(([name, url, image]) => `
      <a href="${url}" target="_blank" rel="noopener">
        <img width="24" src="img/${image}.png" alt="${name}"></a><br>
    `).join("");

    this.innerHTML = `
      <div id="bright">${links}</div>
      <div id="faq" data-go="faqs" role="link" tabindex="0" aria-label="Preguntas frecuentes"></div>
      <div id="go_home" data-go="atracciones" role="link" tabindex="0" aria-label="Volver a atracciones"></div>
    `;

    const back = this.querySelector("#go_home");
    let show = false;

    // The back button appears after choosing from the attraction grid and
    // disappears when going home, to the grid or to the FAQs.
    document.addEventListener(
      "click",
      (event) => {
        if (event.target.closest(".lnk")) show = true;
      },
      true
    );

    onPageChange((page) => {
      if ([HOME, "atracciones", "faqs"].includes(page)) show = false;
      back.classList.toggle("is-visible", show);
    });
  }
}

customElements.define("ds-corner-buttons", CornerButtons);
