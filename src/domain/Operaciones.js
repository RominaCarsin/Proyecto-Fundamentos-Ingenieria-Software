export default class Operacion {
  #tipo;
  #activo;
  #cantidad;
  #precioUnitario;
  #fecha;

  constructor(tipo, activo, cantidad, precioUnitario, fecha = new Date()) {
    this.#tipo = tipo;
    this.#activo = activo;
    this.#cantidad = cantidad;
    this.#precioUnitario = precioUnitario;
    this.#fecha = fecha;
  }

  get monto() {
    return this.#cantidad * this.#precioUnitario;
  }

  get tipo() { return this.#tipo; }
  get activo() { return this.#activo; }
  get cantidad() { return this.#cantidad; }
  get precioUnitario() { return this.#precioUnitario; }
  get fecha() { return this.#fecha; }
}
