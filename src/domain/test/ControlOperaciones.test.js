import { describe, test, expect } from "@jest/globals";
import ControlOperaciones from "../ControlOperaciones.js";

const ctrl = new ControlOperaciones();

describe("ControlOperaciones", () => {
  // calcularDinero()
  describe("calcularDinero(cantidad, precio)", () => {
    test("debe devolver el producto de cantidad * precio", () => {
      expect(ctrl.calcularDinero(5, 100)).toBe(500);
    });

    test("cantidad 0 debe devolver 0", () => {
      expect(ctrl.calcularDinero(0, 100)).toBe(0);
    });

    test("precio 0 debe devolver 0", () => {
      expect(ctrl.calcularDinero(5, 0)).toBe(0);
    });

    test("funciona con decimales", () => {
      expect(ctrl.calcularDinero(2.5, 3.2)).toBeCloseTo(8);
    });

    test("funciona con números negativos", () => {
      expect(ctrl.calcularDinero(-2, 50)).toBe(-100);
    });
  });

  // calcularCantidad()
  describe("calcularCantidad(dinero, precio)", () => {
    test("debe devolver dinero / precio", () => {
      expect(ctrl.calcularCantidad(500, 100)).toBe(5);
    });

    test("dinero 0 debe devolver 0", () => {
      expect(ctrl.calcularCantidad(0, 100)).toBe(0);
    });

    test("funciona con decimales", () => {
      expect(ctrl.calcularCantidad(5, 2)).toBe(2.5);
    });

    test("funciona con números negativos", () => {
      expect(ctrl.calcularCantidad(-100, 50)).toBe(-2);
    });

    test("precio 0 debe devolver Infinity (comportamiento JS)", () => {
      expect(ctrl.calcularCantidad(100, 0)).toBe(Infinity);
    });
  });
});
