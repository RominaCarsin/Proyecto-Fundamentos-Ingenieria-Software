export default class Modo {
  #modo = "demo"; // valores permitidos: "demo" | "real"

  get modo() {
    return this.#modo;
  }

  set modo(v) {
    if (v !== "demo" && v !== "real") {
      throw new Error("Modo inválido. Debe ser 'demo' o 'real'."); // control de daños
    }
    this.#modo = v;
  }
}
