export class Cuenta {
  #modo; // 'Demo' o 'Real'
  #saldos; // { USD: {total, disponible, garantia}, UYU: {...} }

  constructor(modo = "Demo") {
    this.#modo = modo;
    this.#saldos = {
      USD: { total: 0, disponible: 0, garantia: 0 },
      UYU: { total: 0, disponible: 0, garantia: 0 },
    };
  }

  depositar(divisa, monto) {
    if (monto <= 0) throw new Error("Monto inválido");
    this.#saldos[divisa].total += monto;
    this.#saldos[divisa].disponible += monto;
  }

  retirar(divisa, monto) {
    if (monto <= 0 || monto > this.#saldos[divisa].disponible) return false;
    this.#saldos[divisa].total -= monto;
    this.#saldos[divisa].disponible -= monto;
    return true;
  }

  bloquear(divisa, monto) {
    if (monto <= 0 || monto > this.#saldos[divisa].disponible) return false;
    this.#saldos[divisa].disponible -= monto;
    this.#saldos[divisa].garantia += monto;
    return true;
  }

  alternarModo() {
    this.#modo = this.#modo === "Demo" ? "Real" : "Demo";
  }

  get modo() { return this.#modo; }
  get saldos() { return this.#saldos; }
}
