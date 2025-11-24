import { describe, test, expect, beforeEach } from "@jest/globals";
import CuentaDemo from "../CuentaDemo.js";

let cuenta;

beforeEach(() => {
  cuenta = new CuentaDemo();
});

describe("CuentaDemo", () => {
  // Constructor

  describe("constructor()", () => {
    test("debe inicializar saldoUSD en 10000", () => {
      expect(cuenta.saldoUSD).toBe(10000);
    });

    test("debe inicializar saldoUYU en 0", () => {
      expect(cuenta.saldoUYU).toBe(0);
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

  // Independencia de instancias

  describe("instancias independientes", () => {
    test("dos instancias no deben compartir portafolio", () => {
      const c1 = new CuentaDemo();
      const c2 = new CuentaDemo();

      c1.portafolio.push({ id: 1, cantidad: 5 });

      expect(c2.portafolio.length).toBe(0);
    });
  });

  // Mutación de portafolio (válido)

  describe("portafolio modificable", () => {
    test("debe permitir agregar elementos al portafolio", () => {
      cuenta.portafolio.push({ id: 1, cantidad: 3 });

      expect(cuenta.portafolio.length).toBe(1);
      expect(cuenta.portafolio[0]).toEqual({ id: 1, cantidad: 3 });
    });
  });
});
