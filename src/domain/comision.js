export class Comision {
  constructor(tasa = 1.3) {
    this.tasa = tasa; // porcentaje por defecto
  }

  calcular(monto) {
    return (monto * this.tasa) / 100;
  }
}