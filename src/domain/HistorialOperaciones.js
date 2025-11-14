export default class HistorialOperaciones {
  #lista = [];

  registrar(operacion) {
    this.#lista.unshift(operacion);
  }

  obtenerUltimas(n = 5) {
    return this.#lista.slice(-n);
  }

  obtenerPorActivo(id) {
    return this.#lista.filter(op => op.activo.id === id);
  }
}
