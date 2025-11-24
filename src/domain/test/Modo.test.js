import { describe, test, expect } from "@jest/globals";
import Modo from "../Modo.js";

describe("Modo", () => {
  // constructor
  describe("constructor()", () => {
    test("el modo inicial debe ser 'demo'", () => {
      const modo = new Modo();
      expect(modo.modo).toBe("demo");
    });
  });

  // getter
  describe("get modo()", () => {
    test("devuelve el valor actual del modo", () => {
      const modo = new Modo();
      expect(modo.modo).toBe("demo");
      modo.modo = "real";
      expect(modo.modo).toBe("real");
    });
  });

  // setter
  describe("set modo()", () => {
    test("permite cambiar a 'real'", () => {
      const modo = new Modo();
      modo.modo = "real";
      expect(modo.modo).toBe("real");
    });

    test("permite cambiar a 'demo'", () => {
      const modo = new Modo();
      modo.modo = "real"; // primero cambiamos
      modo.modo = "demo"; // vuelve a demo
      expect(modo.modo).toBe("demo");
    });

    test("lanza error si se asigna un modo inválido", () => {
      const modo = new Modo();
      expect(() => {
        modo.modo = "inexistente";
      }).toThrow("Modo inválido. Debe ser 'demo' o 'real'.");
    });
  });
});
