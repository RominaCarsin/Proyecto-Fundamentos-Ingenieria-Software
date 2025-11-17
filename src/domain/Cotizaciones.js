export default class Cotizaciones {
  #monedaActual = "USD";

  #tasas = {
    USD: 1,
    UYU: 40,
  };

  get monedaActual() {
    return this.#monedaActual;
  }

  cambiarMoneda(m) {
    this.#monedaActual = m;
  }

  convertir(monto, de, a) {
    return monto * (this.#tasas[a] / this.#tasas[de]);
  }
}
