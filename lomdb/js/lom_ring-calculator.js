import { getPrefix } from './head.js'

customElements.define(
  getPrefix('ring-calculator'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = {
      lvls: [
        0, 5, 5, 5, 6, 6, 6, 7, 7, 7, 9, 9, 9, 10, 10, 11,
        11, 12, 12, 13, 15, 16, 17, 17, 18, 19, 20, 21, 22,
        23, 27, 28, 30, 31, 32, 34, 35, 37, 39, 40, 48, 51,
        53, 55, 58, 60, 63, 66, 69, 72, 100, 20, 21, 22, 23,
        24, 25, 26, 27, 28, 34, 36, 37, 39, 41, 43, 44, 46,
        49, 51, 61, 64, 66, 69, 73, 76, 79, 83, 87, 90, 109,
        113, 119, 124, 129, 135, 141, 148, 154, 161, 194,
        202, 211, 221, 231, 241, 252, 263, 275, 288, 400,
        50, 52, 55, 57, 60, 62, 65, 68, 71, 85, 89, 93, 97,
        102, 106, 111, 116, 121, 127, 152, 159, 166, 174,
        181, 190, 198, 207, 216, 226, 271, 284, 296, 310,
        324, 338, 353, 369, 386, 403, 484, 506, 528, 552,
        577, 603, 630, 659, 688, 720, 1000, 200, 209, 218,
        228, 239, 249, 260, 272, 284, 341, 357, 373, 389,
        407, 425, 444, 464, 485, 507, 609, 636, 665, 695,
        726, 758, 793, 828, 866, 905, 1085, 1134, 1185,
        1239, 1294, 1353, 1413, 1477, 1544, 1613, 1936,
        2023, 2110, 2200, 2300, 2400, 2520, 2630, 2750,
        2850, 4000, 500, 525, 551, 579, 608, 638, 670, 704,
        739, 886, 931, 977, 1026, 1078, 1131, 1188, 1247,
        1310, 1375, 1650, 1733, 1819, 1910, 2006, 2106,
        2211, 2322, 2438, 2560, 3072, 3226, 3387, 3556,
        3734, 3921, 4117, 4323, 4539, 4766, 5719, 6005,
        6305, 6620, 6951, 7299, 7664, 8047, 8450, 9000,
        1250, 1311, 1378, 1445, 1519, 1594, 1675, 1757,
        1846, 1837, 1994, 2093, 2199, 2308, 2424, 2545,
        2673, 2805, 2946, 3085, 3213, 3374, 3543, 3720,
        3906, 4101, 4306, 4521, 4747, 4968, 6068, 6369,
        6691, 7022, 7377, 7741, 8133, 8535, 8967, 9258,
        9796, 10268, 10378, 11322, 11909, 12482, 13129,
        13761, 14475, 16113, 17833,
      ],
      current: 1,
    }

    #getQuantity(current, target) {
      if (target <= current) return 0
      return this.#data.lvls
        .slice(current, target) // start AFTER current, end at target-1
        .reduce((acc, el) => acc + el, 0)
    }

    #generateList(begins, ends) {
      let result = ''
      for (let c = begins; c <= ends; c++) {
        result += `
        <li>
          <label>
            <input type="radio" name="ring" value="${c}">
            <span class="btn">
              ${c}
            </span>
            <span class="target">
              ${this.#getQuantity(
                this.#data.current,
                c
              )} <nn-icono class="heart"></nn-icono>
            </span>
          </label>
        </li>
        `
      }

      return result
    }

    #generateRing(lv) {
      return `
      <li class="ring-radio lv${lv}">
        <label>
          <input type="radio" name="ring" value="${lv}">
          <img src="./img/rings/${lv}.png" width="400" alt="ring ${lv}">
          <h3>${lv}</h3>
          <p>${this.#getQuantity(
            this.#data.current,
            lv
          )} <nn-icono class="heart"></nn-icono></p>
        </label>
      </li>
      `
    }

    #render() {
      const form = this.querySelector('.ring-form')

      const tpl = document.createElement('template')
      tpl.innerHTML = `
    <ul class="ring-path">
      ${this.#generateRing(1)}
      ${this.#generateList(2, 50)}
      ${this.#generateRing(51)}
      ${this.#generateList(52, 100)}
      ${this.#generateRing(101)}
      ${this.#generateList(102, 150)}
      ${this.#generateRing(151)}
      ${this.#generateList(152, 200)}
      ${this.#generateRing(201)}
      ${this.#generateList(202, 301)}
    </ul>
  `

      form.innerHTML = ''
      form.appendChild(tpl.content.cloneNode(true))

      const radios = Array.from(
        this.querySelectorAll(
          '.ring-form input[type="radio"]'
        )
      )
      const radio = radios[this.#data.current - 1]
      if (radio) radio.click()
    }

    #template = `
    <nn-caja padding="1rem" max-width="1200px">
      <main>
        <section>
          <h2>
            Ring Calculator
          </h2>

          <div class="ring-form">
          </div>

        </section>
      </main>
    </nn-caja>

    <lom-footer></lom-footer>
  `

    #generateListeners() {
      const container = this.querySelector('.ring-form')
      container.addEventListener('change', e => {
        this.#data.current = +e.target.value
        localStorage.setItem(
          'currentRing',
          this.#data.current
        )
        this.#render()
      })
    }

    connectedCallback() {
      this.#data.current = parseInt(
        localStorage.getItem('currentRing') ?? '1',
        10
      )
      this.innerHTML = this.#template
      this.#render()

      requestAnimationFrame(() => {
        this.#generateListeners()
      })
    }
  }
)
