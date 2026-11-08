import { asset } from "../config.js";
import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "home");

class MinerizaHome extends Screen {
	static styles = styles;

	get imageReady() {
		return this.shadowRoot.querySelector("img").decode().catch(() => {});
	}

	render() {
		this.shadowRoot.innerHTML = compact(`
			<div class="info">
				<h1>¡Mineriza a toda tu familia!</h1>
				<small>registra tus datos para usar la aplicación</small>
				<button class="btn" data-goto="form">Comenzar</button>
			</div>
			<img src="${asset("portada.png")}" alt="portada">
		`);
	}
}

customElements.define("mineriza-home", MinerizaHome);
