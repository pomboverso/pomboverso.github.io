import { showScene } from "../lib/scene.js";
import { compact, Screen } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";

const styles = await loadStyles("shared", "share");

const FILE_NAME = "mi-familia-minerizada.png";
const TITLE = "Mi familia minerizada";

const save = (file) => {
	const link = document.createElement("a");

	link.href = URL.createObjectURL(file);
	link.download = file.name;
	link.click();

	setTimeout(() => URL.revokeObjectURL(link.href), 10000);
};

class MinerizaShare extends Screen {
	static styles = styles;

	#file = null;

	constructor() {
		super();

		this.shadowRoot.addEventListener("click", (event) => {
			const action = event.target.closest("[data-action]")?.dataset.action;

			if (action === "download") {
				save(this.#file);
			} else if (action === "share") {
				this.#share();
			}
		});
	}

	render() {
		this.shadowRoot.innerHTML = compact(`
			<div class="box scene">
				<canvas role="img" aria-label="tu familia minerizada"></canvas>
			</div>
			<div class="box">
				<p>¡Comparte tu familia minerizada y participa para ganar premios!</p>
				<small>o descarga la imagen como fondo de pantalla</small>
				<button class="btn" data-goto="choose">Editar</button>
				<button class="btn" data-action="share" disabled>Comparte</button>
				<button class="btn" data-action="download" disabled>Descarga</button>
				<small class="status" role="status"></small>
			</div>
		`);
	}

	async refresh() {
		this.#file = null;
		this.#status("");
		this.#enable(false);

		try {
			const scene = await showScene(this.shadowRoot.querySelector("canvas"), this.family);

			if (!scene) {
				return;
			}

			// Prepared in advance: sharing must start right on the click.
			scene.toBlob((blob) => {
				if (blob) {
					this.#file = new File([blob], FILE_NAME, { type: "image/png" });
					this.#enable(true);
				}
			}, "image/png");
		} catch (error) {
			console.error(error);
			this.#status("No pudimos crear la imagen. Intenta de nuevo.");
		}
	}

	async #share() {
		const data = { files: [this.#file], title: TITLE };

		if (!navigator.canShare?.(data)) {
			save(this.#file);
			this.#status("Tu navegador no permite compartir. Descargamos la imagen para que la publiques.");
			return;
		}

		try {
			await navigator.share(data);
		} catch (error) {
			// Closing the share sheet is not an error.
			if (error.name !== "AbortError") {
				this.#status("No se pudo compartir. Usa el botón Descarga.");
			}
		}
	}

	#enable(enabled) {
		for (const button of this.shadowRoot.querySelectorAll("[data-action]")) {
			button.disabled = !enabled;
		}
	}

	#status(message) {
		this.shadowRoot.querySelector(".status").textContent = message;
	}
}

customElements.define("mineriza-share", MinerizaShare);
