import { describe, test, expect, jest } from "@jest/globals";
import Activo from "../Activo.js";

describe("Activo", () => {
  describe("constructor", () => {
    test("debe crear un activo con los valores correctos", () => {
      const activo = new Activo(1, "Microsoft", "Acciones", 500, "USD", 0.05);

      expect(activo.id).toBe(1);
      expect(activo.nombre).toBe("Microsoft");
      expect(activo.tipo).toBe("Acciones");
      expect(activo.precio).toBe(500);
      expect(activo.moneda).toBe("USD");
      expect(activo.precioBase).toBe(500);
      expect(activo.rendimiento).toBe(0);
      expect(activo.volatilidad).toBe(0.05);
      expect(activo.historial).toEqual([500]);
    });

    test("volatilidad por defecto debe ser 0.04", () => {
      const activo = new Activo(2, "Bitcoin", "Cripto", 10000, "USD");

      expect(activo.volatilidad).toBe(0.04);
    });
  });

  describe("getHistorial()", () => {
    test("debe devolver el historial completo", () => {
      const activo = new Activo(1, "Microsoft", "Acciones", 500, "USD");
      expect(activo.getHistorial()).toEqual([500]);
    });
  });

  describe("generarVariacion()", () => {
    test("debe modificar el precio dentro del rango esperado según volatilidad", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.75);
      const activo = new Activo(1, "Microsoft", "Acciones", 100, "USD", 0.1);
      activo.generarVariacion();
      // random = 0.75 ⇒ (0.75 * 2 - 1) = 0.5
      // delta = 0.5 * 0.1 * 100 = 5
      expect(activo.precio).toBeCloseTo(105, 5);
      // rendimiento = ((105 - 100) / 100) * 100 = 5%
      expect(activo.rendimiento).toBeCloseTo(5, 5);
      expect(activo.historial.length).toBe(2);
      Math.random.mockRestore();
    });

    test("el precio nunca debe bajar de 0", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      const activo = new Activo(1, "KO", "Acciones", 5, "USD", 1);
      activo.generarVariacion();
      expect(activo.precio).toBeGreaterThanOrEqual(0);
      Math.random.mockRestore();
    });

    test("el historial no debe crecer más de 300 elementos", () => {
      const activo = new Activo(1, "Microsoft", "Acciones", 500, "USD");
      activo.historial = Array(300).fill(500);
      jest.spyOn(Math, "random").mockReturnValue(1);
      activo.generarVariacion();
      expect(activo.historial.length).toBe(300);
      Math.random.mockRestore();
    });

    test("generarVariacion no debe activar el ajuste a 0 cuando el precio no cae por debajo de 0", () => {
      // Math.random = 1 → (1 * 2 - 1) = 1
      // delta = 1 * volatilidad * precio = precio * volatilidad (sube siempre)
      jest.spyOn(Math, "random").mockReturnValue(1);
      const activo = new Activo(10, "Prueba", "Acciones", 100, "USD", 0.05);
      activo.generarVariacion();
      // precio debe haber subido, nunca bajado
      expect(activo.precio).toBeGreaterThan(100);
      // NO debe haber activado el if precio<0
      expect(activo.precio).not.toBe(0);
      Math.random.mockRestore();
    });
  });

  test("debe activar la rama del precio negativo", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    const activo = new Activo(1, "X", "Acciones", 10, "USD", 1);
    activo.generarVariacion();
    expect(activo.precio).toBe(0);
    Math.random.mockRestore();
  });

  test("debe activar la rama del precio positivo (else)", () => {
    jest.spyOn(Math, "random").mockReturnValue(1);
    const activo = new Activo(1, "X", "Acciones", 10, "USD", 1);
    activo.generarVariacion();
    expect(activo.precio).toBeGreaterThan(10);
    Math.random.mockRestore();
  });

  test("Cuando el precio es negativo", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    const activoSeguro = new Activo(
      1,
      "NegativoSeguro",
      "Acciones",
      1,
      "USD",
      2,
    );

    activoSeguro.generarVariacion();
    expect(activoSeguro.precio).toBe(0);
    Math.random.mockRestore();
  });
});
