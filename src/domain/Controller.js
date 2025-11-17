import ListaActivos from "./ListaActivos.js";
import Modo from "./Modo.js";
import CuentaDemo from "./CuentaDemo.js";
import CuentaReal from "./CuentaReal.js";
import Cotizaciones from "./Cotizaciones.js";
import HistorialOperaciones from "./HistorialOperaciones.js";
import ControlOperaciones from "./ControlOperaciones.js";
import Portafolio from "./Portafolio.js";
import Operaciones from "./Operaciones.js";

export default class Controller {
  constructor() {
    this.modo = new Modo();
    this.listaActivos = new ListaActivos();

    this.listaActivos.cargarActivosDemo();
    this.listaActivos.cargarActivosReales();

    this.cuentaDemo = new CuentaDemo();
    this.cuentaReal = new CuentaReal();

    this.cotizaciones = new Cotizaciones();

    
    this.historialDemo = new HistorialOperaciones();
    this.historialReal = new HistorialOperaciones();

    this.controlOperaciones = new ControlOperaciones(this.cotizaciones);

    this.portafolioDemo = new Portafolio();
    this.portafolioReal = new Portafolio();

    this.monedasPermitidas = ["USD", "UYU"];
  }

  getCuenta() {
    return this.modo.modo === "demo" ? this.cuentaDemo : this.cuentaReal;
  }

  getPortafolio() {
    return this.modo.modo === "demo"
      ? this.portafolioDemo
      : this.portafolioReal;
  }

  getHistorial() {
    return this.modo.modo === "demo" ? this.historialDemo : this.historialReal;
  }

  setModo(esDemo) {
    this.modo.modo = esDemo ? "demo" : "real";

    const lista = this.listaActivos.getListaParaModo(this.modo.modo);
    lista.forEach((a) => (a.precioBase = a.precio));

    return {
      ok: true,
      modo: this.modo.modo,
      mensaje: `Modo cambiado a ${this.modo.modo.toUpperCase()}`,
    };
  }

  getModo() {
    return this.modo.modo;
  }

  getListaActivos() {
    const lista = this.listaActivos.getListaParaModo(this.modo.modo);

    return lista.map((a) => ({
      id: a.id,
      nombre: a.nombre,
      tipo: a.tipo,
      precio: a.precio,
      moneda: a.moneda,
      rendimiento: a.rendimiento,
    }));
  }

  buscarActivosPorTipo(valorSelect) {
    if (valorSelect === "todos") {
      return this.getListaActivos();
    }
    let tipoReal;
    switch (valorSelect) {
      case "":
      case "Bonos":
        tipoReal = "Bonos";
        break;
      case "limite":
      case "Criptomonedas":
        tipoReal = "Criptomonedas";
        break;
      case "market":
      case "Forex":
        tipoReal = "Forex";
        break;
      case "stop":
      case "Acciones":
        tipoReal = "Acciones";
        break;
      default:
        tipoReal = valorSelect;
    }
    const lista = this.listaActivos.buscarPorTipo(tipoReal, this.modo.modo);
    return lista.map((a) => ({
      id: a.id,
      nombre: a.nombre,
    }));
  }

  getDatosActivo(id) {
    const activo = this.listaActivos.getPorId(id, this.modo.modo);
    if (!activo) return null;
    const monedaActual = this.cotizaciones.monedaActual;
    const precioConvertido = this.convertirMoneda(
      activo.precio,
      activo.moneda,
      monedaActual
    );
    return {
      id: activo.id,
      nombre: activo.nombre,
      tipo: activo.tipo,
      precioOriginal: activo.precio,
      monedaOriginal: activo.moneda,
      monedaActual,
      precioNumerico: precioConvertido,
      precioTexto: `${precioConvertido.toFixed(2)} ${monedaActual}`,
    };
  }

  cambiarMoneda(moneda) {
    if (!this.monedasPermitidas.includes(moneda)) {
      return { ok: false, mensaje: `Moneda ${moneda} no permitida` };
    }

    this.cotizaciones.cambiarMoneda(moneda);
    return { ok: true, monedaActual: moneda };
  }

  convertirMoneda(monto, desde, hacia) {
    return this.cotizaciones.convertir(monto, desde, hacia);
  }

  calcularDinero(idActivo, cantidad) {
    const activo = this.listaActivos.getPorId(idActivo, this.modo.modo);
    if (!activo) return { dineroNumerico: 0, dineroTexto: "0" };
    const precio = this.convertirMoneda(
      activo.precio,
      activo.moneda,
      this.cotizaciones.monedaActual
    );
    const dinero = this.controlOperaciones.calcularDinero(cantidad, precio);
    return {
      dineroNumerico: dinero,
      dineroTexto: dinero.toFixed(2),
    };
  }

  calcularCantidad(idActivo, dinero) {
    const activo = this.listaActivos.getPorId(idActivo, this.modo.modo);
    if (!activo) return { cantidadNumerica: 0, cantidadTexto: "0" };
    const precio = this.convertirMoneda(
      activo.precio,
      activo.moneda,
      this.cotizaciones.monedaActual
    );
    const cantidad = this.controlOperaciones.calcularCantidad(dinero, precio);
    return {
      cantidadNumerica: cantidad,
      cantidadTexto: cantidad.toFixed(4),
    };
  }

  realizarCompra(idActivo, cantidad) {
    const cuenta = this.getCuenta();
    const portafolio = this.getPortafolio();
    const historial = this.getHistorial();
    const activo = this.listaActivos.getPorId(idActivo, this.modo.modo);
    if (!activo) return { ok: false, mensaje: "Activo no encontrado" };
    if (cantidad <= 0)
      return { ok: false, mensaje: "La cantidad debe ser mayor a cero." };
    const monedaActual = this.cotizaciones.monedaActual;
    const precio = this.convertirMoneda(
      activo.precio,
      activo.moneda,
      monedaActual
    );
    const costoTotal = precio * cantidad;
    if (!this._compraFondosSuficientes(cuenta, monedaActual, costoTotal))
      return this._compraMensajeFondos(monedaActual);
    this._compraDescontarFondos(cuenta, monedaActual, costoTotal);
    return this._compraRegistrar(portafolio, historial, activo, cantidad, precio);
  }

  _compraFondosSuficientes(cuenta, monedaActual, costoTotal) {
    if (monedaActual === "UYU") {
      return cuenta.saldoUYU >= costoTotal;
    } else {
      return cuenta.saldoUSD >= costoTotal;
    }
  }

  _compraMensajeFondos(monedaActual) {
    if (monedaActual === "UYU") {
      return { ok: false, mensaje: "Fondos insuficientes en UYU" };
    } else {
      return { ok: false, mensaje: "Fondos insuficientes en USD" };
    }
  }

  _compraDescontarFondos(cuenta, monedaActual, costoTotal) {
    if (monedaActual === "UYU") {
      cuenta.saldoUYU -= costoTotal;
    } else {
      cuenta.saldoUSD -= costoTotal;
    }
  }

  _compraRegistrar(portafolio, historial, activo, cantidad, precio) {
    portafolio.agregar(activo, cantidad);
    const op = new Operaciones("compra", activo, cantidad, precio);
    historial.registrar(op);
    return { ok: true, mensaje: "Compra realizada", operacion: op };
  }

  _verificarFondos(cuenta, monedaActual, costoTotal) {
    if (monedaActual === "UYU") {
      if (cuenta.saldoUYU < costoTotal) {
        return { ok: false, mensaje: "Fondos insuficientes en UYU" };
      }
    } else {
      if (cuenta.saldoUSD < costoTotal) {
        return { ok: false, mensaje: "Fondos insuficientes en USD" };
      }
    }
    return { ok: true };
  }

  _descontarFondos(cuenta, monedaActual, costoTotal) {
    if (monedaActual === "UYU") {
      cuenta.saldoUYU -= costoTotal;
    } else {
      cuenta.saldoUSD -= costoTotal;
    }
  }

  realizarVenta(idActivo, cantidad) {
    const cuenta = this.getCuenta();
    const portafolio = this.getPortafolio();
    const historial = this.getHistorial();
    const activo = this.listaActivos.getPorId(idActivo, this.modo.modo);
    if (!activo) return { ok: false, mensaje: "Activo no encontrado" };
    if (!this._ventaTieneCantidad(portafolio, activo.id, cantidad))
      return this._ventaMensajeCantidad();
    if (cantidad <= 0)
      return { ok: false, mensaje: "La cantidad debe ser mayor a cero." };
    const monedaActual = this.cotizaciones.monedaActual;
    const precio = this.convertirMoneda(
      activo.precio,
      activo.moneda,
      monedaActual
    );
    const ingreso = precio * cantidad;
    this._ventaSumarFondos(cuenta, monedaActual, ingreso);
    portafolio.restar(activo.id, cantidad);
    return this._ventaRegistrar(historial, activo, cantidad, precio);
  }

  _ventaTieneCantidad(portafolio, idActivo, cantidad) {
    return portafolio.tiene(idActivo, cantidad);
  }

  _ventaMensajeCantidad() {
    return { ok: false, mensaje: "No tenés esa cantidad para vender" };
  }

  _ventaSumarFondos(cuenta, monedaActual, ingreso) {
    if (monedaActual === "UYU") {
      cuenta.saldoUYU += ingreso;
    } else {
      cuenta.saldoUSD += ingreso;
    }
  }

  _ventaRegistrar(historial, activo, cantidad, precio) {
    const op = new Operaciones("venta", activo, cantidad, precio);
    historial.registrar(op);
    return { ok: true, mensaje: "Venta realizada", operacion: op };
  }

 
  getHistorialParaVista() {
    const historial = this.getHistorial();

    return historial.obtenerUltimas(10).map((op) => ({
      tipo: op.tipo,
      texto: `${op.tipo.toUpperCase()} — ${op.activo.nombre} — Cant: ${
        op.cantidad
      } — PU: ${op.precioUnitario.toFixed(2)} — ${op.fecha.toLocaleString()}`,
    }));
  }

  getPortafolioParaVista() {
    const port = this.getPortafolio().getActivos();
    const lista = this.listaActivos.getListaParaModo(this.modo.modo);

    return port
      .map((item) => {
        const activo = lista.find((a) => a.id === item.id);
        if (!activo) return null;

        return {
          id: activo.id,
          nombre: activo.nombre,
          tipo: activo.tipo,
          precio: activo.precio,
          rendimiento: activo.rendimiento,
          moneda: activo.moneda,
          cantidad: item.cantidad,
        };
      })
      .filter((x) => x !== null);
  }

  getSaldos() {
    const cuenta = this.getCuenta();

    return {
      USD: {
        total: cuenta.saldoUSD,
        disponible: cuenta.saldoUSD,
        garantia: 0,
      },
      UYU: {
        total: cuenta.saldoUYU,
        disponible: cuenta.saldoUYU,
        garantia: 0,
      },
    };
  }

  depositar(moneda, monto) {
    const cuenta = this.getCuenta();
    if (monto <= 0) {
      return { ok: false, mensaje: "El monto debe ser mayor a 0." };
    }
    if (moneda === "USD") cuenta.saldoUSD += monto;
    else cuenta.saldoUYU += monto;
    return { ok: true, mensaje: "Depósito realizado." };
  }

  retirar(moneda, monto) {
    const cuenta = this.getCuenta();
    if (monto <= 0) {
      return { ok: false, mensaje: "El monto debe ser mayor a 0." };
    }
    if (moneda === "USD") {
      if (cuenta.saldoUSD < monto)
        return { ok: false, mensaje: "Fondos insuficientes en USD." };
      cuenta.saldoUSD -= monto;
    } else {
      if (cuenta.saldoUYU < monto)
        return { ok: false, mensaje: "Fondos insuficientes en UYU." };
      cuenta.saldoUYU -= monto;
    }
    return { ok: true, mensaje: "Retiro realizado." };
  }

  iniciarSimulacionMercado() {
    if (this.intervaloSimulacion) clearInterval(this.intervaloSimulacion);

    this.intervaloSimulacion = setInterval(() => {
      const lista = this.listaActivos.getListaParaModo(this.getModo());
      lista.forEach((activo) => activo.generarVariacion());
    }, 1000); // cada 1 segundo
  }

  //Para detener la simulación del mercado- buena práctica
  detenerSimulacionMercado() {
    if (this.intervaloSimulacion) clearInterval(this.intervaloSimulacion);
  }
}
