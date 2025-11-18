import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import Billetera from "../Billetera.js";

describe("Billetera", () => {
  let mockCuenta;
  let billetera;

  beforeEach(() => {
    mockCuenta = {
      depositar: jest.fn(),
      retirar: jest.fn(),
    };

    billetera = new Billetera(mockCuenta);
  });

  // constructor
  test("debe guardar la cuenta correctamente", () => {
    expect(billetera).toBeInstanceOf(Billetera);
    // verificamos que usa exactamente la cuenta mockeada
    billetera.depositar("USD", 10);
    expect(mockCuenta.depositar).toHaveBeenCalled();
  });

  // depositar()
  test("depositar debe delegar en cuenta.depositar", () => {
    billetera.depositar("USD", 50);
    expect(mockCuenta.depositar).toHaveBeenCalledTimes(1);
    expect(mockCuenta.depositar).toHaveBeenCalledWith("USD", 50);
  });

  // retirar()
  test("retirar debe delegar en cuenta.retirar y devolver su resultado", () => {
    mockCuenta.retirar.mockReturnValue(true);
    const resultado = billetera.retirar("USD", 20);
    expect(mockCuenta.retirar).toHaveBeenCalledTimes(1);
    expect(mockCuenta.retirar).toHaveBeenCalledWith("USD", 20);
    expect(resultado).toBe(true);
  });

  test("retirar debe devolver lo que diga la cuenta aunque sea false", () => {
    mockCuenta.retirar.mockReturnValue(false);
    const resultado = billetera.retirar("USD", 1000);
    expect(resultado).toBe(false);
  });
});
