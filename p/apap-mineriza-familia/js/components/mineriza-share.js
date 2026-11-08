import { asset } from "../config.js";
import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "share");

class MinerizaShare extends Screen {
	static styles = styles;

	render() {
		this.shadowRoot.innerHTML = compact(`
			<div class="box">
				<img src="${asset("family.png")}" alt="portada">
			</div>
			<div class="box">
				<p>¡Comparte tu familia minerizada y participa para ganar premios!</p>
				<small>o descarga la imagen como fondo de pantalla</small>
				<button class="btn" data-goto="choose">Editar</button>
				<button class="btn">Comparte</button>
				<button class="btn">Descarga</button>
			</div>
		`);
	}
}

customElements.define("mineriza-share", MinerizaShare);
