import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import Controller from "../Controller.js";

describe("Controller", () => {
  let controller;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new Controller();

    controller.modo = { modo: "demo" };

    controller.listaActivos = {
      cargarActivosDemo: jest.fn(),
      cargarActivosReales: jest.fn(),
      getListaParaModo: jest.fn().mockReturnValue([]),
      getPorId: jest.fn(),
      buscarPorTipo: jest.fn().mockReturnValue([]),
    };

    controller.cuentaDemo = { saldoUSD: 1000, saldoUYU: 50000 };
    controller.cuentaReal = { saldoUSD: 2000, saldoUYU: 80000 };

    controller.cotizaciones = {
      monedaActual: "USD",
      convertir: jest.fn((m) => m),
      cambiarMoneda: jest.fn(),
    };

    controller.historialDemo = {
      registrar: jest.fn(),
      obtenerUltimas: jest.fn().mockReturnValue([]),
    };

    controller.historialReal = {
      registrar: jest.fn(),
      obtenerUltimas: jest.fn().mockReturnValue([]),
    };

    controller.controlOperaciones = {
      calcularDinero: jest.fn(() => 100),
      calcularCantidad: jest.fn(() => 2),
    };

    controller.portafolioDemo = {
      agregar: jest.fn(),
      restar: jest.fn(),
      tiene: jest.fn().mockReturnValue(true),
      getActivos: jest.fn().mockReturnValue([]),
    };

    controller.portafolioReal = {
      agregar: jest.fn(),
      restar: jest.fn(),
      tiene: jest.fn().mockReturnValue(true),
      getActivos: jest.fn().mockReturnValue([]),
    };
  });

  // GETTERS

  test("getModo", () => {
    expect(controller.getModo()).toBe("demo");
  });

  test("getCuenta", () => {
    expect(controller.getCuenta()).toBe(controller.cuentaDemo);
    controller.setModo(false);
    expect(controller.getCuenta()).toBe(controller.cuentaReal);
  });

  test("getPortafolio", () => {
    expect(controller.getPortafolio()).toBe(controller.portafolioDemo);
    controller.setModo(false);
    expect(controller.getPortafolio()).toBe(controller.portafolioReal);
  });

  test("getHistorial", () => {
    expect(controller.getHistorial()).toBe(controller.historialDemo);
    controller.setModo(false);
    expect(controller.getHistorial()).toBe(controller.historialReal);
  });

  // setModo
  test("setModo cambia correctamente", () => {
    controller.listaActivos.getListaParaModo.mockReturnValue([]);
    const r1 = controller.setModo(false);
    expect(r1.modo).toBe("real");
    const r2 = controller.setModo(true);
    expect(r2.modo).toBe("demo");
  });

  test("setModo establece precioBase al cambiar a real", () => {
    const activo = { id: 1, nombre: "X", precio: 123, precioBase: 0 };
    controller.listaActivos.getListaParaModo.mockReturnValue([activo]);
    controller.setModo(false);
    expect(activo.precioBase).toBe(123);
  });

  // getListaActivos}
  test("getListaActivos mapea correctamente", () => {
    controller.listaActivos.getListaParaModo.mockReturnValue([
      {
        id: 1,
        nombre: "MSFT",
        tipo: "Acciones",
        precio: 100,
        moneda: "USD",
        rendimiento: 5,
      },
    ]);

    expect(controller.getListaActivos()).toEqual([
      {
        id: 1,
        nombre: "MSFT",
        tipo: "Acciones",
        precio: 100,
        moneda: "USD",
        rendimiento: 5,
      },
    ]);
  });

  // buscarActivosPorTipo
  test("buscarActivosPorTipo -> todos", () => {
    jest
      .spyOn(controller, "getListaActivos")
      .mockReturnValue([{ id: 10, nombre: "A" }]);
    expect(controller.buscarActivosPorTipo("todos")).toEqual([
      { id: 10, nombre: "A" },
    ]);
  });

  test("buscarActivosPorTipo -> traducir Criptomonedas", () => {
    controller.listaActivos.buscarPorTipo.mockReturnValue([
      { id: 1, nombre: "BTC" },
    ]);
    expect(controller.buscarActivosPorTipo("Criptomonedas")).toEqual([
      { id: 1, nombre: "BTC" },
    ]);
  });

  const tipos = ["", "Bonos", "limite", "market", "Forex", "stop", "Acciones"];
  tipos.forEach((t) => {
    test(`buscarActivosPorTipo -> ${t}`, () => {
      controller.listaActivos.buscarPorTipo.mockReturnValue([{ id: 1 }]);
      expect(controller.buscarActivosPorTipo(t)).toEqual([{ id: 1 }]);
    });
  });

  test("buscarActivosPorTipo -> default", () => {
    controller.listaActivos.buscarPorTipo.mockReturnValue([
      { id: 99, nombre: "X" },
    ]);
    expect(controller.buscarActivosPorTipo("MetalesRaros")).toEqual([
      { id: 99, nombre: "X" },
    ]);
  });

  // getDatosActivo
  test("getDatosActivo -> null si no existe", () => {
    controller.listaActivos.getPorId.mockReturnValue(null);
    expect(controller.getDatosActivo(123)).toBeNull();
  });

  test("getDatosActivo convierte datos", () => {
    controller.listaActivos.getPorId.mockReturnValue({
      id: 1,
      nombre: "ETH",
      tipo: "Cripto",
      precio: 50,
      moneda: "USD",
    });
    const r = controller.getDatosActivo(1);
    expect(r.precioNumerico).toBe(50);
    expect(r.precioTexto).toBe("50.00 USD");
  });

  test("getDatosActivo convierte USD a UYU si monedaActual es UYU", () => {
    controller.listaActivos.getPorId.mockReturnValue({
      id: 1,
      nombre: "T",
      tipo: "Acciones",
      precio: 100,
      moneda: "USD",
    });
    controller.cotizaciones.monedaActual = "UYU";
    controller.cotizaciones.convertir.mockReturnValue(3800);
    const r = controller.getDatosActivo(1);
    expect(r.precioNumerico).toBe(3800);
    expect(r.precioTexto).toBe("3800.00 UYU");
  });

  test("getDatosActivo convierte UYU a USD si monedaActual es USD", () => {
    controller.listaActivos.getPorId.mockReturnValue({
      id: 1,
      nombre: "T",
      tipo: "Acciones",
      precio: 2000,
      moneda: "UYU",
    });
    controller.cotizaciones.monedaActual = "USD";
    controller.cotizaciones.convertir.mockReturnValue(50);
    const r = controller.getDatosActivo(1);
    expect(r.precioNumerico).toBe(50);
    expect(r.precioTexto).toBe("50.00 USD");
  });

  // cambiarMoneda

  test("cambiarMoneda rechaza moneda inválida", () => {
    expect(controller.cambiarMoneda("ARS").ok).toBe(false);
  });

  test("cambiarMoneda acepta moneda válida", () => {
    expect(controller.cambiarMoneda("UYU").ok).toBe(true);
  });

  // calcularDinero

  test("calcularDinero -> activo no existe", () => {
    controller.listaActivos.getPorId.mockReturnValue(null);
    expect(controller.calcularDinero(99, 10)).toEqual({
      dineroNumerico: 0,
      dineroTexto: "0",
    });
  });

  test("calcularDinero usa controlOperaciones", () => {
    controller.listaActivos.getPorId.mockReturnValue({
      precio: 100,
      moneda: "USD",
    });
    expect(controller.calcularDinero(1, 20).dineroNumerico).toBe(100);
  });

  test("convertirMoneda llama a cotizaciones.convertir", () => {
    const spy = jest.spyOn(controller.cotizaciones, "convertir");

    controller.convertirMoneda(100, "USD", "UYU");

    expect(spy).toHaveBeenCalledWith(100, "USD", "UYU");
  });

  // calcularCantidad
  test("calcularCantidad -> activo no existe", () => {
    controller.listaActivos.getPorId.mockReturnValue(null);
    expect(controller.calcularCantidad(1, 200)).toEqual({
      cantidadNumerica: 0,
      cantidadTexto: "0",
    });
  });

  test("calcularCantidad usa controlOperaciones", () => {
    controller.listaActivos.getPorId.mockReturnValue({
      precio: 200,
      moneda: "USD",
    });
    expect(controller.calcularCantidad(1, 100).cantidadNumerica).toBe(2);
  });

  // realizarCompra

  describe("realizarCompra", () => {
    test("activo no existe", () => {
      controller.listaActivos.getPorId.mockReturnValue(null);
      expect(controller.realizarCompra(1, 5).ok).toBe(false);
    });

    test("cantidad <= 0", () => {
      controller.listaActivos.getPorId.mockReturnValue({
        precio: 10,
        moneda: "USD",
      });
      expect(controller.realizarCompra(1, 0).ok).toBe(false);
    });

    test("fondos insuficientes", () => {
      controller.cuentaDemo.saldoUSD = 0;
      controller.listaActivos.getPorId.mockReturnValue({
        precio: 10,
        moneda: "USD",
      });
      expect(controller.realizarCompra(1, 1).ok).toBe(false);
    });

    test("compra OK", () => {
      controller.listaActivos.getPorId.mockReturnValue({
        id: 1,
        nombre: "MSFT",
        precio: 10,
        moneda: "USD",
      });
      const r = controller.realizarCompra(1, 1);
      expect(r.ok).toBe(true);
      expect(controller.portafolioDemo.agregar).toHaveBeenCalled();
      expect(controller.historialDemo.registrar).toHaveBeenCalled();
    });
  });

  // realizarVenta
  describe("realizarVenta", () => {
    test("activo no existe", () => {
      controller.listaActivos.getPorId.mockReturnValue(null);
      expect(controller.realizarVenta(1, 1).ok).toBe(false);
    });

    test("no tiene cantidad", () => {
      controller.listaActivos.getPorId.mockReturnValue({
        id: 1,
        precio: 10,
        moneda: "USD",
      });
      controller.portafolioDemo.tiene.mockReturnValue(false);
      expect(controller.realizarVenta(1, 1).ok).toBe(false);
    });

    test("cantidad <= 0", () => {
      controller.listaActivos.getPorId.mockReturnValue({
        id: 1,
        precio: 10,
        moneda: "USD",
      });
      expect(controller.realizarVenta(1, 0).ok).toBe(false);
    });

    test("venta OK", () => {
      controller.listaActivos.getPorId.mockReturnValue({
        id: 1,
        precio: 10,
        moneda: "USD",
      });
      const r = controller.realizarVenta(1, 1);
      expect(r.ok).toBe(true);
      expect(controller.portafolioDemo.restar).toHaveBeenCalled();
      expect(controller.historialDemo.registrar).toHaveBeenCalled();
    });
  });

  // getHistorialParaVista
  test("getHistorialParaVista formatea resultados", () => {
    controller.historialDemo.obtenerUltimas.mockReturnValue([
      {
        tipo: "compra",
        activo: { nombre: "BTC" },
        cantidad: 2,
        precioUnitario: 100,
        fecha: new Date("2023-01-01T00:00:00"),
      },
    ]);
    const r = controller.getHistorialParaVista();
    expect(r[0].tipo).toBe("compra");
    expect(r[0].texto.includes("COMPRA")).toBe(true);
  });

  test("getHistorialParaVista historial vacío", () => {
    controller.historialDemo.obtenerUltimas.mockReturnValue([]);
    expect(controller.getHistorialParaVista()).toEqual([]);
  });

  // getPortafolioParaVista
  test("getPortafolioParaVista mapea activos válidos", () => {
    controller.portafolioDemo.getActivos.mockReturnValue([
      { id: 1, cantidad: 10 },
    ]);
    controller.listaActivos.getListaParaModo.mockReturnValue([
      {
        id: 1,
        nombre: "MSFT",
        tipo: "Acciones",
        precio: 10,
        moneda: "USD",
        rendimiento: 3,
      },
    ]);
    const r = controller.getPortafolioParaVista();
    expect(r[0].nombre).toBe("MSFT");
    expect(r[0].cantidad).toBe(10);
  });

  test("getPortafolioParaVista ignora items sin activo asociado", () => {
    controller.portafolioDemo.getActivos.mockReturnValue([
      { id: 1, cantidad: 5 },
    ]);
    controller.listaActivos.getListaParaModo.mockReturnValue([
      { id: 2, nombre: "Otro" },
    ]);
    expect(controller.getPortafolioParaVista()).toEqual([]);
  });

  test("getPortafolioParaVista permite cantidad 0", () => {
    controller.portafolioDemo.getActivos.mockReturnValue([
      { id: 1, cantidad: 0 },
    ]);
    controller.listaActivos.getListaParaModo.mockReturnValue([
      {
        id: 1,
        nombre: "AAPL",
        tipo: "Acciones",
        precio: 150,
        moneda: "USD",
        rendimiento: 2,
      },
    ]);
    const r = controller.getPortafolioParaVista();
    expect(r[0]).toEqual({
      id: 1,
      nombre: "AAPL",
      tipo: "Acciones",
      precio: 150,
      moneda: "USD",
      rendimiento: 2,
      cantidad: 0,
    });
  });

  test("getPortafolioParaVista filtra múltiples items", () => {
    controller.portafolioDemo.getActivos.mockReturnValue([
      { id: 1, cantidad: 3 },
      { id: 2, cantidad: 4 },
    ]);
    controller.listaActivos.getListaParaModo.mockReturnValue([
      {
        id: 1,
        nombre: "TSLA",
        tipo: "Acciones",
        precio: 800,
        moneda: "USD",
        rendimiento: 7,
      },
    ]);
    const r = controller.getPortafolioParaVista();
    expect(r.length).toBe(1);
    expect(r[0].id).toBe(1);
  });

  test("getPortafolioParaVista retorna todos los campos", () => {
    controller.portafolioDemo.getActivos.mockReturnValue([
      { id: 5, cantidad: 12 },
    ]);
    controller.listaActivos.getListaParaModo.mockReturnValue([
      {
        id: 5,
        nombre: "NVDA",
        tipo: "Acciones",
        precio: 1000,
        moneda: "USD",
        rendimiento: 10,
      },
    ]);
    const r = controller.getPortafolioParaVista();
    expect(r[0]).toEqual({
      id: 5,
      nombre: "NVDA",
      tipo: "Acciones",
      precio: 1000,
      moneda: "USD",
      rendimiento: 10,
      cantidad: 12,
    });
  });

  // getSaldos

  test("getSaldos funciona", () => {
    const r = controller.getSaldos();
    expect(r.USD.total).toBe(1000);
    expect(r.UYU.total).toBe(50000);
  });

  // depositar / retirar
  test("depositar suma", () => {
    controller.depositar("USD", 100);
    expect(controller.cuentaDemo.saldoUSD).toBe(1100);
  });

  test("depositar UYU suma correctamente", () => {
    controller.depositar("UYU", 1000);
    expect(controller.cuentaDemo.saldoUYU).toBe(51000);
  });

  test("depositar monto <= 0 da error", () => {
    expect(controller.depositar("USD", 0).ok).toBe(false);
    expect(controller.depositar("USD", -10).ok).toBe(false);
  });

  test("retirar USD con éxito", () => {
    const r = controller.retirar("USD", 100);
    expect(r.ok).toBe(true);
    expect(controller.cuentaDemo.saldoUSD).toBe(900);
  });

  test("retirar UYU fondos insuficientes", () => {
    controller.cuentaDemo.saldoUYU = 50;
    expect(controller.retirar("UYU", 100).ok).toBe(false);
  });

  test("retirar UYU con éxito", () => {
    const r = controller.retirar("UYU", 100);
    expect(r.ok).toBe(true);
    expect(controller.cuentaDemo.saldoUYU).toBe(49900);
  });

  test("retirar USD fondos insuficientes", () => {
    controller.cuentaDemo.saldoUSD = 50;
    const r = controller.retirar("USD", 100);
    expect(r.ok).toBe(false);
    expect(r.mensaje).toBe("Fondos insuficientes en USD.");
  });

  test("retirar USD -> monto <= 0", () => {
    expect(controller.retirar("USD", 0).ok).toBe(false);
    expect(controller.retirar("USD", -5).ok).toBe(false);
  });

  test("retirar UYU -> monto <= 0", () => {
    expect(controller.retirar("UYU", 0).ok).toBe(false);
    expect(controller.retirar("UYU", -10).ok).toBe(false);
  });

  test("retirar moneda NO soportada", () => {
    const r = controller.retirar("BTC", 100);
    expect(r.ok).toBe(true);
    expect(r.mensaje).toBe("Retiro realizado.");
  });

  // Simulación de mercado
  test("iniciarSimulacionMercado crea intervalo", () => {
    jest.useFakeTimers();
    const spySet = jest.spyOn(global, "setInterval");
    controller.iniciarSimulacionMercado();
    expect(spySet).toHaveBeenCalledTimes(1);
  });

  test("detenerSimulacionMercado limpia intervalo", () => {
    jest.useFakeTimers();
    const spyClear = jest.spyOn(global, "clearInterval");
    controller.iniciarSimulacionMercado();
    controller.detenerSimulacionMercado();
    expect(spyClear).toHaveBeenCalledTimes(1);
  });

  test("simulación ejecuta generarVariacion", () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    controller.listaActivos.getListaParaModo.mockReturnValue([
      { generarVariacion: fn },
    ]);
    controller.iniciarSimulacionMercado();
    jest.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalled();
  });

  test("iniciarSimulacionMercado limpia intervalo previo", () => {
    jest.useFakeTimers();
    const spyClear = jest.spyOn(global, "clearInterval");
    controller.intervaloSimulacion = 123;
    controller.iniciarSimulacionMercado();
    expect(spyClear).toHaveBeenCalledTimes(1);
  });

  test("detenerSimulacionMercado sin intervalo no llama clearInterval", () => {
    jest.useFakeTimers();
    const spyClear = jest.spyOn(global, "clearInterval");
    controller.intervaloSimulacion = null;
    controller.detenerSimulacionMercado();
    expect(spyClear).not.toHaveBeenCalled();
  });

  // Métodos privados
  test("_compraFondosSuficientes", () => {
    const c = { saldoUSD: 100, saldoUYU: 200 };
    expect(controller._compraFondosSuficientes(c, "USD", 50)).toBe(true);
    expect(controller._compraFondosSuficientes(c, "USD", 150)).toBe(false);
    expect(controller._compraFondosSuficientes(c, "UYU", 50)).toBe(true);
    expect(controller._compraFondosSuficientes(c, "UYU", 250)).toBe(false);
  });

  test("_compraMensajeFondos", () => {
    expect(controller._compraMensajeFondos("USD")).toEqual({
      ok: false,
      mensaje: "Fondos insuficientes en USD",
    });

    expect(controller._compraMensajeFondos("UYU")).toEqual({
      ok: false,
      mensaje: "Fondos insuficientes en UYU",
    });
  });

  test("_compraDescontarFondos", () => {
    const c = { saldoUSD: 100, saldoUYU: 100 };

    controller._compraDescontarFondos(c, "USD", 20);
    expect(c.saldoUSD).toBe(80);

    controller._compraDescontarFondos(c, "UYU", 30);
    expect(c.saldoUYU).toBe(70);
  });

  test("_compraRegistrar crea operación", () => {
    const port = { agregar: jest.fn() };
    const hist = { registrar: jest.fn() };
    const activo = { id: 1, nombre: "MSFT" };

    const r = controller._compraRegistrar(port, hist, activo, 2, 10);

    expect(r.ok).toBe(true);
    expect(port.agregar).toHaveBeenCalled();
    expect(hist.registrar).toHaveBeenCalled();
  });

  test("_ventaTieneCantidad", () => {
    const port = { tiene: jest.fn().mockReturnValue(true) };
    expect(controller._ventaTieneCantidad(port, 1, 5)).toBe(true);
  });

  test("_ventaTieneCantidad -> false", () => {
    const port = { tiene: jest.fn().mockReturnValue(false) };
    expect(controller._ventaTieneCantidad(port, 1, 5)).toBe(false);
  });

  test("_ventaMensajeCantidad", () => {
    expect(controller._ventaMensajeCantidad()).toEqual({
      ok: false,
      mensaje: "No tenés esa cantidad para vender",
    });
  });

  test("_ventaSumarFondos", () => {
    const c = { saldoUSD: 50, saldoUYU: 20 };
    controller._ventaSumarFondos(c, "USD", 30);
    expect(c.saldoUSD).toBe(80);
    controller._ventaSumarFondos(c, "UYU", 10);
    expect(c.saldoUYU).toBe(30);
  });

  test("_ventaRegistrar crea operación completa", () => {
    const hist = { registrar: jest.fn() };
    const activo = { id: 7, nombre: "ORO" };
    const r = controller._ventaRegistrar(hist, activo, 3, 150);
    expect(r.ok).toBe(true);
    expect(hist.registrar).toHaveBeenCalled();
    const op = hist.registrar.mock.calls[0][0];
    expect(op.tipo).toBe("venta");
    expect(op.activo).toBe(activo);
    expect(op.cantidad).toBe(3);
    expect(op.precioUnitario).toBe(150);
  });

  test("_verificarFondos", () => {
    const c = { saldoUSD: 100, saldoUYU: 200 };
    expect(controller._verificarFondos(c, "USD", 50).ok).toBe(true);
    expect(controller._verificarFondos(c, "USD", 150).ok).toBe(false);
    expect(controller._verificarFondos(c, "UYU", 150).ok).toBe(true);
    expect(controller._verificarFondos(c, "UYU", 250).ok).toBe(false);
  });

  test("_descontarFondos", () => {
    const c = { saldoUSD: 100, saldoUYU: 200 };
    controller._descontarFondos(c, "USD", 40);
    expect(c.saldoUSD).toBe(60);
    controller._descontarFondos(c, "UYU", 50);
    expect(c.saldoUYU).toBe(150);
  });
});
