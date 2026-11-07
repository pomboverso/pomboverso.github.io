import { getPrefix } from './head.js'
import svgPanZoom from './modules/svg-pan-zoom.mjs'

const contributor = {
  pombo: {
    name: 'Pombo',
    img_path: './img/contributors/pombo.webp',
  },
  foos: {
    name: 'Foos',
    img_path: './img/contributors/foos.webp',
  },
  kinoko: {
    name: 'Kinoko Wiki',
    img_path: './img/contributors/kinoko.webp',
  },
  leroy: {
    name: 'Leroy',
    img_path: './img/contributors/leroy.webp',
  },
  bufo: {
    name: 'Bufo',
    img_path: './img/contributors/bufo.webp',
  },
  em: {
    name: 'Em',
    img_path: './img/contributors/em.webp',
  },
  // naver: {
  //   name: 'Naver Forum',
  //   img_path: './img/contributors/pombo.png',
  // },
}

const gap = 600

customElements.define(
  getPrefix('design'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = [
      {
        img_path: './img/svg/design/home.svg',
        title: 'Home',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
      {
        img_path: './img/svg/design/timeline.svg',
        title: 'Timeline',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
          {
            ...contributor.foos,
            contribution: 'CN merges data',
          },
          {
            ...contributor.kinoko,
            contribution: 'JP merges data',
          },
          // {
          //   ...contributor.naver,
          //   contribution: 'KR merges data',
          // },
        ],
      },
      {
        img_path: './img/svg/design/merges.svg',
        title: 'Merges',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
          {
            ...contributor.foos,
            contribution: 'CN merges data',
          },
          {
            ...contributor.kinoko,
            contribution: 'JP merges data',
          },
          // {
          //   ...contributor.naver,
          //   contribution: 'KR merges data',
          // },
        ],
      },
      {
        img_path: './img/svg/design/gaps.svg',
        title: "Merge's Gap",
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
      {
        img_path: './img/svg/design/3d.svg',
        title: '3D Chart',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
          {
            ...contributor.foos,
            contribution: 'CN merges data',
          },
          {
            ...contributor.kinoko,
            contribution: 'JP merges data',
          },
          // {
          //   ...contributor.naver,
          //   contribution: 'KR merges data',
          // },
        ],
      },
      {
        img_path: './img/svg/design/leaderboard.svg',
        title: 'Leaderboard',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
      {
        img_path: './img/svg/design/duplication.svg',
        title: 'Players Duplication',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
      {
        img_path: './img/svg/design/items.svg',
        title: 'Item List',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
          {
            ...contributor.foos,
            contribution: '',
          },
          {
            ...contributor.bufo,
            contribution: '',
          },
          {
            ...contributor.em,
            contribution: '',
          },
        ],
      },
      {
        img_path: './img/svg/design/mount-calculator.svg',
        title: 'Mount Calculator',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
          {
            ...contributor.leroy,
            contribution: 'QA',
          },
        ],
      },
      {
        img_path: './img/svg/design/ring-calculator.svg',
        title: 'Ring Calculator',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
          {
            ...contributor.kinoko,
            contribution: 'JP merges data',
          },
          {
            ...contributor.leroy,
            contribution: 'QA',
          },
        ],
      },
      {
        img_path: './img/svg/design/normalizer.svg',
        title: 'Normalizer',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
      {
        img_path: '',
        title: 'Changelog',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
      {
        img_path: '',
        title: 'About',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
      {
        img_path: '',
        title: 'Donate',
        contributors: [
          {
            ...contributor.pombo,
            contribution:
              'Design and Development of the section',
          },
        ],
      },
    ]
      .map((e, index) => {
        const contributors = e.contributors.map(
          (i, index2) => `
          <g transform="translate(${
            1920 + 20 + index * (1920 + gap)
          } ${60 * (index2 + 1)})">
          <image href="${
            i.img_path
          }" width="40" clip-path="url(#circleMask)" />
          <text fill="#fff" x="50" y="25">
            <tspan fill="#fff" font-size="1rem" font-weight="300">
              ${i.name}
            </tspan>
          </text>
          </g>
          `
        )

        const img = e?.img_path
          ? `
          <image href="${e.img_path}" width="1920" x="${
              index * (1920 + gap)
            }" y="40" />
          `
          : `<rect x="${
              index * (1920 + gap)
            }" y="40" width="1920" height="400" fill="#333" />`

        return `
      <text y="0" font-family="Montserrat">
        <tspan fill="#fff" x="${
          index * (1920 + gap)
        }" font-size="3rem" font-weight="300">
          ${e.title}
        </tspan>
      </text>

      ${contributors}

      ${img}
      
    `
      })
      .join('')

    #template = `      
      <main>
        <section>
          <svg id="display" width="100%" height="100vh" viewBox="0 0 1920 1920">
            <defs>
              <clipPath id="circleMask">
                <rect x="0" y="0" width="40" height="40" rx="25" ry="25" />
              </clipPath>
            </defs>
            ${this.#data}
          </svg>
        </section>
      </main>
      `

    #init() {
      const panZoom = svgPanZoom('#display', {
        panEnabled: true,
        controlIconsEnabled: false,
        zoomEnabled: true,
        mouseWheelZoomEnabled: true,
        zoomScaleSensitivity: 0.2,
        minZoom: 0.1,
        maxZoom: 10,
      })

      panZoom.pan({
        x: 40,
        y: 150,
      })
    }

    async connectedCallback() {
      this.innerHTML = this.#template
      this.#init()
    }
  }
)
