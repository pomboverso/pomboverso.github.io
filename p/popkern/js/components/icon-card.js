// [degrees shown, nn-direction value, tooltip]
const VARIANTS = [
  [0, "down", "Down"],
  [45, "45"],
  [90, "left", "Left"],
  [135, "135"],
  [180, "180", "Up"],
  [225, "225"],
  [270, "right", "Right"],
  [315, "315"],
];

/** <pk-icon-card icon="times"> : one icon with its rotations and a Flip button. */
class IconCard extends HTMLElement {
  connectedCallback() {
    const icon = this.getAttribute("icon");

    const variants = VARIANTS.map(([degrees, direction, title = ""]) => `
      <nn-column nn-size="1/4">
        <p class="nn-label nn-charcoal" title="${title}">${degrees}</p>
        <div class="nn-label nn-gravel" title="${title}">
          <nn-icon nn-glyph="${icon}" nn-direction="${direction}"></nn-icon>
        </div>
      </nn-column>
    `).join("");

    this.innerHTML = `
      <nn-row>
        <nn-column class="preview" nn-size="100%, 150">
          <nn-icon nn-glyph="${icon}"></nn-icon>
        </nn-column>
        <nn-column nn-size="100%">
          <p class="nn-label nn-gravel">${icon}</p>
        </nn-column>
        <nn-column nn-size="100%">
          <nn-row nn-spacing="0.25">
            ${variants}
            <nn-column nn-size="1/1">
              <nn-btn nn-color="gold-tips" nn-text="Flip"></nn-btn>
            </nn-column>
          </nn-row>
        </nn-column>
      </nn-row>
    `;

    const button = this.querySelector("nn-btn");
    let flip = false;

    button.addEventListener("click", () => {
      flip = !flip;
      button.setAttribute("nn-color", flip ? "burn-orange" : "gold-tips");
      // The first variant (0 degrees) is the reference and never flips.
      this.querySelectorAll(".nn-label > nn-icon").forEach((element, index) => {
        if (index > 0) element.setAttribute("nn-flip", flip);
      });
    });
  }
}

customElements.define("pk-icon-card", IconCard);
