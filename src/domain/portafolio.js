import { Activo } from "./activo.js";

export class Portafolio {
  #activos;

  constructor() {
    this.#activos = [];
  }

  agregar(activo) {
    if (!(activo instanceof Activo)) throw new Error("Activo inválido");
    const existe = this.#activos.some(a => a.id === activo.id);
    if (!existe) this.#activos.push(activo);
  }

  buscar(nombre) {
    return this.#activos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
  }

  filtrarPorTipo(tipo) {
    return this.#activos.filter(a => a.tipo === tipo);
  }

  get lista() {
    return [...this.#activos];
  }
}
