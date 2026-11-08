export const compact = (html) => html.replace(/>\s+</g, "><").trim();

export class Screen extends HTMLElement {
	static styles = [];
	static lazy = false;
	static observedAttributes = ["active"];

	#rendered = false;

	constructor() {
		super();

		this.attachShadow({ mode: "open" }).adoptedStyleSheets = this.constructor.styles;

		this.shadowRoot.addEventListener("click", (event) => {
			const target = event.target.closest("[data-goto]");

			if (target) {
				this.go(target.dataset.goto);
			}
		});
	}

	connectedCallback() {
		if (!this.constructor.lazy) {
			this.ensureRendered();
		}
	}

	attributeChangedCallback(name, previous, value) {
		if (name === "active" && value !== null) {
			this.ensureRendered();
		}
	}

	get active() {
		return this.hasAttribute("active");
	}

	set active(value) {
		this.toggleAttribute("active", Boolean(value));
	}

	ensureRendered() {
		if (!this.#rendered) {
			this.#rendered = true;
			this.render();
		}
	}

	render() {}

	go(to, detail = {}) {
		this.dispatchEvent(
			new CustomEvent("mineriza-navigate", {
				bubbles: true,
				composed: true,
				detail: { to, ...detail }
			})
		);
	}
}
