export default class CalculadoraComisiones {
  
  // Tabla de comisiones definidas por moneda y tipo
  COMISIONES = {
    USD: {
      deposito: 1.1,
      retiro: 1.3,
      compra: 0.8,
      venta: 0.9
    },
    UYU: {
      deposito: 1.5,
      retiro: 1.6,
      compra: 1.0,
      venta: 1.2
    }
  };

  // Obtener la tasa según operación y divisa
  obtenerTasa(tipoOperacion, moneda) {
    if (!this.COMISIONES[moneda]) return 0;
    return this.COMISIONES[moneda][tipoOperacion] ?? 0;
  }

  // Cálculo general de comisión
  calcular(monto, tasa) {
    const comision = monto * (tasa / 100);
    const neto = monto - comision;
    return { comision, neto };
  }

  // Cálculo completo según operación + moneda
  calcularPorOperacion(monto, tipoOperacion, moneda) {
    const tasa = this.obtenerTasa(tipoOperacion, moneda);
    const { comision, neto } = this.calcular(monto, tasa);

    return {
      comision,
      neto,
      tasa
    };
  }
}
