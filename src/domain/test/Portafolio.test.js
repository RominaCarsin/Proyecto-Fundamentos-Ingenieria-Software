import { describe, test, expect, beforeEach } from "@jest/globals";
import Portafolio from "../Portafolio.js";

describe("Portafolio", () => {
  let portafolio;
  let activoA;
  let activoB;

  beforeEach(() => {
    portafolio = new Portafolio();

    activoA = { id: 1, nombre: "Microsoft", tipo: "Acciones" };
    activoB = { id: 2, nombre: "Bitcoin", tipo: "Criptomonedas" };
  });

  describe("agregar()", () => {
    test("agrega un activo si no existía", () => {
      portafolio.agregar(activoA, 10);
      const items = portafolio.obtener();

      expect(items.length).toBe(1);
      expect(items[0].id).toBe(1);
      expect(items[0].cantidad).toBe(10);
    });

    test("suma cantidad cuando el activo ya existía", () => {
      portafolio.agregar(activoA, 5);
      portafolio.agregar(activoA, 3);

      const items = portafolio.obtener();
      expect(items[0].cantidad).toBe(8);
    });
  });

  describe("tiene()", () => {
    test("devuelve false si el activo no existe", () => {
      expect(portafolio.tiene(99, 1)).toBe(false);
    });

    test("devuelve false si existe pero no alcanza la cantidad", () => {
      portafolio.agregar(activoA, 2);
      expect(portafolio.tiene(1, 5)).toBe(false);
    });

    test("devuelve true si tiene cantidad suficiente", () => {
      portafolio.agregar(activoA, 10);
      expect(portafolio.tiene(1, 5)).toBe(true);
    });
  });

  describe("restar()", () => {
    test("resta cantidad cuando existe", () => {
      portafolio.agregar(activoA, 10);
      portafolio.restar(1, 4);

      const items = portafolio.obtener();
      expect(items[0].cantidad).toBe(6);
    });

    test("elimina el activo si la cantidad llega a 0 o menos", () => {
      portafolio.agregar(activoA, 5);
      portafolio.restar(1, 10);

      const items = portafolio.obtener();
      expect(items.length).toBe(0);
    });

    test("no hace nada si el activo no existe", () => {
      expect(() => portafolio.restar(99, 5)).not.toThrow();
      expect(portafolio.obtener().length).toBe(0);
    });
  });

  describe("obtener()", () => {
    test("devuelve copia del array interno", () => {
      portafolio.agregar(activoA, 10);

      const items = portafolio.obtener();
      items[0].cantidad = 999; // NO debe modificar el interno

      const interno = portafolio.obtener();
      expect(interno[0].cantidad).toBe(10);
    });
  });

  describe("filtrar()", () => {
    test("filtra correctamente por nombre", () => {
      portafolio.agregar(activoA, 10);
      portafolio.agregar(activoB, 1);

      const res = portafolio.filtrar("micro");
      expect(res.length).toBe(1);
      expect(res[0].id).toBe(1);
    });

    test("devuelve vacío si no hay coincidencias", () => {
      portafolio.agregar(activoA, 10);
      expect(portafolio.filtrar("coca")).toEqual([]);
    });
  });

  describe("filtrarCategoria()", () => {
    test("filtra por tipo correctamente", () => {
      portafolio.agregar(activoA, 5);
      portafolio.agregar(activoB, 2);

      const res = portafolio.filtrarCategoria("Acciones");
      expect(res.length).toBe(1);
      expect(res[0].id).toBe(1);
    });

    test("devuelve vacío si el tipo no coincide", () => {
      portafolio.agregar(activoA, 5);
      expect(portafolio.filtrarCategoria("Forex")).toEqual([]);
    });
  });

  describe("getActivos()", () => {
    test("devuelve copia del array interno", () => {
      portafolio.agregar(activoA, 10);

      const res = portafolio.getActivos();
      res[0].cantidad = 999; // no debe mutar

      const again = portafolio.getActivos();
      expect(again[0].cantidad).toBe(10);
    });

    test("devuelve un array aunque esté vacío", () => {
      expect(portafolio.getActivos()).toEqual([]);
    });
  });
});
