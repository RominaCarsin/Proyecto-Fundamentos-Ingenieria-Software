export class Activo {
  #id;
  #nombre;
  #tipo;
  #precio;
  #rendimiento; // porcentaje (+/-)

  constructor(id, nombre, tipo, precio, rendimiento = 0) {
    this.#id = id;
    this.#nombre = nombre;
    this.#tipo = tipo;
    this.#precio = precio;
    this.#rendimiento = rendimiento;
  }

  actualizarPrecio(nuevoPrecio) {
    if (nuevoPrecio <= 0) throw new Error("Precio inválido");
    const variacion = ((nuevoPrecio - this.#precio) / this.#precio) * 100;
    this.#precio = nuevoPrecio;
    this.#rendimiento = Number(variacion.toFixed(2));
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get tipo() { return this.#tipo; }
  get precio() { return this.#precio; }
  get rendimiento() { return this.#rendimiento; }

  toString() {
    const color = this.#rendimiento >= 0 ? "+" : "";
    return `${this.#nombre} (${this.#tipo}) - $${this.#precio} (${color}${this.#rendimiento}%)`;
  }
}
