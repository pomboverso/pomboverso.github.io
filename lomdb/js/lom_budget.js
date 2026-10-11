import { getPrefix } from './head.js'

customElements.define(
  getPrefix('budget'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #headers = [
      'magic_lamp_key',
      'diamond_key',
      'chrono_key',
      'guardian_key',
      'flame_key',
      'magic_lamp',
      'feather_coin',
      'divine_feather_coin',
      'gem_of_love',
      'diamond',
      'milk_tea',
      'vitality_essence',
      'pickaxe',
      'gold',
      'pal_coupon',
      'skill_coupon',
      'empowerment_gear',
      'divine_hammer',
      'gem',
    ]

    #template = `    
    <nn-caja padding="1rem">
      <main>
        <section>
          <h2>Gems Monthly Budget // 100</h2>

          <div class="table budget" role="table">
            <nn-fila break="sm" class="table-header" gap=".25rem" role="row">
              <nn-pilar role="columnheader" size="220px">
                <img width="24" src="./img/items/blank.webp">
              </nn-pilar>

              ${this.#headers
                .map(
                  i => `
                    <nn-pilar role="columnheader" data-tooltip="${i}">
                      <img width="24" src="./img/items/${i}.webp" alt="${i}">
                    </nn-pilar>`
                )
                .join('')}
            </nn-fila>
            <div class="table-body" role="rowgroup"></div>
          </div>
        </section>
      </main>
    </nn-caja>

    <lom-footer></lom-footer>
    `

    #table = [
      () => {
        const freq = 31
        return {
          item: 'dungeon_pack_I',
          chrono_key: 1 * freq,
          magic_lamp_key: 1 * freq,
          diamond_key: 1 * freq,
          guardian_key: 1 * freq,
          gem: +(0.99 * freq).toFixed(2),
        }
      },

      () => {
        const freq = 5
        return {
          item: 'dungeon_week_pack_I',
          chrono_key: 2 * freq,
          magic_lamp_key: 2 * freq,
          diamond_key: 2 * freq,
          guardian_key: 2 * freq,
          gem: +(4.99 * freq).toFixed(2),
        }
      },

      () => {
        const freq = 1
        return {
          item: 'counterattack_plan',
          magic_lamp_key: 10,
          diamond_key: 10,

          divine_feather_coin: 300,
          diamond: 200 * 10,
          divine_hammer: 200 * 6,
          empowerment_gear: 2 * 3,

          flame_key: 3,
          gem: 9.99,
        }
      },

      () => {
        const freq = 1
        return {
          item: 'counterattack_plan',
          magic_lamp_key: 10,
          diamond_key: 10,
          diamond: 120 * 10,
          gem: 0.99,
        }
      },

      () => {
        const extra_weekly_instance_from_parking = 5 // max per month
        const freq =
          30 * 3 + extra_weekly_instance_from_parking
        return {
          item: 'trial_card',
          diamond: 3200,
          divine_feather_coin: 66 * freq, // I still need to see how many feather we get per fight
          feather_coin: 672 * freq,
          gem: 14.99,
        }
      },

      () => {
        const freq = 30
        const diamonds_daily = 300 * freq

        return {
          item: 'monthly_card',
          diamond: 1050 + diamonds_daily,
          gem: 4.99,
          magic_lamp_key: freq,
          diamond_key: freq,
          magic_lamp: 100 * freq,
        }
      },

      () => {
        const freq = 30
        return {
          item: 'mining_license',
          gem: 4.99,
          diamond: 1050,
          pickaxe: 30 * freq,
        }
      },

      () => {
        const freq = 30
        return {
          item: 'pal_feast_pass',
          gem: 4.99,
          diamond: 1050,
          magic_lamp_key: 2 * freq,
          diamond_key: 2 * freq,
          chrono_key: 2 * freq,
          guardian_key: 2 * freq,
          // check if mystic merchants daily +2 means two keys or 3 per day
          vitality_essence: 2 * freq,
        }
      },

      () => {
        const freq = 30
        const daily_gem_of_love = 10 * freq
        const daily_boba = 5 * freq
        return {
          item: 'passion_post',
          gem: 4.99,
          diamond: 1050,
          gem_of_love: 100 + daily_gem_of_love,
          milk_tea: daily_boba,
        }
      },

      // () => {
      //   const freq = 31
      //   return {
      //     item: 'daily_offer',
      //     gem: 2.99 * freq,
      //     diamond: (100 + 200 + 400) * freq,
      //   }
      // },
    ].map(fn => fn())

    #totals = this.#table.reduce((acc, item) => {
      for (const [key, value] of Object.entries(item)) {
        if (key === 'item') continue
        if (typeof value === 'number') {
          acc[key] = (acc[key] || 0) + value
        }
      }
      return acc
    }, {})

    #generateTable() {
      const tableBody = this.querySelector('.table-body')
      const fragment = document.createDocumentFragment()

      this.#table.forEach(item => {
        const wrapper = document.createElement('div')

        const resources = this.#headers
          .map(key => [key, item[key]])
          .map(
            ([key, value]) => `
    <nn-pilar role="columnheader" data-tooltip="${key}">
      ${
        value
          ? value > 1000
            ? +(value / 1000).toFixed(2) + 'k'
            : value
          : '-'
      }
    </nn-pilar>`
          )
          .join('')

        wrapper.innerHTML = `
      <nn-fila break="sm" class="row" gap=".25rem" role="row">
        <nn-pilar role="columnheader" data-tooltip="${item.item}" size="220px">
          <nn-pill color="#9f399f">${item.item}</nn-pill>
        </nn-pilar>
        ${resources}
      </nn-fila>
    `
        fragment.appendChild(wrapper.firstElementChild)
      })

      const totalRow = document.createElement('div')
      totalRow.innerHTML = `
    <nn-fila break="sm" class="row" gap=".25rem" role="row">
      <nn-pilar role="columnheader" size="220px">
        <nn-pill color="#9f3939ff">Total</nn-pill>
      </nn-pilar>
      ${this.#headers
        .map(key => {
          const value = this.#totals[key]
          return `
          <nn-pilar role="columnheader" data-tooltip="${key}">
            ${
              value
                ? value > 1000
                  ? +(value / 1000).toFixed(2) + 'k'
                  : +value.toFixed(2)
                : '-'
            }
          </nn-pilar>`
        })
        .join('')}
    </nn-fila>`

      fragment.appendChild(totalRow.firstElementChild)

      tableBody.innerHTML = ''
      tableBody.appendChild(fragment)
    }

    connectedCallback() {
      this.innerHTML = this.#template

      this.#generateTable()
    }
  }
)
