// clases/Activo.js
export class Activo {
  constructor(idActivo, nombre, tipo, precioActual) {
    this.idActivo = idActivo;
    this.nombre = nombre;
    this.tipo = tipo;
    this.precioActual = precioActual;
  }

  actualizarPrecio(nuevoPrecio) {
    this.precioActual = nuevoPrecio;
  }
}
