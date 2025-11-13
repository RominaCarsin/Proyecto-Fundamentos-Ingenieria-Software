export default class Activo {
  #id;
  #nombre;
  #tipo;
  #precio;
  #rendimiento;
  #moneda;

  constructor(id, nombre, tipo, precio, rendimiento, moneda = "USD") {
    this.#id = id;
    this.#nombre = nombre;
    this.#tipo = tipo;
    this.#precio = precio;
    this.#rendimiento = rendimiento;
    this.#moneda = moneda;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get tipo() { return this.#tipo; }
  get precio() { return this.#precio; }
  get rendimiento() { return this.#rendimiento; }
  get moneda() { return this.#moneda; }

  set precio(v) { this.#precio = v; }
  set rendimiento(v) { this.#rendimiento = v; }
}
