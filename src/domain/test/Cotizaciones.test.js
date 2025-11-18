import { describe, test, expect, beforeEach } from "@jest/globals";
import Cotizaciones from "../Cotizaciones.js";

let cot;

beforeEach(() => {
  cot = new Cotizaciones();
});

describe("Cotizaciones", () => {
  // monedaActual getter
  describe("monedaActual (getter)", () => {
    test("debe ser USD por defecto", () => {
      expect(cot.monedaActual).toBe("USD");
    });
  });

  // cambiarMoneda()
  describe("cambiarMoneda()", () => {
    test("debe cambiar la moneda actual", () => {
      cot.cambiarMoneda("UYU");
      expect(cot.monedaActual).toBe("UYU");
    });

    test("debe aceptar cualquier string como moneda", () => {
      cot.cambiarMoneda("EUR");
      expect(cot.monedaActual).toBe("EUR");
    });
  });

  // convertir()
  describe("convertir(monto, de, a)", () => {
    test("convierte de USD a UYU correctamente", () => {
      // USD=1, UYU=40 → monto * (40/1)
      expect(cot.convertir(10, "USD", "UYU")).toBe(400);
    });

    test("convierte de UYU a USD correctamente", () => {
      // 1 UYU = 1/40 USD
      expect(cot.convertir(40, "UYU", "USD")).toBe(1);
    });

    test("convierte entre la misma moneda sin cambios", () => {
      expect(cot.convertir(100, "USD", "USD")).toBe(100);
      expect(cot.convertir(100, "UYU", "UYU")).toBe(100);
    });

    test("funciona con decimales", () => {
      expect(cot.convertir(2.5, "USD", "UYU")).toBeCloseTo(100);
    });

    test("funciona con monto 0", () => {
      expect(cot.convertir(0, "USD", "UYU")).toBe(0);
    });

    test("funciona con números negativos (comportamiento nativo)", () => {
      expect(cot.convertir(-10, "USD", "UYU")).toBe(-400);
    });
  });
});
