import { getPrefix } from './_helpers.js'
import { parseMarkdown } from './parser.js'

const MARKDOWN_DIR = './markdown/'
const MANIFEST = `${MARKDOWN_DIR}index.json`

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

customElements.define(
  getPrefix('desktop'),
  class extends HTMLElement {
    #initialized = false

    async #load() {
      try {
        const files = JSON.parse(await fetchText(MANIFEST))
        const sources = await Promise.all(files.map(file => fetchText(`${MARKDOWN_DIR}${file}`)))

        this.innerHTML += sources.map(md => `<article class="content-area">${parseMarkdown(md)}</article>`).join('')
      } catch (error) {
        console.error(`desktop: could not load markdown (${error.message})`)
        this.innerHTML += '<p>Could not load this section.</p>'
      }
    }

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = `
      <h2>NixOS Configuration</h2>
      <p>Just a bunch of things that I think make sense to share about how I keep my configuration organized. Most of these things probably would look better in separate files, but for now I'm enjoying having only one file where I can edit everything.</p>
      `

      this.#load()
    }
  }
)
