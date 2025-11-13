export default class AnalisisMercado {
  #listaActivos;

  constructor(listaActivos) {
    this.#listaActivos = listaActivos;
  }

  buscar(texto) {
    return this.#listaActivos.buscar(texto);
  }

  filtrarCategoria(cat) {
    return this.#listaActivos.getPorCategoria(cat);
  }

  calcularPromedioRendimiento(arr) {
    if (!arr.length) return 0;
    const suma = arr.reduce((a, b) => a + b.rendimiento, 0);
    return +(suma / arr.length).toFixed(2);
  }

  calcularCostoTotal(arr) {
    return arr.reduce((acc, a) => acc + a.precio, 0);
  }
}
