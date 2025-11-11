export class ConfiguracionUsuario {
  #tema;
  #idioma;
  #notificaciones;

  constructor(tema = "claro", idioma = "es", notificaciones = true) {
    this.#tema = tema;
    this.#idioma = idioma;
    this.#notificaciones = notificaciones;
  }

  alternarTema() {
    this.#tema = this.#tema === "claro" ? "oscuro" : "claro";
    document.body.dataset.theme = this.#tema;
  }

  alternarNotificaciones() {
    this.#notificaciones = !this.#notificaciones;
  }

  get tema() { return this.#tema; }
  get idioma() { return this.#idioma; }
  get notificaciones() { return this.#notificaciones; }
}
