import { describe, test, expect, beforeEach } from "@jest/globals";
import ListaActivos from "../ListaActivos.js";
import Activo from "../Activo.js";

let lista;

beforeEach(() => {
  lista = new ListaActivos();
});

describe("ListaActivos", () => {
  // constructor
  describe("constructor()", () => {
    test("inicializa arrays vacíos", () => {
      expect(lista.activosDemo).toEqual([]);
      expect(lista.activosReales).toEqual([]);
    });
  });

  // cargarActivosDemo
  describe("cargarActivosDemo()", () => {
    test("carga 5 activos demo correctamente", () => {
      lista.cargarActivosDemo();
      expect(lista.activosDemo.length).toBe(5);
      lista.activosDemo.forEach((a) => {
        expect(a).toBeInstanceOf(Activo);
      });
    });
  });

  // cargarActivosReales
  describe("cargarActivosReales()", () => {
    test("carga 5 activos reales correctamente", () => {
      lista.cargarActivosReales();
      expect(lista.activosReales.length).toBe(5);
      lista.activosReales.forEach((a) => {
        expect(a).toBeInstanceOf(Activo);
      });
    });
  });

  // getListaParaModo
  describe("getListaParaModo()", () => {
    test("devuelve lista demo cuando el modo es 'demo'", () => {
      lista.cargarActivosDemo();
      const arr = lista.getListaParaModo("demo");
      expect(arr).toBe(lista.activosDemo);
    });

    test("devuelve lista real cuando el modo es 'real'", () => {
      lista.cargarActivosReales();
      const arr = lista.getListaParaModo("real");
      expect(arr).toBe(lista.activosReales);
    });
  });

  // getPorId
  describe("getPorId()", () => {
    test("devuelve el activo correcto si existe", () => {
      lista.cargarActivosDemo();
      const act = lista.getPorId(1, "demo");
      expect(act).not.toBeNull();
      expect(act.id).toBe(1);
    });

    test("devuelve null si no existe el id", () => {
      lista.cargarActivosDemo();
      const act = lista.getPorId(999, "demo");
      expect(act).toBeNull();
    });
  });

  // buscarPorTipo
  describe("buscarPorTipo()", () => {
    test("devuelve los activos del tipo solicitado", () => {
      lista.cargarActivosDemo();
      const arr = lista.buscarPorTipo("Acciones", "demo");
      expect(arr.length).toBeGreaterThan(0);
      arr.forEach((a) => expect(a.tipo).toBe("Acciones"));
    });

    test("devuelve [] si no existe el tipo", () => {
      lista.cargarActivosDemo();
      const arr = lista.buscarPorTipo("Inexistente", "demo");
      expect(arr).toEqual([]);
    });
  });
});
