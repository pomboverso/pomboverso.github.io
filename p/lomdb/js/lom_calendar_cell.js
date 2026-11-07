import { getPrefix } from './head.js'
import { getEventsForDate } from './helper_calendar.js'

customElements.define(
  getPrefix('calendar-cell'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #template = `
      <div class="container">
        <time class="day desktop" title datetime></time>
        <time class="day mobile" title datetime></time>
        <ul class="events"></ul>
      </div>
    `

    connectedCallback() {
      this.innerHTML = this.#template

      const dayNode = this.querySelector('.day.desktop')
      const dayMobileNode =
        this.querySelector('.day.mobile')
      const eventsNode = this.querySelector('.events')

      const date = this.getAttribute('date')
      if (!date) return

      const [y, m, d] = date.split('-').map(Number)

      dayNode.textContent = d
      dayNode.setAttribute('title', date)
      dayNode.setAttribute('datetime', date)

      dayMobileNode.textContent = date
      dayMobileNode.setAttribute('title', date)
      dayMobileNode.setAttribute('datetime', date)

      const events = getEventsForDate(date)

      eventsNode.innerHTML = events
        .map(({ id, title, url, servers }) =>
          url
            ? `<li class="event ${id}"><a href="${url}" target="_self">${title}</a></li>`
            : servers
            ? `<li class="event ${id}">
            <details>
              <summary>
              ${title}
              </summary>
              <ul>
              ${servers
                .map(server => `<li>${server}</li>`)
                .join('')}
              </ul>
            </details>
            </li>`
            : `<li class="event ${id}">${title}</li>`
        )
        .join('')
    }
  }
)
