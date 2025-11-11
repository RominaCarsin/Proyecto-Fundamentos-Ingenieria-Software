export class Activo {
  constructor(nombre, tipo, precio, tendencia) {
    this.nombre = nombre;       
    this.tipo = tipo;           //  "acción", "cripto"
    this.precio = precio;       
    this.tendencia = tendencia; // "up" o "down"
  }

  actualizarPrecio(nuevoPrecio) {
    this.precio = nuevoPrecio;
  }
}