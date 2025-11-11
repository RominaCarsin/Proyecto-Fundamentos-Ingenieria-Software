import { Usuario } from "../domain/usuario.js";
import { Activo } from "../domain/activo.js";
import { Transaccion } from "../domain/transaccion.js";

// === Datos base simulados (modo demo) ===
const activosDemo = [
  new Activo(1, "Microsoft (MSFT)", "Acciones", 498.57, 2.1),
  new Activo(2, "Apple (AAPL)", "Acciones", 220.1, -1.2),
  new Activo(3, "Bitcoin (BTC)", "Criptomonedas", 101245.2, 3.3),
  new Activo(4, "Bono UY", "Bonos", 100.0, 0.8),
];

// === Estado general ===
let usuario = new Usuario("Demo User", "demo@tradeuy.com");
let monedaActual = "USD";
const cotizaciones = { USD: 1, UYU: 40 };
let activoSeleccionado = activosDemo[0];

// === Elementos del DOM ===
const selectAccion = document.getElementById("selccionDeAccionInicio");
const tipoAccion = document.getElementById("tipoAccion");
const campoAccion = document.getElementById("accion");
const campoDinero = document.getElementById("dinero");
const btnComprar = document.getElementById("btnComprar");
const btnVender = document.getElementById("btnVender");
const textoPosiciones = document.getElementById("textoPosicionesAbiertas");

const btnUSD = document.getElementById("btnUSD");
const btnUYU = document.getElementById("btnUYU");
const switchCuenta = document.getElementById("switchCheckDefault");

// === Inicialización ===
function inicializar() {
  // Cargar lista de activos
  activosDemo.forEach((a) => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = a.nombre;
    selectAccion.appendChild(opt);
  });
  actualizarDatosActivo();
}

// === Actualiza tipo y valor de activo al cambiar selección ===
selectAccion.addEventListener("change", () => {
  const id = Number(selectAccion.value);
  activoSeleccionado = activosDemo.find((a) => a.id === id);
  actualizarDatosActivo();
});

function actualizarDatosActivo() {
  tipoAccion.value = activoSeleccionado.tipo;
  campoAccion.value = 0;
  campoDinero.value = 0;
}

// === Vinculación bidireccional Acción <-> Dinero ===
campoAccion.addEventListener("input", () => {
  const cantidad = parseFloat(campoAccion.value) || 0;
  campoDinero.value = (cantidad * activoSeleccionado.precio * cotizaciones[monedaActual]).toFixed(2);
});

campoDinero.addEventListener("input", () => {
  const dinero = parseFloat(campoDinero.value) || 0;
  campoAccion.value = (dinero / (activoSeleccionado.precio * cotizaciones[monedaActual])).toFixed(4);
});

// === Cambio de cotización (moneda activa) ===
btnUSD.addEventListener("click", () => cambiarMoneda("USD"));
btnUYU.addEventListener("click", () => cambiarMoneda("UYU"));

function cambiarMoneda(nuevaMoneda) {
  monedaActual = nuevaMoneda;
  [btnUSD, btnUYU].forEach((b) => b.classList.remove("active"));
  (nuevaMoneda === "USD" ? btnUSD : btnUYU).classList.add("active");

  // Recalcular montos actuales
  campoAccion.dispatchEvent(new Event("input"));
}

// === Operaciones (Comprar / Vender) ===
btnComprar.addEventListener("click", () => operar("Compra"));
btnVender.addEventListener("click", () => operar("Venta"));

function operar(tipo) {
  const cantidad = parseFloat(campoAccion.value);
  const dinero = parseFloat(campoDinero.value);
  if (cantidad <= 0 || dinero <= 0) {
    alert("Ingrese valores válidos para operar.");
    return;
  }

  const transaccion = new Transaccion(tipo, activoSeleccionado.nombre, cantidad, dinero);
  usuario.registrarTransaccion(transaccion);
  actualizarHistorial();
  limpiarCampos();
}

// === Muestra operaciones recientes ===
function actualizarHistorial() {
  const transacciones = usuario.transacciones.slice(-3);
  if (transacciones.length === 0) {
    textoPosiciones.textContent = "Sin operaciones recientes.";
  } else {
    textoPosiciones.innerHTML = transacciones
      .map((t) => `<div>${t.resumen()}</div>`)
      .join("");
  }
}

function limpiarCampos() {
  campoAccion.value = "";
  campoDinero.value = "";
}

// === Alternar cuenta Demo / Real ===
switchCuenta.addEventListener("change", () => {
  usuario.cuenta.alternarModo();
  const label = document.querySelector("label[for='switchCheckDefault']");
  label.textContent = usuario.cuenta.modo === "Demo" ? "Cuenta Demo" : "Cuenta Real";
  textoPosiciones.textContent = "Sin operaciones recientes.";
  usuario = new Usuario("Demo User", "demo@tradeuy.com"); // reinicia para simplicidad
});

// === Arranque ===
inicializar();



// FUNCIONAMIENTO DEL MENÚ
let itemsMenu = document.querySelectorAll('[id^="item"]');

function mostrarPagina(idPagina) {
  let todasLasPaginas = document.querySelectorAll('[id^="pagina"]');
  for (let i = 0; i < todasLasPaginas.length; i++) {
    let pagina = todasLasPaginas[i];
    if (pagina.id === idPagina) {
      pagina.classList.remove("d-none");
    } else {
      pagina.classList.add("d-none");
    }
  }
}

// Actualiza el menú activo
function actualizarMenuActivo(idItem) {
  for (let i = 0; i < itemsMenu.length; i++) {
    let item = itemsMenu[i];
    let link = item.querySelector("a");
    if (link) {
      if (item.id === idItem) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  }
}

//Asignar los eventos a cada ítem del menú
for (let i = 0; i < itemsMenu.length; i++) {
  (function (item) {
    item.addEventListener("click", function () {
      let nombre = item.id.replace("item", "pagina"); 
      mostrarPagina(nombre);
      actualizarMenuActivo(item.id);
    });
  })(itemsMenu[i]);
}

// Mostrar página de Inicio por defecto
mostrarPagina("paginaInicio");
actualizarMenuActivo("itemInicio");

// ===============================
// FUNCIONALIDAD DE LA VENTANA INICIO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Ventana de Inicio cargada");

  // --- ELEMENTOS CLAVE ---
  const switchCuenta = document.getElementById("switchCheckDefault");
  const selectAccion = document.getElementById("selccionDeAccionInicio");
  const tipoAccion = document.getElementById("tipoAccion");
  const inputAccion = document.getElementById("accion");
  const inputDinero = document.getElementById("dinero");
  const btnUSD = document.getElementById("btnUSD");
  const btnUYU = document.getElementById("btnUYU");
  const textoPosiciones = document.getElementById("textoPosicionesAbiertas");
  const btnComprar = document.getElementById("btnComprar");
  const btnVender = document.getElementById("btnVender");

  // --- DATOS BASE (simulados) ---
  const cotizaciones = { USD: 1, UYU: 40, EUR: 1.05 };
  let monedaActiva = "USD";
  let modoDemo = true;

  // Activos simulados (se usarán en modo demo o real)
  const activosDemo = [
    { nombre: "Bitcoin", tipo: "Criptomoneda", valor: 69000.5 },
    { nombre: "AAPL - Apple", tipo: "Acción", valor: 228.9 },
    { nombre: "MSFT - Microsoft", tipo: "Acción", valor: 410.4 },
    { nombre: "Bono Uruguay 2030", tipo: "Bono", valor: 98.4 },
  ];

  const activosReales = [
    { nombre: "Ethereum", tipo: "Criptomoneda", valor: 3750.2 },
    { nombre: "UYU/USD", tipo: "Forex", valor: 0.025 },
  ];

  let activosActuales = [...activosDemo];
  let operacionesAbiertas = [];

  // ===============================
  // 1️⃣ MODO DEMO / REAL
  // ===============================
  switchCuenta.addEventListener("change", () => {
    modoDemo = switchCuenta.checked; // true si es demo
    activosActuales = modoDemo ? activosDemo : activosReales;
    document.querySelector('label[for="switchCheckDefault"]').textContent =
      modoDemo ? "Cuenta Demo" : "Cuenta Real";
    cargarAcciones();
    limpiarCampos();
    actualizarPosiciones();
    console.log("🔁 Modo:", modoDemo ? "Demo" : "Real");
  });

  // ===============================
  // 2️⃣ CARGAR ACCIONES DISPONIBLES
  // ===============================
  function cargarAcciones() {
    selectAccion.innerHTML = "";
    activosActuales.forEach((a) => {
      const opt = document.createElement("option");
      opt.value = a.nombre;
      opt.textContent = a.nombre;
      selectAccion.appendChild(opt);
    });
    cargarDatosAccion();
  }

  // ===============================
  // 3️⃣ SELECCIONAR UNA ACCIÓN
  // ===============================
  selectAccion.addEventListener("change", cargarDatosAccion);

  function cargarDatosAccion() {
    const nombre = selectAccion.value;
    const activo = activosActuales.find((a) => a.nombre === nombre);
    if (activo) {
      tipoAccion.value = activo.tipo;
      inputAccion.value = 1;
      inputDinero.value = convertirMoneda(activo.valor, "USD", monedaActiva);
    }
  }

  // ===============================
  // 4️⃣ VINCULACIÓN BIDIRECCIONAL ENTRE ACCIÓN Y DINERO
  // ===============================
  inputAccion.addEventListener("input", () => {
    const nombre = selectAccion.value;
    const activo = activosActuales.find((a) => a.nombre === nombre);
    if (!activo) return;
    const cantidad = parseFloat(inputAccion.value) || 0;
    inputDinero.value = (convertirMoneda(activo.valor, "USD", monedaActiva) * cantidad).toFixed(2);
  });

  inputDinero.addEventListener("input", () => {
    const nombre = selectAccion.value;
    const activo = activosActuales.find((a) => a.nombre === nombre);
    if (!activo) return;
    const dinero = parseFloat(inputDinero.value) || 0;
    inputAccion.value = (dinero / convertirMoneda(activo.valor, "USD", monedaActiva)).toFixed(4);
  });

  // ===============================
  // 5️⃣ CAMBIO DE MONEDA (COTIZACIONES)
  // ===============================
  btnUSD.addEventListener("click", () => cambiarMoneda("USD"));
  btnUYU.addEventListener("click", () => cambiarMoneda("UYU"));

  function cambiarMoneda(moneda) {
    monedaActiva = moneda;
    btnUSD.classList.toggle("active", moneda === "USD");
    btnUYU.classList.toggle("active", moneda === "UYU");
    btnUSD.classList.toggle("btn-outline-secondary", moneda !== "USD");
    btnUYU.classList.toggle("btn-outline-secondary", moneda !== "UYU");
    btnUSD.classList.toggle("btn-secondary", moneda === "USD");
    btnUYU.classList.toggle("btn-secondary", moneda === "UYU");
    recargarValoresPorMoneda();
  }

  function recargarValoresPorMoneda() {
    const nombre = selectAccion.value;
    const activo = activosActuales.find((a) => a.nombre === nombre);
    if (!activo) return;
    const cantidad = parseFloat(inputAccion.value) || 0;
    inputDinero.value = (convertirMoneda(activo.valor, "USD", monedaActiva) * cantidad).toFixed(2);
  }

  function convertirMoneda(valor, origen, destino) {
    return valor * (cotizaciones[destino] / cotizaciones[origen]);
  }

  // ===============================
  // 6️⃣ OPERAR (COMPRAR / VENDER)
  // ===============================
  btnComprar.addEventListener("click", () => operar("Compra"));
  btnVender.addEventListener("click", () => operar("Venta"));

  function operar(tipo) {
    const nombre = selectAccion.value;
    const activo = activosActuales.find((a) => a.nombre === nombre);
    const cantidad = parseFloat(inputAccion.value);
    const dinero = parseFloat(inputDinero.value);

    if (!activo || !cantidad || !dinero) {
      alert("⚠️ Complete los campos antes de operar.");
      return;
    }

    // Si es modo demo, no se guarda realmente
    if (modoDemo) {
      alert(`🧪 Simulación de ${tipo} (${nombre}) por $${dinero} en modo Demo`);
      return;
    }

    const operacion = {
      fecha: new Date().toLocaleDateString(),
      tipo,
      activo: nombre,
      cantidad,
      monto: dinero,
      estado: "Completada",
    };

    operacionesAbiertas.unshift(operacion);
    actualizarPosiciones();
    alert(`✅ ${tipo} realizada: ${nombre} por $${dinero.toFixed(2)}`);
  }

  // ===============================
  // 7️⃣ POSICIONES ABIERTAS
  // ===============================
  function actualizarPosiciones() {
    if (modoDemo) {
      textoPosiciones.textContent = "Simulación activa (modo Demo).";
      return;
    }

    if (operacionesAbiertas.length === 0) {
      textoPosiciones.textContent = "Sin operaciones recientes.";
      return;
    }

    textoPosiciones.innerHTML = operacionesAbiertas
      .slice(0, 3)
      .map(
        (op) =>
          `<strong>${op.fecha}</strong> - ${op.tipo} ${op.activo} (${op.cantidad}u) por <span class="text-success">$${op.monto.toFixed(
            2
          )}</span>`
      )
      .join("<br>");
  }

  // ===============================
  // 8️⃣ LIMPIAR CAMPOS
  // ===============================
  function limpiarCampos() {
    inputAccion.value = "";
    inputDinero.value = "";
  }

  // ===============================
  // 🚀 INICIALIZAR TODO
  // ===============================
  cargarAcciones();
  actualizarPosiciones();
});
