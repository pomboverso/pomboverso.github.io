/* Filtering, totals, sorting and CSV. Pure functions plus the report state (reset on reload). */
import { PROVIDERS } from "./data/providers.js";
import { COLUMNS } from "./data/texts.js";
import { PAGE_SIZE, DEFAULT_LAST, CURRENCY, LOCALE, CSV_NAME } from "./config.js";

const UNIT_DAYS = { days: 1, weeks: 7, months: 30 };
const DAY = 86400000;

const state = {
  provider: "",
  period: { mode: "last", ...DEFAULT_LAST, from: "", to: "" },
  sort: { key: "", direction: "asc" },
  page: 1,
};

const bus = new EventTarget();
const emit = () => bus.dispatchEvent(new Event("change"));

/* A date input value (yyyy-mm-dd) as "days before today". */
const daysAgo = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  const now = new Date();
  return Math.round((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(y, m - 1, d)) / DAY);
};

const inPeriod = () => {
  const { mode, amount, unit, from, to } = state.period;
  if (mode === "all") return () => true;
  if (mode === "last") return ([ago]) => ago < amount * UNIT_DAYS[unit];
  const oldest = daysAgo(from);
  const newest = daysAgo(to);
  return ([ago]) => ago <= oldest && ago >= newest;
};

const round = (n) => Math.round(n * 100) / 100;

const allRows = () => {
  const keep = inPeriod();
  const rows = PROVIDERS
    .filter((p) => !state.provider || String(p.id) === state.provider)
    .map((p) => {
      const sessions = p.sessions.filter(keep);
      return {
        id: p.id,
        name: p.name,
        events: sessions.length,
        hours: round(sessions.reduce((sum, s) => sum + s[1], 0)),
        earnings: round(sessions.reduce((sum, s) => sum + s[2], 0)),
      };
    });
  const { key, direction } = state.sort;
  if (key) rows.sort((a, b) => (a[key] - b[key]) * (direction === "asc" ? 1 : -1));
  return rows;
};

export const money = (value) => new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY }).format(value);
export const hoursText = (value) => (Number.isInteger(value) ? String(value) : value.toFixed(2));

export const report = {
  get state() { return state; },

  /* The rows of the current page, with the numbers for "Showing x to y of z". */
  view() {
    const rows = allRows();
    const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * PAGE_SIZE;
    const visible = rows.slice(start, start + PAGE_SIZE);
    return { rows: visible, total: rows.length, pages, page: state.page,
      first: rows.length ? start + 1 : 0, last: start + visible.length };
  },

  subscribe(listener) { bus.addEventListener("change", listener); listener(); },
  setProvider(id) { state.provider = id; state.page = 1; emit(); },
  setPeriod(period) { Object.assign(state.period, period); state.page = 1; emit(); },
  setPage(page) { state.page = page; emit(); },

  /* Click cycles: descending, ascending, original order. */
  toggleSort(key) {
    const { sort } = state;
    if (sort.key !== key) state.sort = { key, direction: "desc" };
    else if (sort.direction === "desc") state.sort = { key, direction: "asc" };
    else state.sort = { key: "", direction: "asc" };
    state.page = 1;
    emit();
  },

  /* The CSV holds every filtered row, not only the current page. It is built in the browser. */
  download() {
    const quote = (value) => `"${String(value).replace(/"/g, '""')}"`;
    const lines = [COLUMNS.map((c) => quote(c.label)).join(",")]
      .concat(allRows().map((row) => COLUMNS.map((c) => quote(row[c.key])).join(",")));
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([`﻿${lines.join("\r\n")}`], { type: "text/csv" }));
    link.download = CSV_NAME;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  },
};
