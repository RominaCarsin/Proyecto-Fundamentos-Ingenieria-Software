import { describe, test, expect } from "@jest/globals";
import Operacion from "../Operaciones.js";

describe("Operacion", () => {
  // constructor()
  describe("constructor()", () => {
    test("crea una operación con los valores correctos", () => {
      const fecha = new Date("2024-01-01");
      const activo = { id: 1, nombre: "Microsoft" };

      const op = new Operacion("compra", activo, 10, 50, fecha);

      expect(op.tipo).toBe("compra");
      expect(op.activo).toBe(activo);
      expect(op.cantidad).toBe(10);
      expect(op.precioUnitario).toBe(50);
      expect(op.fecha).toBe(fecha);
    });

    test("si no se pasa fecha usa la fecha actual", () => {
      const activo = { id: 2, nombre: "Bitcoin" };

      const antes = Date.now();
      const op = new Operacion("venta", activo, 2, 100);
      const despues = Date.now();

      expect(op.fecha.getTime()).toBeGreaterThanOrEqual(antes);
      expect(op.fecha.getTime()).toBeLessThanOrEqual(despues);
    });
  });

  // getters
  describe("getters", () => {
    test("monto devuelve cantidad * precioUnitario", () => {
      const op = new Operacion("compra", {}, 5, 20);
      expect(op.monto).toBe(100);
    });

    test("tipo devuelve el tipo", () => {
      const op = new Operacion("venta", {}, 3, 10);
      expect(op.tipo).toBe("venta");
    });

    test("activo devuelve el activo", () => {
      const activo = { id: 1 };
      const op = new Operacion("compra", activo, 1, 1);
      expect(op.activo).toBe(activo);
    });

    test("cantidad devuelve la cantidad", () => {
      const op = new Operacion("compra", {}, 99, 1);
      expect(op.cantidad).toBe(99);
    });

    test("precioUnitario devuelve el precio", () => {
      const op = new Operacion("venta", {}, 2, 777);
      expect(op.precioUnitario).toBe(777);
    });

    test("fecha devuelve la fecha", () => {
      const fecha = new Date("2030-05-10");
      const op = new Operacion("compra", {}, 1, 1, fecha);
      expect(op.fecha).toBe(fecha);
    });
  });
});
