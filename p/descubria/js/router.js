// Hash routing ("#/faqs"), so it works on GitHub Pages and the back button works.
import { attractions } from "./data/attractions.js";

export const HOME = "inicio";

// Background color behind each page. null keeps the previous one.
export const pageColors = {
  [HOME]: null,
  atracciones: "#84D2F4",
  patrocinadores: "#77CAB9",
  contactanos: null,
  faqs: "#ffb96c",
  ...Object.fromEntries(attractions.map(({ id, color }) => [id, color])),
};

export const currentPage = () => {
  const page = location.hash.replace(/^#\/?/, "");
  return Object.hasOwn(pageColors, page) ? page : HOME;
};

export const goTo = (page) => {
  location.hash = page === HOME ? "/" : `/${page}`;
};

export const onPageChange = (listener) => {
  addEventListener("hashchange", () => listener(currentPage()));
  listener(currentPage());
};
