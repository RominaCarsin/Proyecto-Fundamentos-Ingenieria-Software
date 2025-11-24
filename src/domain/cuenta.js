export default class Cuenta {
  #saldos = {
    USD: { total: 10000, disponible: 10000, garantia: 0 },
    UYU: { total: 0, disponible: 0, garantia: 0 },
  };

  getSaldo(divisa) {
    return { ...this.#saldos[divisa] };
  }

  depositar(divisa, monto) {
    this.#saldos[divisa].total += monto;
    this.#saldos[divisa].disponible += monto;
  }

  retirar(divisa, monto) {
    if (this.#saldos[divisa].disponible < monto) return false;
    this.#saldos[divisa].total -= monto;
    this.#saldos[divisa].disponible -= monto;
    return true;
  }
}
