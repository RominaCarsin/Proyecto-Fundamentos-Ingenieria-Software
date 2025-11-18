import { describe, test, expect, beforeEach } from "@jest/globals";
import CuentaReal from "../CuentaReal.js";

let cuenta;

beforeEach(() => {
  cuenta = new CuentaReal();
});

describe("CuentaReal", () => {
  // Constructor
  describe("constructor()", () => {
    test("debe inicializar saldoUSD en 2000", () => {
      expect(cuenta.saldoUSD).toBe(2000);
    });

    test("debe inicializar saldoUYU en 15000", () => {
      expect(cuenta.saldoUYU).toBe(15000);
    });

    test("debe inicializar portafolio como arreglo vacío", () => {
      expect(Array.isArray(cuenta.portafolio)).toBe(true);
      expect(cuenta.portafolio.length).toBe(0);
    });
  });

  // Tipos correctos
  describe("tipos de datos", () => {
    test("saldoUSD y saldoUYU deben ser números", () => {
      expect(typeof cuenta.saldoUSD).toBe("number");
      expect(typeof cuenta.saldoUYU).toBe("number");
    });

    test("portafolio debe ser un array", () => {
      expect(Array.isArray(cuenta.portafolio)).toBe(true);
    });
  });

  // Instancias independientes
  describe("instancias independientes", () => {
    test("dos instancias no deben compartir portafolio", () => {
      const c1 = new CuentaReal();
      const c2 = new CuentaReal();
      c1.portafolio.push({ id: 2, cantidad: 10 });
      expect(c2.portafolio.length).toBe(0);
    });
  });

  // Mutación del portafolio
  describe("portafolio modificable", () => {
    test("debe permitir agregar elementos al portafolio", () => {
      cuenta.portafolio.push({ id: 5, cantidad: 4 });
      expect(cuenta.portafolio.length).toBe(1);
      expect(cuenta.portafolio[0]).toEqual({ id: 5, cantidad: 4 });
    });
  });
});
