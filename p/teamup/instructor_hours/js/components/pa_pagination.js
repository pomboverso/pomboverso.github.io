/* Page buttons. Hidden when everything fits on one page. */
import { report } from "../report.js";
import { icon } from "../dom.js";

/* First, last and the neighbours of the current page; "…" for the gaps. */
const pageList = (page, pages) => {
  const wanted = [...new Set([1, page - 1, page, page + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  return wanted.flatMap((n, i) => (i && n - wanted[i - 1] > 1 ? ["…", n] : [n]));
};

class Pagination extends HTMLElement {
  connectedCallback() {
    if (this.ready) return;
    this.ready = true;
    this.addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (!button) return;
      const label = button.getAttribute("aria-label");
      report.setPage(Number(button.dataset.page));
      // keep keyboard focus on the same control after the re-render
      const again = this.querySelector(`[aria-label="${label}"]:not(:disabled)`) ?? this.querySelector('[aria-current="page"]');
      again?.focus({ preventScroll: true });
    });
  }

  show(page, pages) {
    this.connectedCallback();
    this.hidden = pages <= 1;
    if (this.hidden) { this.innerHTML = ""; return; }
    const arrow = (to, label, name) =>
      `<button type="button" data-page="${to}" aria-label="${label}"${to < 1 || to > pages ? " disabled" : ""}>${icon(name)}</button>`;
    this.innerHTML = `
      <nav class="pagination" aria-label="Pagination">
        ${arrow(page - 1, "Previous page", "left")}
        ${pageList(page, pages).map((n) => n === "…"
          ? `<span>…</span>`
          : `<button type="button" data-page="${n}" aria-label="Page ${n}"${n === page ? ` aria-current="page"` : ""}>${n}</button>`).join("")}
        ${arrow(page + 1, "Next page", "right")}
      </nav>`;
  }
}

customElements.define("pa-pagination", Pagination);
