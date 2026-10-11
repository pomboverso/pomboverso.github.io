import { getPrefix } from './head.js'
import './lom_calendar_cell.js'

function formatYMD(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month - 1, 1)
  const lastOfMonth = new Date(year, month, 0)

  // Calculate start: Monday
  const start = new Date(firstOfMonth)
  const day = start.getDay()
  const offset = day === 0 ? 6 : day - 1
  start.setDate(start.getDate() - offset)

  // Calculate end: Sunday (so the grid ends on Saturday)
  const end = new Date(lastOfMonth)
  const lastDay = end.getDay()
  const endOffset = lastDay === 0 ? 0 : 7 - lastDay
  end.setDate(end.getDate() + endOffset)

  const dates = []
  const cursor = new Date(start)

  while (cursor <= end) {
    dates.push(formatYMD(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

customElements.define(
  getPrefix('calendar'),
  class extends HTMLElement {
    curentDate = new Date()

    #year = this.curentDate.getFullYear()
    #month = this.curentDate.getMonth() + 1

    connectedCallback() {
      this.render()
      this.bindEvents()
    }

    bindEvents() {
      this.querySelector('.prev')?.addEventListener(
        'click',
        () => {
          this.changeMonth(-1)
        }
      )

      this.querySelector('.next')?.addEventListener(
        'click',
        () => {
          this.changeMonth(1)
        }
      )
    }

    changeMonth(delta) {
      this.#month += delta

      if (this.#month < 1) {
        this.#month = 12
        this.#year--
      } else if (this.#month > 12) {
        this.#month = 1
        this.#year++
      }

      this.render()
      this.bindEvents()
    }

    render() {
      const dates = getMonthGrid(this.#year, this.#month)
      const currentMonth = `${this.#year}-${String(
        this.#month
      ).padStart(2, '0')}`

      this.innerHTML = `
        <nn-caja padding="1rem">
          <main>
            <div class="controllers">
              <nn-btn class="prev" color="#2e465cff">
                &lt;
              </nn-btn>

              <span>
                ${MONTH_NAMES[this.#month - 1]} ${
                  this.#year
                }
              </span>

              <nn-btn class="next" color="#2e465cff">
                &gt;
              </nn-btn>
            </div>

            <hr>

            <div class="heading">
              ${[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ]
                .map(
                  day => `<div class="cell">${day}</div>`
                )
                .join('')}
            </div>

            <div class="body">
              ${dates
                .map(date => {
                  const isOutside =
                    !date.startsWith(currentMonth)
                  return `
                    <lom-calendar-cell
                      date="${date}"
                      data-outside="${isOutside}"
                    ></lom-calendar-cell>
                  `
                })
                .join('')}
            </div>
          </main>
        </nn-caja>

        <lom-footer></lom-footer>
      `
    }
  }
)
