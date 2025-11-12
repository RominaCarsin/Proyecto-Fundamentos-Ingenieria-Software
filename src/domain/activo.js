export class Activo {
  #id;
  #nombre;
  #tipo;
  #precio;
  #rendimiento;
  #cantidadPoseida;

  constructor(id, nombre, tipo, precio, rendimiento = 0) {
    this.#id = id;
    this.#nombre = nombre;
    this.#tipo = tipo;
    this.#precio = precio;
    this.#rendimiento = rendimiento;
    this.#cantidadPoseida = 0;
  }

  
  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get tipo() { return this.#tipo; }
  get precio() { return this.#precio; }
  get rendimiento() { return this.#rendimiento; }
  get cantidadPoseida() { return this.#cantidadPoseida; }

  actualizarPrecio(nuevoPrecio) {
    this.#rendimiento = ((nuevoPrecio - this.#precio) / this.#precio) * 100;
    this.#precio = nuevoPrecio;
  }

  //no esta funcionado bien
  comprar(cantidad) {
    if (cantidad <= 0) throw new Error("Cantidad inválida para comprar.");
    this.#cantidadPoseida += cantidad;
  }

  vender(cantidad) {
    if (cantidad <= 0) throw new Error("Cantidad inválida para vender.");
    if (cantidad > this.#cantidadPoseida) {
      throw new Error(`No hay suficientes acciones de ${this.#nombre} para vender.`);
    }
    this.#cantidadPoseida -= cantidad;
  }

  obtenerCantidadPoseida() {
    return this.#cantidadPoseida;
  }

  toString() {
    return `${this.#nombre} (${this.#tipo}) - $${this.#precio.toFixed(2)} | Rend: ${this.#rendimiento.toFixed(2)}% | Poseídas: ${this.#cantidadPoseida}`;
  }

  static obtenerTipoPorNombre(nombre, listaActivos) {
    const encontrado = listaActivos.find(a => a.nombre === nombre);
    return encontrado ? encontrado.tipo : null;
  }

  static filtrarPorTipo(tipo, listaActivos) {
    return listaActivos.filter(a => a.tipo === tipo);
  }
}
