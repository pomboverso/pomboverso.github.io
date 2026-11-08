import { asset, EDITORS } from "../config.js";
import { iconsReady } from "../lib/icons.js";
import { compact } from "../lib/screen.js";
import { loadStyles } from "../lib/styles.js";
import "./mineriza-home.js";
import "./mineriza-form.js";
import "./mineriza-choose.js";
import "./mineriza-editor.js";
import "./mineriza-preview.js";
import "./mineriza-share.js";

const styles = await loadStyles("app");

const pageLoaded = () =>
	document.readyState === "complete"
		? Promise.resolve()
		: new Promise((resolve) => addEventListener("load", resolve, { once: true }));

class MinerizaApp extends HTMLElement {
	#current = null;

	connectedCallback() {
		if (this.shadowRoot) {
			return;
		}

		const root = this.attachShadow({ mode: "open" });

		root.adoptedStyleSheets = styles;

		root.innerHTML = compact(`
			<aside class="loader" aria-hidden="true">
				<img src="${asset("cargando.png")}" alt="">
			</aside>
			<main>
				<header>
					<img src="${asset("logo.png")}" alt="APAP">
				</header>
				<mineriza-home id="home" active></mineriza-home>
				<mineriza-form id="form"></mineriza-form>
				<mineriza-choose id="choose"></mineriza-choose>
				${EDITORS.map(
					({ gender, age }) => `<mineriza-editor gender="${gender}" age="${age}"></mineriza-editor>`
				).join("")}
				<mineriza-preview id="preview"></mineriza-preview>
				<mineriza-share id="share"></mineriza-share>
			</main>
		`);

		this.#current = root.getElementById("home");

		root.addEventListener("mineriza-navigate", (event) => this.#navigate(event.detail));

		this.#reveal(root.getElementById("home"));
	}

	#navigate({ to, gender, age }) {
		const root = this.shadowRoot;

		const next =
			to === "editor"
				? root.querySelector(`mineriza-editor[gender="${gender}"][age="${age}"]`)
				: root.getElementById(to);

		if (!next) {
			return;
		}

		this.#current?.removeAttribute("active");

		next.reset?.();
		next.active = true;

		this.#current = next;
	}

	async #reveal(home) {
		await Promise.allSettled([pageLoaded(), iconsReady, home.imageReady]);

		home.toggleAttribute("ready", true);
		this.toggleAttribute("loaded", true);
	}
}

customElements.define("mineriza-app", MinerizaApp);
