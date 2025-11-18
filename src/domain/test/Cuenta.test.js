import { describe, test, expect, beforeEach } from "@jest/globals";
import Cuenta from "../Cuenta.js";

let cuenta;

beforeEach(() => {
  cuenta = new Cuenta();
});

describe("Cuenta", () => {
  // getSaldo()
  describe("getSaldo()", () => {
    test("debe devolver un objeto con total, disponible y garantia", () => {
      const saldo = cuenta.getSaldo("USD");
      expect(saldo).toHaveProperty("total");
      expect(saldo).toHaveProperty("disponible");
      expect(saldo).toHaveProperty("garantia");
    });

    test("las propiedades deben ser valores iniciales correctos para USD", () => {
      const saldo = cuenta.getSaldo("USD");
      expect(saldo.total).toBe(10000);
      expect(saldo.disponible).toBe(10000);
      expect(saldo.garantia).toBe(0);
    });

    test("debe devolver una copia, no el objeto real", () => {
      const saldo = cuenta.getSaldo("USD");
      saldo.total = 0;

      // Verificamos que NO haya cambiado internamente
      const saldoInterno = cuenta.getSaldo("USD");
      expect(saldoInterno.total).toBe(10000);
    });
  });

  // depositar()
  describe("depositar()", () => {
    test("debe aumentar total y disponible", () => {
      cuenta.depositar("USD", 500);
      const saldo = cuenta.getSaldo("USD");

      expect(saldo.total).toBe(10500);
      expect(saldo.disponible).toBe(10500);
    });

    test("puede depositar en UYU correctamente", () => {
      cuenta.depositar("UYU", 2000);
      const saldo = cuenta.getSaldo("UYU");

      expect(saldo.total).toBe(2000);
      expect(saldo.disponible).toBe(2000);
    });

    test("depositar 0 no modifica saldos", () => {
      cuenta.depositar("USD", 0);
      const saldo = cuenta.getSaldo("USD");

      expect(saldo.total).toBe(10000);
      expect(saldo.disponible).toBe(10000);
    });

    test("depositar valores negativos reduce el saldo (comportamiento nativo)", () => {
      cuenta.depositar("USD", -100);
      const saldo = cuenta.getSaldo("USD");

      expect(saldo.total).toBe(9900);
      expect(saldo.disponible).toBe(9900);
    });
  });

  // retirar()
  describe("retirar()", () => {
    test("debe permitir retirar si hay saldo suficiente", () => {
      const exito = cuenta.retirar("USD", 500);

      expect(exito).toBe(true);
      const saldo = cuenta.getSaldo("USD");
      expect(saldo.total).toBe(9500);
      expect(saldo.disponible).toBe(9500);
    });

    test("debe rechazar retiro si no hay fondos suficientes", () => {
      const exito = cuenta.retirar("USD", 20000);

      expect(exito).toBe(false);
      const saldo = cuenta.getSaldo("USD");

      // No debe modificar saldos
      expect(saldo.total).toBe(10000);
      expect(saldo.disponible).toBe(10000);
    });

    test("retirar 0 no debe modificar saldos", () => {
      cuenta.retirar("USD", 0);
      const saldo = cuenta.getSaldo("USD");

      expect(saldo.total).toBe(10000);
      expect(saldo.disponible).toBe(10000);
    });

    test("retirar monto negativo suma saldo (comportamiento nativo)", () => {
      cuenta.retirar("USD", -500);
      const saldo = cuenta.getSaldo("USD");

      expect(saldo.total).toBe(10500);
      expect(saldo.disponible).toBe(10500);
    });
  });
});
