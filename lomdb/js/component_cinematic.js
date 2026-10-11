import { getPrefix } from './head.js'

customElements.define(
	getPrefix('cinematic'),
	class extends HTMLElement {
		constructor() {
			super()
		}

		#dict = {
			1: 'winter',
			2: 'winter',
			3: 'draco',
			4: 'draco',
			5: 'draco',
			6: 'summer',
			7: 'summer',
			8: 'summer',
			9: 'summer',
			10: 'draco',
			11: 'draco',
			12: 'winter',
		}

		#getHeader() {
			const month = new Date().getMonth() + 1
			let currentHeader = `./img/svg/lom_header-${this.#dict[month]}.svg`
			return currentHeader
		}

		#data = {
			template: `
				 <header>
						<img
							 src="${this.#getHeader()}"
							 alt="mushroom cinematic"
						/>
				 </header>`,
		}

		connectedCallback() {
			this.innerHTML = this.#data.template
		}
	}
)
