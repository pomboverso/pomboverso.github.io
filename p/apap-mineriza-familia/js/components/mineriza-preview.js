import { asset, BACKGROUNDS, pad } from "../config.js";
import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "preview");

const indexes = Array.from({ length: BACKGROUNDS }, (_, index) => index + 1);

class MinerizaPreview extends Screen {
	static styles = styles;

	#selected = 1;

	constructor() {
		super();

		this.shadowRoot.addEventListener("click", (event) => {
			const step = event.target.closest("[data-step]");
			const thumb = event.target.closest("[data-background]");

			if (step) {
				this.#select(this.#selected + Number(step.dataset.step));
			} else if (thumb) {
				this.#select(Number(thumb.dataset.background));
			}
		});
	}

	render() {
		this.shadowRoot.innerHTML = compact(`
			<p>Selecciona el fondo de tu preferencia</p>
			<div class="desktop">
				<button class="icon triangle-left" data-step="-1" aria-label="fondo anterior"></button>
				<div class="compos">
					<img class="base" alt="">
				</div>
				<button class="icon triangle-right" data-step="1" aria-label="fondo siguiente"></button>
			</div>
			<div class="mobile">
				${indexes
					.map(
						(index) =>
							`<button class="pick" data-background="${index}" aria-label="fondo ${index}"><img src="${asset(`background/bk_${pad(index)}_pv.png`)}" alt=""></button>`
					)
					.join("")}
			</div>
			<div class="controls">
				<button class="btn" data-goto="choose">Volver</button>
				<button class="btn" data-goto="share">Finalizar</button>
			</div>
		`);

		this.#paint();
	}

	#select(index) {
		this.#selected = index > BACKGROUNDS ? 1 : index < 1 ? BACKGROUNDS : index;
		this.#paint();
	}

	#paint() {
		const root = this.shadowRoot;

		root.querySelector(".base").src = asset(`background/bk_${pad(this.#selected)}.png`);

		for (const thumb of root.querySelectorAll("[data-background]")) {
			thumb.setAttribute("aria-pressed", String(Number(thumb.dataset.background) === this.#selected));
		}
	}
}

customElements.define("mineriza-preview", MinerizaPreview);
