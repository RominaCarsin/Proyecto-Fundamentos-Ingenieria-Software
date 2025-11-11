export class Transaccion {
  constructor(tipo, activo, monto) {
    this.tipo = tipo;       // "compra" o "venta"
    this.activo = activo;   
    this.monto = monto;    
    this.fecha = new Date();
  }

  resumen() {
    return `${this.tipo.toUpperCase()} ${this.activo.nombre} por $${this.monto} (${this.fecha.toLocaleString()})`;
  }
}