const FIELDS = ["Nombre", "Telefono", "Correo"];

// Which chalkboard panels each button shows
const BOARDS = {
  btn_01: ["SSS_04"],
  btn_02: ["SSS_03"],
  btn_03: ["SSS_01", "SSS_02"],
};

/** "Contáctanos" page: chalkboard with the form and two information boards. */
class Contact extends HTMLElement {
  connectedCallback() {
    const rows = FIELDS.map((name, index) => `
      <tr><td class="fx"><input type="text" id="campo_${index + 1}" name="${name}"
        value="${name}" aria-label="${name}"></td></tr>
    `).join("");

    this.innerHTML = `
      <div id="contactanos" class="modulo tab">
        <div class="fix">
          <br><br><br>
          <div id="bk_piz">
            <div id="SSS_01"></div>
            <div id="SSS_02">
              <div>Contáctanos</div>
              <form novalidate>
                <table id="form01" cellspacing="0" cellpadding="5">
                  ${rows}
                  <tr><td id="txt_area"><textarea id="campo_4" name="Mensaje"
                    aria-label="Mensaje">Mensaje</textarea></td></tr>
                  <tr><td class="fx"><input type="submit" id="btn" value="Enviar"></td></tr>
                  <tr id="err_2"><td id="err" role="alert"></td></tr>
                </table>
              </form>
            </div>
            <div id="SSS_03" hidden></div>
            <div id="SSS_04" hidden></div>
          </div>

          <div id="btn_01" role="button" tabindex="0" aria-label="Costos"></div>
          <div id="btn_02" role="button" tabindex="0" aria-label="Horarios"></div>
          <div id="btn_03" role="button" tabindex="0" aria-label="Contacto"></div>

          <div id="bk_fr01"></div>
          <div id="bk_fr02"></div>
        </div>
      </div>
      <div id="msj_enviado" role="status">Mensaje Enviado</div>
    `;

    this.setUpBoards();
    this.setUpForm();
  }

  setUpBoards() {
    Object.entries(BOARDS).forEach(([buttonId, visible]) => {
      const button = this.querySelector(`#${buttonId}`);
      const show = () => {
        for (const id of ["SSS_01", "SSS_02", "SSS_03", "SSS_04"]) {
          this.querySelector(`#${id}`).hidden = !visible.includes(id);
        }
      };
      button.addEventListener("click", show);
      button.addEventListener("keydown", (event) => event.key === "Enter" && show());
    });
  }

  /** Demo only: the message is validated but never sent anywhere. */
  setUpForm() {
    const form = this.querySelector("form");
    const fields = [...form.querySelectorAll('[id^="campo_"]')];
    const errorRow = this.querySelector("#err_2");
    const sent = this.querySelector("#msj_enviado");

    // The field name doubles as its placeholder.
    fields.forEach((field) =>
      field.addEventListener("focus", () => {
        if (field.value === field.name) field.value = "";
      })
    );

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const missing = fields.filter((field) => {
        const empty = field.value.trim() === "" || field.value === field.name;
        field.style.background = empty ? "#ff8691" : "#fff";
        return empty;
      });

      errorRow.classList.toggle("is-visible", missing.length > 0);

      if (missing.length) {
        const names = missing.map((field) => field.name).join(" - ");
        this.querySelector("#err").innerHTML =
          `Faltan los siguientes campos: <br><b> - ${names}</b>`;
        return;
      }

      form.reset();
      fields.forEach((field) => (field.style.background = ""));
      sent.classList.add("is-visible");
    });

    sent.addEventListener("click", () => sent.classList.remove("is-visible"));
  }
}

customElements.define("ds-contact", Contact);
