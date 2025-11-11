export class Transaccion {
  #tipo; // Compra | Venta | Depósito | Retiro
  #activo; // nombre o código
  #cantidad;
  #monto;
  #fecha;

  constructor(tipo, activo, cantidad, monto) {
    this.#tipo = tipo;
    this.#activo = activo;
    this.#cantidad = cantidad;
    this.#monto = monto;
    this.#fecha = new Date();
  }

  resumen() {
    return `[${this.#fecha.toLocaleDateString()}] ${this.#tipo} ${this.#cantidad} ${this.#activo} por $${this.#monto}`;
  }

  get tipo() { return this.#tipo; }
  get activo() { return this.#activo; }
  get monto() { return this.#monto; }
  get fecha() { return this.#fecha; }
}
