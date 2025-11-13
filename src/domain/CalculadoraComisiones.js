export default class CalculadoraComisiones {
  calcular(monto, tasa) {
    const comision = monto * (tasa / 100);
    const neto = monto - comision;
    return { comision, neto };
  }
}
