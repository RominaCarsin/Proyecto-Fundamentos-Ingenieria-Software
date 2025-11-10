// clases/Cuenta.js
export class Cuenta {
  constructor(idCuenta, tipo, saldo, moneda) {
    this.idCuenta = idCuenta;
    this.tipo = tipo;
    this.saldo = saldo;
    this.moneda = moneda;
  }

  fondearCuenta(monto) {
    this.saldo += monto;
  }

  consultarSaldo() {
    return this.saldo;
  }

  retirar(monto) {
    if (monto <= this.saldo) {
      this.saldo -= monto;
    } else {
      console.error("Saldo insuficiente");
    }
  }
}
