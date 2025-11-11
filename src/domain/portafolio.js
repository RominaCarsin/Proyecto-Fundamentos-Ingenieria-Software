import { Transaccion } from "./transaccion.js";

export class Portfolio {
  constructor() {
    this.transacciones = [];
  }

  agregarTransaccion(transaccion) {
    if (transaccion instanceof Transaccion) {
      this.transacciones.push(transaccion);
    }
  }

  obtenerTransacciones() {
    return this.transacciones;
  }

  obtenerUltimas(n = 5) {
    return this.transacciones.slice(-n).reverse();
  }
}
