import { Cuenta } from "./cuenta.js";
import { Portafolio } from "./portafolio.js";

export class Usuario {
  #nombre;
  #email;
  #cuenta;
  #portafolio;
  #transacciones;

  constructor(nombre, email) {
    this.#nombre = nombre;
    this.#email = email;
    this.#cuenta = new Cuenta();
    this.#portafolio = new Portafolio();
    this.#transacciones = [];
  }

  registrarTransaccion(transaccion) {
    this.#transacciones.push(transaccion);
  }

  get nombre() { return this.#nombre; }
  get email() { return this.#email; }
  get cuenta() { return this.#cuenta; }
  get portafolio() { return this.#portafolio; }
  get transacciones() { return [...this.#transacciones]; }
}
