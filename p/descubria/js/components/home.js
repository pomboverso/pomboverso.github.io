import { hotspots, attractions } from "../data/attractions.js";
import { currentTheme } from "../sky.js";

// Parallax of each cloud layer: [id, base top, x factor, y factor]
const LAYERS = [
  ["sky_01", 120, 0.02, 0.03],
  ["sky_02", 120, 0.02, -0.01],
  ["sky_03", 120, -0.03, 0.02],
  ["sky_04", 150, -0.01, 0.02],
  ["sky_05", 200, -0.02, -0.01],
];

/** The city scene: sky, clouds, clickable buildings and the grass. */
class Home extends HTMLElement {
  connectedCallback() {
    const spot = (id, content = "") => {
      const page = hotspots[id];
      const title = attractions.find((item) => item.id === page)?.title ?? "Cumpleaños";
      return `<div id="${id}" data-go="${page}" role="link" tabindex="0" aria-label="${title}">${content}</div>`;
    };
    const spots = Object.keys(hotspots)
      .sort()
      .map((id) => spot(id, id === "ar02" ? '<div id="box05"></div><div id="box06"></div>' : ""))
      .join("");

    this.innerHTML = `
      <a href="#bot" class="inicio" aria-label="Bajar"><img id="arrow" src="img/ar.png" alt=""></a>
      <div class="fix">
        <div class="fixR inicio">
          ${spots}
          <div id="sky_01"></div>
          <div id="sky_05"></div>
          <div id="sky_02"></div>
          <div id="sky_03"></div>
          <div id="sky_04"></div>
          <div id="ciudad"></div>
        </div>
      </div>
      <div id="grama" class="inicio"><div id="bot"></div></div>
    `;

    // The arrow scrolls down to the street.
    this.querySelector("a.inicio").addEventListener("click", (event) => {
      event.preventDefault();
      this.querySelector("#bot").scrollIntoView({ behavior: "smooth" });
    });

    currentTheme().apply(document.body);

    // With a mouse the clouds follow the pointer; touch screens animate them
    // instead (see css/sky.css).
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const layers = LAYERS.map(([id, ...settings]) => [this.querySelector(`#${id}`), ...settings]);
      const move = (x, y) => {
        for (const [layer, top, fx, fy] of layers) {
          layer.style.left = `${x * fx}px`;
          layer.style.top = `${top + y * fy}px`;
        }
      };
      addEventListener("mousemove", (event) => move(event.pageX, event.pageY));
      move(0, 0);
    }
  }
}

customElements.define("ds-home", Home);
