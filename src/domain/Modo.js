export default class Modo {
  #modo = "demo";   // valores permitidos: "demo" | "real"

  constructor() {
    // ya arranca en demo, no hace falta setear nada
  }

  get modo() {
    return this.#modo;
  }

  set modo(v) {
    if (v !== "demo" && v !== "real") {
      throw new Error("Modo inválido. Debe ser 'demo' o 'real'.");
    }
    this.#modo = v;
  }
}
