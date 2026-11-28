import { AGE_LABELS } from "../config.js";
import { drawFace } from "../lib/avatar.js";
import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "choose");

const CHOICES = [
	{ gender: "male", label: "hombre" },
	{ gender: "female", label: "mujer" },
	{ gender: "pet", label: "mascota" }
];

const GENDER_LABELS = Object.fromEntries(CHOICES.map(({ gender, label }) => [gender, label]));

const describe = ({ gender, age }) =>
	gender === "pet" ? GENDER_LABELS.pet : `${GENDER_LABELS[gender]} ${AGE_LABELS[gender][age]}`;

class MinerizaChoose extends Screen {
	static styles = styles;

	constructor() {
		super();

		this.shadowRoot.addEventListener("click", (event) => {
			const choice = event.target.closest("[data-gender]");
			const remove = event.target.closest("[data-remove]");

			if (choice) {
				this.go("editor", { gender: choice.dataset.gender, age: "child" });
			} else if (remove) {
				this.#remove(Number(remove.dataset.remove));
			}
		});
	}

	render() {
		this.shadowRoot.innerHTML = compact(`
			<div class="layout">
				<section class="picker">
					<p>Agregar minero</p>
					<small>Seleccionalos haciendo click</small>
					<div class="characters">
						${CHOICES.map(
							({ gender, label }) =>
								`<button class="${gender} icon" data-gender="${gender}" aria-label="${label}"></button>`
						).join("")}
					</div>
					<button class="btn" data-goto="preview" disabled>Continuar</button>
				</section>
				<aside class="family" aria-label="tu familia" hidden>
					<p>Tu familia</p>
					<ul></ul>
				</aside>
			</div>
		`);
	}

	refresh() {
		const root = this.shadowRoot;
		const members = this.family.members;

		root.querySelector("ul").replaceChildren(...members.map((member, index) => this.#card(member, index)));
		root.querySelector(".family").hidden = !members.length;
		root.querySelector('[data-goto="preview"]').disabled = !members.length;
	}

	#card(member, index) {
		const item = document.createElement("li");
		const label = `${describe(member)} ${index + 1}`;

		item.innerHTML = compact(`
			<canvas width="200" height="200" role="img" aria-label="${label}"></canvas>
			<button class="remove" data-remove="${member.id}" aria-label="eliminar ${label}"></button>
		`);

		drawFace(item.querySelector("canvas"), member).catch(console.error);

		return item;
	}

	#remove(id) {
		const index = this.family.members.findIndex((member) => member.id === id);

		this.family.remove(id);
		this.refresh();

		// Keep keyboard focus inside the panel.
		const buttons = this.shadowRoot.querySelectorAll("[data-remove]");
		const next = buttons[Math.min(index, buttons.length - 1)];

		(next ?? this.shadowRoot.querySelector("[data-gender]")).focus({ preventScroll: true });
	}
}

customElements.define("mineriza-choose", MinerizaChoose);
