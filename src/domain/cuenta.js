export class Cuenta {
  constructor(saldosIniciales = { USD: 0, UYU: 0 }) {
    this.saldos = saldosIniciales;
  }

  sumarSaldo(moneda, cantidad) {
    if (!this.saldos[moneda]) this.saldos[moneda] = 0;
    this.saldos[moneda] += cantidad;
  }

  restarSaldo(moneda, cantidad) {
    if (!this.saldos[moneda]) this.saldos[moneda] = 0;
    this.saldos[moneda] -= cantidad;
  }

  obtenerSaldo(moneda) {
    return this.saldos[moneda] || 0;
  }
}
