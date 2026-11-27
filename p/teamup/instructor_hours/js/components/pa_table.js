/* Result count, sortable table and pagination. */
import "./pa_pagination.js";
import { COLUMNS } from "../data/texts.js";
import { report, money, hoursText } from "../report.js";
import { esc, icon } from "../dom.js";

const initials = (name) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

class Table extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <p class="showing" role="status"></p>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Report table">
        <table>
          <thead><tr>
            ${COLUMNS.map((c) => `
              <th scope="col" data-column="${c.key}">
                ${c.sortable
                  ? `<button type="button" data-sort="${c.key}">${c.label} <span class="sort-icon"></span></button>`
                  : c.label}
              </th>`).join("")}
          </tr></thead>
          <tbody></tbody>
        </table>
      </div>
      <div class="table-footer">
        <p class="showing"></p>
        <pa-pagination></pa-pagination>
      </div>
    `;
    this.addEventListener("click", (event) => {
      const sort = event.target.closest("[data-sort]");
      if (sort) report.toggleSort(sort.dataset.sort);
    });
    report.subscribe(() => this.update());
  }

  update() {
    const view = report.view();
    for (const line of this.querySelectorAll(".showing")) {
      line.innerHTML = `Showing <strong>${view.first}</strong> to <strong>${view.last}</strong> of <strong>${view.total}</strong>`;
    }
    this.querySelector("tbody").innerHTML = view.rows.map((row) => `
      <tr>
        <th scope="row">
          <span class="avatar" aria-hidden="true">${esc(initials(row.name))}</span>
          <button type="button" class="name" data-demo="The provider profile">${esc(row.name)}</button>
        </th>
        <td>${row.events}</td>
        <td>${hoursText(row.hours)}</td>
        <td>${money(row.earnings)}</td>
      </tr>`).join("") || `<tr><td colspan="${COLUMNS.length}" class="empty">No results</td></tr>`;

    const { key, direction } = report.state.sort;
    for (const button of this.querySelectorAll("[data-sort]")) {
      const active = button.dataset.sort === key;
      button.querySelector(".sort-icon").innerHTML = icon(!active ? "sort" : direction === "asc" ? "up" : "down");
      const head = button.closest("th");
      if (active) head.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");
      else head.removeAttribute("aria-sort");
    }
    this.querySelector("pa-pagination").show(view.page, view.pages);
  }
}

customElements.define("pa-table", Table);
