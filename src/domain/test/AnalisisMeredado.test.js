import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import AnalisisMercado from "../AnalisisMercado.js";

describe("AnalisisMercado", () => {
  let mockLista;

  // Se resetea antes de cada test
  beforeEach(() => {
    mockLista = {
      buscar: jest.fn(),
      getPorCategoria: jest.fn(),
    };
  });

  //buscar()
  test("buscar() debe llamar a listaActivos.buscar con el texto indicado", () => {
    mockLista.buscar.mockReturnValue(["MSFT"]);
    const analisis = new AnalisisMercado(mockLista);

    const res = analisis.buscar("ms");

    expect(mockLista.buscar).toHaveBeenCalledWith("ms");
    expect(res).toEqual(["MSFT"]);
  });

  test("buscar() debe funcionar con string vacío", () => {
    mockLista.buscar.mockReturnValue([]);

    const analisis = new AnalisisMercado(mockLista);
    const res = analisis.buscar("");

    expect(mockLista.buscar).toHaveBeenCalledWith("");
    expect(res).toEqual([]);
  });

  test("buscar() debe retornar arreglo vacío si la lista no encuentra nada", () => {
    mockLista.buscar.mockReturnValue([]);

    const analisis = new AnalisisMercado(mockLista);
    const res = analisis.buscar("noexiste");

    expect(mockLista.buscar).toHaveBeenCalledWith("noexiste");
    expect(res).toEqual([]);
  });

  // filtrarCategoria()
  test("filtrarCategoria() debe llamar a listaActivos.getPorCategoria", () => {
    mockLista.getPorCategoria.mockReturnValue(["BTC"]);

    const analisis = new AnalisisMercado(mockLista);
    const res = analisis.filtrarCategoria("Cripto");

    expect(mockLista.getPorCategoria).toHaveBeenCalledWith("Cripto");
    expect(res).toEqual(["BTC"]);
  });

  test("filtrarCategoria() debe devolver vacío si no coincide la categoría", () => {
    mockLista.getPorCategoria.mockReturnValue([]);

    const analisis = new AnalisisMercado(mockLista);
    const res = analisis.filtrarCategoria("Nada");

    expect(mockLista.getPorCategoria).toHaveBeenCalledWith("Nada");
    expect(res).toEqual([]);
  });

  // calcularPromedioRendimiento()
  test("calcularPromedioRendimiento() debe devolver 0 si el arreglo está vacío", () => {
    const analisis = new AnalisisMercado(mockLista);
    expect(analisis.calcularPromedioRendimiento([])).toBe(0);
  });

  test("calcularPromedioRendimiento() debe calcular correctamente el promedio", () => {
    const analisis = new AnalisisMercado(mockLista);
    const arr = [{ rendimiento: 10 }, { rendimiento: 20 }, { rendimiento: -5 }];
    expect(analisis.calcularPromedioRendimiento(arr)).toBe(8.33);
  });

  test("calcularPromedioRendimiento() debe funcionar con un solo elemento", () => {
    const analisis = new AnalisisMercado(mockLista);
    expect(analisis.calcularPromedioRendimiento([{ rendimiento: 7 }])).toBe(7);
  });

  // calcularCostoTotal()
  test("calcularCostoTotal() debe devolver 0 si el arreglo está vacío", () => {
    const analisis = new AnalisisMercado(mockLista);
    expect(analisis.calcularCostoTotal([])).toBe(0);
  });

  test("calcularCostoTotal() debe sumar correctamente los precios", () => {
    const analisis = new AnalisisMercado(mockLista);
    const arr = [{ precio: 100 }, { precio: 250 }, { precio: 50 }];
    expect(analisis.calcularCostoTotal(arr)).toBe(400);
  });

  test("calcularCostoTotal() debe funcionar con un solo elemento", () => {
    const analisis = new AnalisisMercado(mockLista);
    expect(analisis.calcularCostoTotal([{ precio: 99 }])).toBe(99);
  });
});
