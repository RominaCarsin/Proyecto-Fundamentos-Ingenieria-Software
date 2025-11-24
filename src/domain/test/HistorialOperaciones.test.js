import { describe, test, expect, beforeEach } from "@jest/globals";
import HistorialOperaciones from "../HistorialOperaciones.js";

let historial;

beforeEach(() => {
  historial = new HistorialOperaciones();
});

// Helper para crear operaciones mock simples
function op(id, nombre = "X", tipo = "compra") {
  return {
    tipo,
    activo: { id, nombre },
    cantidad: 10,
    precioUnitario: 123,
    fecha: new Date(),
  };
}

describe("HistorialOperaciones", () => {
  // registrar()
  describe("registrar()", () => {
    test("debe agregar una operación al inicio de la lista", () => {
      const o1 = op(1);
      const o2 = op(2);
      historial.registrar(o1);
      historial.registrar(o2);
      const ultimas = historial.obtenerUltimas(5);
      expect(ultimas[0]).toBe(o2);
      expect(ultimas[1]).toBe(o1);
    });
  });

  // obtenerUltimas()
  describe("obtenerUltimas()", () => {
    test("devuelve array vacío si no hay operaciones", () => {
      expect(historial.obtenerUltimas()).toEqual([]);
    });

    test("devuelve por defecto las últimas 5", () => {
      for (let i = 1; i <= 10; i++) historial.registrar(op(i));
      const ultimas = historial.obtenerUltimas(); // default 5
      expect(ultimas.length).toBe(5);
      expect(ultimas[0].activo.id).toBe(10); // más reciente
      expect(ultimas[4].activo.id).toBe(6);
    });

    test("devuelve n elementos si se pasa un parámetro", () => {
      historial.registrar(op(1));
      historial.registrar(op(2));
      historial.registrar(op(3));
      const result = historial.obtenerUltimas(2);
      expect(result.length).toBe(2);
      expect(result[0].activo.id).toBe(3);
      expect(result[1].activo.id).toBe(2);
    });
  });

  // obtenerPorActivo()
  describe("obtenerPorActivo()", () => {
    test("devuelve vacío si no hay operaciones del activo", () => {
      historial.registrar(op(1));
      historial.registrar(op(2));
      expect(historial.obtenerPorActivo(999)).toEqual([]);
    });

    test("devuelve solo operaciones del activo indicado", () => {
      historial.registrar(op(1));
      historial.registrar(op(2));
      historial.registrar(op(1));
      const ops = historial.obtenerPorActivo(1);
      expect(ops.length).toBe(2);
      ops.forEach((o) => expect(o.activo.id).toBe(1));
    });
  });
});
