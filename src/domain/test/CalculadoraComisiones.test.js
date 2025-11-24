import { describe, test, expect, beforeEach } from "@jest/globals";
import CalculadoraComisiones from "../CalculadoraComisiones.js";

describe("CalculadoraComisiones", () => {
  let calc;

  beforeEach(() => {
    calc = new CalculadoraComisiones();
  });

  // obtenerTasa()
  test("obtenerTasa debe devolver la tasa correcta para USD", () => {
    expect(calc.obtenerTasa("deposito", "USD")).toBe(1.1);
    expect(calc.obtenerTasa("compra", "USD")).toBe(0.8);
  });

  test("obtenerTasa debe devolver la tasa correcta para UYU", () => {
    expect(calc.obtenerTasa("retiro", "UYU")).toBe(1.6);
    expect(calc.obtenerTasa("venta", "UYU")).toBe(1.2);
  });

  test("obtenerTasa debe devolver 0 si la moneda existe pero la operación no", () => {
    expect(calc.obtenerTasa("inexistente", "USD")).toBe(0);
  });

  test("obtenerTasa debe devolver 0 si la moneda no existe", () => {
    expect(calc.obtenerTasa("compra", "EUR")).toBe(0);
  });

  // calcular()
  test("calcular debe devolver comisión y neto correctos", () => {
    const { comision, neto } = calc.calcular(1000, 10);
    expect(comision).toBe(100);
    expect(neto).toBe(900);
  });

  test("calcular debe manejar monto 0", () => {
    const { comision, neto } = calc.calcular(0, 10);
    expect(comision).toBe(0);
    expect(neto).toBe(0);
  });

  test("calcular debe manejar tasa 0", () => {
    const { comision, neto } = calc.calcular(500, 0);
    expect(comision).toBe(0);
    expect(neto).toBe(500);
  });

  // calcularPorOperacion()
  test("calcularPorOperacion debe calcular correctamente usando obtenerTasa", () => {
    const res = calc.calcularPorOperacion(1000, "deposito", "USD");
    expect(res.tasa).toBe(1.1);
    expect(res.comision).toBeCloseTo(11);
    expect(res.neto).toBeCloseTo(989);
  });

  test("calcularPorOperacion debe funcionar cuando operación no existe", () => {
    const res = calc.calcularPorOperacion(1000, "inexistente", "USD");
    expect(res.tasa).toBe(0);
    expect(res.comision).toBe(0);
    expect(res.neto).toBe(1000);
  });

  test("calcularPorOperacion debe funcionar cuando la moneda no existe", () => {
    const res = calc.calcularPorOperacion(500, "compra", "EUR");
    expect(res.tasa).toBe(0);
    expect(res.comision).toBe(0);
    expect(res.neto).toBe(500);
  });
});
