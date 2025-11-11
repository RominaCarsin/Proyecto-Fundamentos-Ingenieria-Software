// clases/Transaccion.js
export class Transaccion {
  constructor(idTransaccion, tipo, monto, fecha, comisiones, estado) {
    this.idTransaccion = idTransaccion;
    this.tipo = tipo;
    this.monto = monto;
    this.fecha = fecha;
    this.comisiones = comisiones;
    this.estado = estado;
  }

  ejecutar() {
    console.log(`Transacción ${this.idTransaccion} ejecutada`);
  }
}
