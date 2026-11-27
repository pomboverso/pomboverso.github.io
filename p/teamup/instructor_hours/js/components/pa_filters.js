/* "Filter Results By": a provider dropdown and a period dropdown. */
import { PROVIDERS } from "../data/providers.js";
import { report } from "../report.js";
import { esc, icon } from "../dom.js";

const MODES = { last: "Is In The Last", between: "Is Between", all: "All Time" };
const UNITS = { days: "Days", weeks: "Weeks", months: "Months" };

/* yyyy-mm-dd in local time, a number of days before today */
const isoDate = (ago = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - ago);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, "0")).join("-");
};

class Filters extends HTMLElement {
  connectedCallback() {
    const names = [...PROVIDERS].sort((a, b) => a.name.localeCompare(b.name));
    this.innerHTML = `
      <div class="filters">
        <h2>Filter Results By</h2>

        <div class="filter">
          <span class="filter-label" id="provider-label">Provider</span>
          <div class="dropdown" data-name="provider">
            <button type="button" class="dropdown-toggle is-empty" aria-expanded="false" aria-describedby="provider-label">
              <span class="value">Select Option</span> ${icon("down", "chevron")}
            </button>
            <div class="dropdown-menu" hidden>
              <input type="search" class="search" placeholder="Search..." aria-label="Search providers">
              <ul>
                <li><button type="button" data-provider="" aria-pressed="true">All providers</button></li>
                ${names.map((p) => `<li><button type="button" data-provider="${p.id}" aria-pressed="false">${esc(p.name)}</button></li>`).join("")}
              </ul>
              <p class="no-match" hidden>No providers found</p>
            </div>
          </div>
        </div>

        <div class="filter">
          <span class="filter-label" id="period-label">See Results From</span>
          <div class="dropdown" data-name="period">
            <button type="button" class="dropdown-toggle" aria-expanded="false" aria-describedby="period-label">
              ${icon("calendar")} <span class="value"></span> ${icon("down", "chevron")}
            </button>
            <form class="dropdown-menu period" hidden novalidate>
              <fieldset>
                <legend class="sr-only">Period</legend>
                ${Object.entries(MODES).map(([key, text]) => `
                  <label class="radio"><input type="radio" name="mode" value="${key}"> ${text}</label>`).join("")}
              </fieldset>
              <div class="fields" data-for="last">
                <input type="number" name="amount" min="1" max="999" aria-label="Amount">
                <select name="unit" aria-label="Unit">${Object.entries(UNITS).map(([k, t]) => `<option value="${k}">${t}</option>`).join("")}</select>
              </div>
              <div class="fields" data-for="between">
                <label>From <input type="date" name="from"></label>
                <label>To <input type="date" name="to"></label>
              </div>
              <p class="error" role="alert"></p>
              <button type="submit" class="button primary">Apply</button>
            </form>
          </div>
          <p class="period-summary" aria-live="polite"></p>
        </div>
      </div>
    `;
    this.form = this.querySelector("form");

    this.addEventListener("click", (event) => {
      const toggle = event.target.closest(".dropdown-toggle");
      if (toggle) this.toggle(toggle.parentElement);
      const option = event.target.closest("[data-provider]");
      if (option) this.pickProvider(option);
    });
    this.querySelector(".search").addEventListener("input", (event) => this.search(event.target.value));
    this.form.addEventListener("change", () => this.showFields());
    this.form.addEventListener("submit", (event) => { event.preventDefault(); this.apply(); });
    this.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const open = event.target.closest(".dropdown");
      this.close();
      open?.querySelector(".dropdown-toggle").focus();
    });
    document.addEventListener("pointerdown", (event) => {
      if (!event.target.closest(".dropdown")) this.close();
    });
    this.addEventListener("focusout", (event) => {
      const dropdown = event.target.closest(".dropdown");
      if (dropdown && event.relatedTarget && !dropdown.contains(event.relatedTarget)) this.close();
    });
    this.summary();
  }

  toggle(dropdown) {
    const menu = dropdown.querySelector(".dropdown-menu");
    const open = menu.hidden;
    this.close();
    if (!open) return;
    menu.hidden = false;
    dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
    if (dropdown.dataset.name === "provider") {
      const search = menu.querySelector(".search");
      search.value = "";
      this.search("");
      search.focus();
    } else {
      this.fill();
      menu.querySelector("input:checked").focus();
    }
  }

  close() {
    this.querySelectorAll(".dropdown-menu").forEach((menu) => { menu.hidden = true; });
    this.querySelectorAll(".dropdown-toggle").forEach((button) => button.setAttribute("aria-expanded", "false"));
  }

  search(text) {
    const wanted = text.trim().toLowerCase();
    let found = 0;
    for (const button of this.querySelectorAll("[data-provider]")) {
      const match = !wanted || (button.dataset.provider && button.textContent.toLowerCase().includes(wanted));
      button.parentElement.hidden = !match;
      if (match) found += 1;
    }
    this.querySelector(".no-match").hidden = found > 0;
  }

  pickProvider(option) {
    const dropdown = option.closest(".dropdown");
    const id = option.dataset.provider;
    this.querySelectorAll("[data-provider]").forEach((b) => b.setAttribute("aria-pressed", b === option));
    dropdown.querySelector(".value").textContent = id ? option.textContent : "Select Option";
    dropdown.querySelector(".dropdown-toggle").classList.toggle("is-empty", !id);
    this.close();
    dropdown.querySelector(".dropdown-toggle").focus();
    report.setProvider(id);
  }

  /* Copy the applied period into the form. */
  fill() {
    const { mode, amount, unit, from, to } = report.state.period;
    const f = this.form.elements;
    f.mode.value = mode;
    f.amount.value = amount;
    f.unit.value = unit;
    f.from.value = from || isoDate(30);
    f.to.value = to || isoDate();
    this.form.querySelector(".error").textContent = "";
    this.showFields();
  }

  showFields() {
    const mode = this.form.elements.mode.value;
    this.form.querySelectorAll(".fields").forEach((box) => { box.hidden = box.dataset.for !== mode; });
  }

  apply() {
    const f = this.form.elements;
    const mode = f.mode.value;
    const error = this.form.querySelector(".error");
    const period = { mode };
    if (mode === "last") {
      const amount = Number(f.amount.value);
      if (!Number.isInteger(amount) || amount < 1 || amount > 999) { error.textContent = "Enter a whole number from 1 to 999."; return; }
      Object.assign(period, { amount, unit: f.unit.value });
    }
    if (mode === "between") {
      if (!f.from.value || !f.to.value) { error.textContent = "Choose both dates."; return; }
      if (f.from.value > f.to.value) { error.textContent = "The first date must be before the second."; return; }
      Object.assign(period, { from: f.from.value, to: f.to.value });
    }
    report.setPeriod(period);
    this.summary();
    this.close();
    this.querySelector('[data-name="period"] .dropdown-toggle').focus();
  }

  summary() {
    const { mode, amount, unit, from, to } = report.state.period;
    this.querySelector('[data-name="period"] .value').textContent = MODES[mode];
    const date = (v) => new Date(`${v}T00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    this.querySelector(".period-summary").textContent =
      mode === "last" ? `${amount} ${amount === 1 ? UNITS[unit].slice(0, -1) : UNITS[unit]}`
      : mode === "between" ? `${date(from)} to ${date(to)}` : "";
  }
}

customElements.define("pa-filters", Filters);
