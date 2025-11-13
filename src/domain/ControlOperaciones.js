export default class ControlOperaciones {
  #cotizaciones;

  constructor(cotizaciones) {
    this.#cotizaciones = cotizaciones;
  }

  calcularDinero(cantidad, precio) {
    return cantidad * precio;
  }

  calcularCantidad(dinero, precio) {
    return dinero / precio;
  }
}
