import { getPrefix } from './head.js'

customElements.define(
  getPrefix('mount-calculator'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #cap = [6270, 7835, 9795, 12240, 15305, 19130, 23910, 29890, 37360, 46705]
    #data = {
      stars: [
        // mount - 1
        ...[0, 3, 3, 3, 3, 3, 3, 3, 4, 5],
        // 2
        ...[5, 5, 5, 10, 5, 10, 10, 10, 10, 10],
        // 3
        ...[15, 15, 20, 20, 25, 30, 35, 35, 45, 50],
        // 4
        ...[55, 45, 50, 60, 100, 110, 135, 150, 175, 200],
        // 5
        ...[230, 265, 305, 350, 405, 460, 535, 610, 705, 810],
        // 6
        ...[970, 1170, 1400, 1680, 2105, 2415, 2905, 3480, 4180, 5015],
        // 7
        ...this.#cap,
        // 8
        ...this.#cap,
        // 9
        ...this.#cap,
        // 10
        ...this.#cap,
        // 11
        ...this.#cap,
        // 12
        ...this.#cap,
        // 13
        ...this.#cap,
        // 14
        ...this.#cap,
        // 15
        ...this.#cap,
        // 16
        ...this.#cap,
        // 17
        ...this.#cap,
        // 18
        ...this.#cap,
        // 19
        ...this.#cap,
        // 20
        ...this.#cap,
        // 21
        ...this.#cap,
        // 22
        ...this.#cap,
        // 23
        ...this.#cap,
        // 24
        ...this.#cap,
      ],
      target: 0,
      current: 0,
    }

    #mountDictionary = [
      'lotus-leaf',
      'quack-splash',
      'flyboard',
      'surfboard',
      'skyglider',
      'amethys-gourd',
      'lotus-throne',
      'lotus-throne',
      'azure-feather',
      'azure-feather',
      'azure-feather',
      'azure-feather',
      'azure-feather',
      'azure-feather',
      'draco-ascension',
      'draco-ascension',
      'draco-ascension',
      'draco-ascension',
      'draco-ascension',
      'twin-phoenix-glaives',
      'twin-phoenix-glaives',
      'twin-phoenix-glaives',
      'twin-phoenix-glaives',
      'twin-phoenix-glaives',
    ]

    #getQuantity(position) {
      return position
        ? [...this.#data.stars]
            .splice(0, position)
            .reduce((acc, el) => (acc += el))
        : 0
    }

    #createCard(title) {
      return `
      <div class="calculator ${title.toLowerCase()}">

        <h3>${title} Mount</h3>

        <div class="calc-card" data-section="${title.toLowerCase()}">
          <div class="heading horizontal">
            ${[...new Array(11)].map((e, i) => `<span>${i}</span>`).join('')}
          </div>

          <div class="main">
            <div class="heading vertical">
              ${[...new Array(24)]
                .map((e, i) => `<span>${i + 1}</span>`)
                .join('')}
            </div>
            
            <div class="body">
              ${[...new Array(240)]
                .map(
                  (e, i) => `
                <span data-tooltip="${Math.trunc(i / 10) + 1} / ${
                    (i % 10) + 1
                  }">
                  <nn-btn aria-label="star button">
                    <nn-icono class="star"></nn-icono>
                    <nn-icono class="star-o"></nn-icono>
                  </nn-btn>
                </span>
                `
                )
                .join('')}
            </div>
          </div>
        </div>

        <div class="preview">
          <img
            class="mount-preview"
            src="./img/svg/mounts/${this.#mountDictionary[0]}.svg"
            alt="${this.#mountDictionary[0]} mount"
          />
          <p data-tooltip="stars" class="star-counter">
            0<nn-icono class="star"></nn-icono>
          </p>
          <p data-tooltip="clockwinders" class="clockwinder-counter">
            0<nn-icono class="cog"></nn-icono>
          </p>
        </div> 
      </div>
      `
    }

    #template = `
    <nn-caja padding="1rem" max-width="1200px">
      <main>
        <section>
          <h2>
            Mount Calculator
          </h2>

          <div class="cards-container">
            ${this.#createCard('Current')}
            ${this.#createCard('Target')}
          </div>

          <div class="calculator total">
            <p data-tooltip="stars" class="star-counter">
              0<nn-icono class="star"></nn-icono>
            </p>
            <p data-tooltip="clockwinders" class="clockwinder-counter">
              0<nn-icono class="cog"></nn-icono>
            </p>
            <p data-tooltip="pink gems" class="gems-counter">
              0<nn-icono class="diamond"></nn-icono>
            </p>
          </div>
        </section>
      </main>
    </nn-caja>

    <lom-footer></lom-footer>
  `

    #generateListeners() {
      const diamondConverter = 35000 / 1000
      const cards = this.querySelectorAll('.calc-card')

      const starTotalCounter = this.querySelector('.total .star-counter')
      const clockwinderTotalCounter = this.querySelector(
        '.total .clockwinder-counter'
      )
      const diamondTotalCounter = this.querySelector('.total .gems-counter')

      cards.forEach(calc => {
        const section = calc.dataset.section
        const container = calc.closest('.calculator')
        const starCounter = container.querySelector('.star-counter')
        const clockwinderCounter = container.querySelector(
          '.clockwinder-counter'
        )
        const imgPreview = container.querySelector('.mount-preview')

        calc.addEventListener('click', e => {
          const button = e.target.closest('button')
          if (!button || !calc.contains(button)) return

          const buttons = Array.from(calc.querySelectorAll('button'))
          const index = buttons.indexOf(button)

          this.#data[section] = index + 1
          localStorage.setItem(section, index + 1)

          // local card calculation
          starCounter.innerHTML = `${
            index + 1
          }<nn-icono class="star"></nn-icono>`
          clockwinderCounter.innerHTML = `${this.#getQuantity(
            index + 1
          ).toLocaleString('en-US')}<nn-icono class="cog"></nn-icono>`

          const mountIndex = Math.trunc(index / 10)

          imgPreview.src = `./img/svg/mounts/${this.#mountDictionary[mountIndex]}.svg`
          imgPreview.alt = `${this.#mountDictionary[mountIndex]} mount`

          // total calculation
          starTotalCounter.innerHTML = `${Math.abs(
            this.#data?.target - this.#data?.current
          )}<nn-icono class="star"></nn-icono>`

          clockwinderTotalCounter.innerHTML = `${Math.abs(
            this.#getQuantity(this.#data?.target) -
              this.#getQuantity(this.#data?.current)
          )?.toLocaleString('en-US')}<nn-icono class="cog"></nn-icono>`

          diamondTotalCounter.innerHTML = `${(
            Math.abs(
              this.#getQuantity(this.#data?.target) -
                this.#getQuantity(this.#data?.current)
            ) * diamondConverter
          ).toLocaleString('en-US')}<nn-icono class="diamond"></nn-icono>`

          buttons.forEach((btn, i) => {
            btn.classList.toggle('active', i <= index)
          })
        })
      })
    }

    connectedCallback() {
      this.innerHTML = this.#template

      requestAnimationFrame(() => {
        this.#generateListeners()

        const current = parseInt(localStorage.current, 10)
        const target = parseInt(localStorage.target, 10)

        if (!isNaN(current)) {
          this.#data.current = current
          const buttons = Array.from(
            this.querySelectorAll('.calculator.current button')
          )
          const btn = buttons[current - 1]
          if (btn) btn.click()
        }

        if (!isNaN(target)) {
          this.#data.target = target
          const buttons = Array.from(
            this.querySelectorAll('.calculator.target button')
          )
          const btn = buttons[target - 1]
          if (btn) btn.click()
        }
      })
    }
  }
)
