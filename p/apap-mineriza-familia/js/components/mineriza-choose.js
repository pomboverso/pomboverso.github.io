import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "choose");

const CHOICES = [
	{ gender: "male", label: "hombre" },
	{ gender: "female", label: "mujer" },
	{ gender: "pet", label: "mascota" }
];

class MinerizaChoose extends Screen {
	static styles = styles;

	constructor() {
		super();

		this.shadowRoot.addEventListener("click", (event) => {
			const choice = event.target.closest("[data-gender]");

			if (choice) {
				this.go("editor", { gender: choice.dataset.gender, age: "child" });
			}
		});
	}

	render() {
		this.shadowRoot.innerHTML = compact(`
			<p>Agregar minero</p>
			<small>Seleccionalos haciendo click</small>
			<div class="characters">
				${CHOICES.map(
					({ gender, label }) =>
						`<button class="${gender} icon" data-gender="${gender}" aria-label="${label}"></button>`
				).join("")}
			</div>
			<button class="btn" data-goto="preview">Continuar</button>
		`);
	}
}

customElements.define("mineriza-choose", MinerizaChoose);
