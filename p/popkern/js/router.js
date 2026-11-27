// Hash routing, so it works on GitHub Pages and inside any sub-folder.
// The order here is the order of the icons in the sidebar.
export const routes = {
  "popkern-icons": {
    title: "Icons", icon: "star",
    view: "pk-icons-view", panel: "pk-icons-panel",
  },
  "popkern-colors": { title: "Colors", icon: "paint-brush", view: "pk-colors-view" },
  "popkern-cube": {
    title: "Color Cube", icon: "cube",
    view: "pk-cube-view", panel: "pk-cube-panel",
  },
  "popkern-ruler": { title: "Ruler", icon: "crop", view: "pk-ruler-view" },
};

const DEFAULT_ROUTE = "popkern-icons";

export const currentRoute = () => {
  const name = location.hash.replace(/^#\/?/, "");
  return Object.hasOwn(routes, name) ? name : DEFAULT_ROUTE;
};

export const onRouteChange = (listener) => {
  addEventListener("hashchange", () => listener(currentRoute()));
  listener(currentRoute());
};
