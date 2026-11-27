/* Breadcrumb, title and CSV download. */
import { TITLE, CRUMBS, HELP } from "../data/texts.js";
import { report } from "../report.js";
import { esc, icon } from "../dom.js";

class PageHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card page-header">
        <div>
          <ol class="breadcrumbs" aria-label="Breadcrumb">
            <li><button type="button" data-demo="The ${esc(CRUMBS[0])} list">${esc(CRUMBS[0])}</button></li>
            <li aria-current="page">${icon("right")}<span>${esc(CRUMBS[1])}</span></li>
          </ol>
          <div class="title-row">
            <h1>${esc(TITLE)}</h1>
            <button type="button" class="help" aria-label="About this report" aria-expanded="false">${icon("help")}</button>
          </div>
          <p class="help-text" hidden>${esc(HELP)}</p>
        </div>
        <button type="button" class="button download">${icon("csv")} Download</button>
      </section>
    `;
    const help = this.querySelector(".help");
    help.addEventListener("click", () => {
      const text = this.querySelector(".help-text");
      text.hidden = !text.hidden;
      help.setAttribute("aria-expanded", !text.hidden);
    });
    this.querySelector(".download").addEventListener("click", () => report.download());
  }
}

customElements.define("pa-page-header", PageHeader);
