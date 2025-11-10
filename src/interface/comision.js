// clases/Comision.js
export class Comision {
  constructor(idComision, tipoComision, porcentaje, montoFijo) {
    this.idComision = idComision;
    this.tipoComision = tipoComision;
    this.porcentaje = porcentaje;
    this.montoFijo = montoFijo;
  }

  calcularComision(monto) {
    return monto * (this.porcentaje / 100) + this.montoFijo;
  }
}
