export class Usuario {
  constructor(nombre, esDemo = true) {
    this.nombre = nombre;
    this.esDemo = esDemo;
  }

  modoCuenta() {
    return this.esDemo ? "Demo" : "Real";
  }
}