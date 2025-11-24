export default class Billetera {
  #cuenta;

  constructor(cuenta) {
    this.#cuenta = cuenta;
  }

  depositar(divisa, monto) {
    this.#cuenta.depositar(divisa, monto);
  }

  retirar(divisa, monto) {
    return this.#cuenta.retirar(divisa, monto);
  }
}
