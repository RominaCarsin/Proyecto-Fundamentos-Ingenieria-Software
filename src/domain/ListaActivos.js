import Activo from "./Activo.js";

export default class ListaActivos {

  constructor() {
    this.activosDemo = [];
    this.activosReal = [];
  }

  // ============================================================
  //                CARGA LISTA DEMO (OBJETOS ACTIVOS)
  // ============================================================
  cargarActivosDemo() {
    this.activosDemo = [
      new Activo(1, "Microsoft (MSFT)", "Acciones", 498.57, 2.1, "USD"),
      new Activo(2, "Bitcoin (BTC)", "Criptomonedas", 101245.20, -1.3, "USD"),
      new Activo(3, "Bono UYU BCU", "Bonos", 1200, 0.4, "UYU"),
      new Activo(4, "EUR/USD", "Forex", 1.05, 0.1, "USD"),
      new Activo(5, "Coca-Cola (KO)", "Acciones", 62.9, 0.6, "USD")
    ];
  }

  // ============================================================
  //                CARGA LISTA REAL (OBJETOS ACTIVOS)
  // ============================================================
  cargarActivosReales() {
    this.activosReal = [
      new Activo(101, "Tesla (TSLA)", "Acciones", 375.12, 1.8, "USD"),
      new Activo(102, "Ethereum (ETH)", "Criptomonedas", 3450.10, -0.9, "USD"),
      new Activo(103, "Bono Global Uruguay 2030", "Bonos", 95.3, 0.3, "USD"),
      new Activo(104, "GBP/USD", "Forex", 1.24, 0.1, "USD"),
      new Activo(105, "Coca-Cola", "Bono", 12.9, 0.6, "USD")
    ];
  }

  // ============================================================
  //                      OBTENER LISTA
  // ============================================================
  getListaParaModo(modo) {
    return modo === "demo" ? this.activosDemo : this.activosReal;
  }

  // ============================================================
  //                      BUSCAR POR ID
  // ============================================================
  getPorId(id, modo) {
    const lista = this.getListaParaModo(modo);
    return lista.find(a => a.id === id) || null;
  }

  // ============================================================
  //                    BUSCAR POR TEXTO
  //        Busca coincidencia en el NOMBRE del activo
  // ============================================================
  buscarPorTexto(texto, modo) {
    const lista = this.getListaParaModo(modo);
    const t = texto.trim().toLowerCase();
    if (t === "") return lista;

    return lista.filter(a =>
      a.nombre.toLowerCase().includes(t)
    );
  }

  // ============================================================
  //                    BUSCAR POR TIPO
  //         Devuelve activos del tipo (Acciones, Bonos...)
  // ============================================================
  buscarPorTipo(tipo, modo) {
    const lista = this.getListaParaModo(modo);
    const t = tipo.trim().toLowerCase();

    return lista.filter(a =>
      a.tipo.toLowerCase() === t
    );
  }

}
