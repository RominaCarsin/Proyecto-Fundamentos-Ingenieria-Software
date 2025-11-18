export default class ControlOperaciones {
  calcularDinero(cantidad, precio) {
    return cantidad * precio;
  }

  calcularCantidad(dinero, precio) {
    return dinero / precio;
  }
}
