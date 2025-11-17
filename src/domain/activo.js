// domain/Activo.js
export default class Activo {
  constructor(id, nombre, tipo, precioInicial, moneda, volatilidad = 0.04) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio = precioInicial;
    this.moneda = moneda;
    this.precioBase = precioInicial;
    this.rendimiento = 0;
    this.volatilidad = volatilidad; 
    this.historial = [precioInicial];// Historial de precios para la gráfica
  }
  getHistorial() {
    return this.historial;
  }
  generarVariacion() {
    // variación aleatoria proporcional a la volatilidad
    const delta = (Math.random() * 2 - 1) * this.volatilidad * this.precio;
    this.precio += delta;
    if (this.precio < 0) this.precio = 0;
    // recalcular rendimiento
    this.rendimiento = ((this.precio - this.precioBase) / this.precioBase) * 100; //porcentaje del rendimiento
    // guardar para historial
    this.historial.push(this.precio);
    if (this.historial.length > 300) {
      this.historial.shift();
    }
  }
}


