import { AGE_LABELS, AGES, asset, CHARACTERS, PART_LABELS, PARTS, SKINS, pad } from "../config.js";
import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "editor");

const LAYERS = ["hair", "eyes", "nose", "mouth", "skin", "tool"];

class MinerizaEditor extends Screen {
	static styles = styles;
	static lazy = true;

	#state = {};
	#tab = "skin";

	constructor() {
		super();

		this.shadowRoot.addEventListener("click", (event) => {
			const option = event.target.closest(".pick");
			const control = event.target.closest(".controls [data-part]");
			const age = event.target.closest("[data-age]");

			if (option) {
				this.#state[option.dataset.part] = Number(option.dataset.index);
				this.#paint();
			} else if (control) {
				this.#tab = control.dataset.part;
				this.#paint();
			} else if (age) {
				this.go("editor", { gender: this.gender, age: age.dataset.age });
			}
		});
	}

	get gender() {
		return this.getAttribute("gender");
	}

	get age() {
		return this.getAttribute("age");
	}

	get pet() {
		return this.gender === "pet";
	}

	get counts() {
		return this.pet ? { skin: SKINS } : { skin: SKINS, ...CHARACTERS[this.gender][this.age] };
	}

	get tabs() {
		return PARTS.filter((part) => this.counts[part]);
	}

	label(part) {
		return this.pet ? "mascotas" : PART_LABELS[part];
	}

	layerSource(part, number) {
		if (this.pet) {
			return asset(`characters/pet/skin_${pad(number)}.png`);
		}

		return asset(`characters/${this.gender}/${this.age}/${part}_${pad(number)}.png`);
	}

	thumbSource(part, number) {
		if (this.pet) {
			return asset(`characters/pet/skin_${pad(number)}_pv.png`);
		}

		return part === "skin"
			? asset(`characters/color_${pad(number)}.png`)
			: this.layerSource(part, number);
	}

	render() {
		const { gender, age, counts } = this;

		const options = (part) =>
			Array.from({ length: counts[part] }, (_, index) => index + 1)
				.map(
					(number) =>
						`<button class="pick" data-part="${part}" data-index="${number}" aria-label="${this.label(part)} ${number}"><img src="${this.thumbSource(part, number)}" alt=""></button>`
				)
				.join("");

		const controls = this.pet
			? ""
			: `<div class="controls">
					${this.tabs
						.map(
							(part) =>
								`<button class="${part} icon" data-part="${part}" aria-label="${PART_LABELS[part]}"></button>`
						)
						.join("")}
					<hr>
				</div>
				<div class="ageControls">
					${AGES.map(
						(option) =>
							`<button class="${gender} icon ${option}" data-age="${option}" aria-label="${AGE_LABELS[gender][option]}"></button>`
					).join("")}
				</div>`;

		this.shadowRoot.innerHTML = compact(`
			<div class="box avatar" data-variant="${gender}-${age}">
				${LAYERS.filter((part) => counts[part])
					.map((part) => `<img class="${part}" alt="">`)
					.join("")}
			</div>
			<div class="box tools">
				<p>Personaliza tus mineros</p>
				<div class="tabPanel">
					<div class="tabs">
						${this.tabs
							.map(
								(part) =>
									`<div class="${part}" data-part="${part}"><strong>${this.label(part)}</strong>${options(part)}</div>`
							)
							.join("")}
					</div>
					${controls}
				</div>
				<button class="btn" data-goto="choose">Cancelar</button>
				<button class="btn" data-goto="choose">Agregar</button>
			</div>
		`);

		this.reset();
	}

	reset() {
		this.ensureRendered();

		this.#state = Object.fromEntries(Object.keys(this.counts).map((part) => [part, 1]));
		this.#tab = "skin";

		this.#paint();
	}

	#paint() {
		const root = this.shadowRoot;

		for (const [part, number] of Object.entries(this.#state)) {
			const layer = root.querySelector(`.avatar .${part}`);

			if (layer) {
				layer.src = this.layerSource(part, number);
			}
		}

		for (const option of root.querySelectorAll(".pick")) {
			option.setAttribute(
				"aria-pressed",
				String(Number(option.dataset.index) === this.#state[option.dataset.part])
			);
		}

		for (const tab of root.querySelectorAll(".tabs > [data-part]")) {
			tab.hidden = tab.dataset.part !== this.#tab;
		}

		for (const control of root.querySelectorAll(".controls [data-part]")) {
			control.setAttribute("aria-pressed", String(control.dataset.part === this.#tab));
		}
	}
}

customElements.define("mineriza-editor", MinerizaEditor);
