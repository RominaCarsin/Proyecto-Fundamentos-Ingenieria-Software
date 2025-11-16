import Activo from "./Activo.js";

export default class ListaActivos {
  constructor() {
    this.activosDemo = [];
    this.activosReales = [];
  }

  cargarActivosDemo() {
    this.activosDemo = [
      new Activo(1, "Microsoft (MSFT)", "Acciones", 500, "USD", 0.03),
      new Activo(2, "Bitcoin (BTC)", "Criptomonedas", 85000, "USD", 0.06),
      new Activo(3, "Bono UYU BCU", "Bonos", 1350, "UYU", 0.01),
      new Activo(4, "EUR/USD", "Forex", 1.55, "USD", 0.002),
      new Activo(5, "Coca-Cola (KO)", "Acciones", 50, "USD", 0.02)
    ];
  }

  cargarActivosReales() {
    this.activosReales = [
      new Activo(101, "Microsoft (MSFT)", "Acciones", 500, "USD", 0.02),
      new Activo(102, "Bitcoin (BTC)", "Criptomonedas", 85000, "USD", 0.05),
      new Activo(103, "Bono UYU BCU", "Bonos", 1350, "UYU", 0.01),
      new Activo(104, "EUR/USD", "Forex", 1.55, "USD", 0.002),
      new Activo(105, "Coca-Cola (KO)", "Acciones", 50, "USD", 0.02)
    ];
  }

  getListaParaModo(modo) {
    return modo === "demo" ? this.activosDemo : this.activosReales;
  }

  getPorId(id, modo) {
    const lista = this.getListaParaModo(modo);
    return lista.find(a => a.id === id) || null;
  }

  buscarPorTipo(tipo, modo) {
    const lista = this.getListaParaModo(modo);
    return lista.filter(a => a.tipo === tipo);
  }
}
