export class Comision {
  #tasa;
  #historial;

  constructor(tasa = 1.3) {
    this.#tasa = tasa;
    this.#historial = [];
  }

  calcular(monto) {
    if (monto <= 0) throw new Error("Monto inválido");
    const comision = (monto * this.#tasa) / 100;
    const total = monto - comision;
    const registro = {
      fecha: new Date(),
      monto,
      comision: +comision.toFixed(2),
      total: +total.toFixed(2),
    };
    this.#historial.push(registro);
    return registro;
  }

  get historial() { return [...this.#historial]; }
  get tasa() { return this.#tasa; }
  set tasa(nueva) {
    if (nueva < 0 || nueva > 10) throw new Error("Tasa fuera de rango");
    this.#tasa = nueva;
  }
}
