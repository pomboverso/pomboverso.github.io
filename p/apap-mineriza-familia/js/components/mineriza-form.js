import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "form");

const FIELDS = ["nombre", "apellido", "cédula", "teléfono", "e-mail"];

class MinerizaForm extends Screen {
	static styles = styles;

	render() {
		this.shadowRoot.innerHTML = compact(`
			<p>Registra tus datos para usar la aplicación</p>
			<form>
				${FIELDS.map((field) => `<label><span>${field}:</span><input type="text"></label>`).join("")}
				<button class="btn" type="submit">Registrar</button>
			</form>
		`);

		this.shadowRoot.querySelector("form").addEventListener("submit", (event) => {
			event.preventDefault();
			this.go("choose");
		});
	}
}

customElements.define("mineriza-form", MinerizaForm);
