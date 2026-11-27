export const PAGES = ["layout", "style"];

export const currentPage = () => {
  const page = location.hash.replace(/^#\/?/, "");
  return PAGES.includes(page) ? page : PAGES[0];
};

export const goTo = (page) => { location.hash = `/${page}`; };

export const onPageChange = (listener) => {
  addEventListener("hashchange", () => listener(currentPage()));
  listener(currentPage());
};
