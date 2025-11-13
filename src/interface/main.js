import Controller from "../domain/Controller.js";
console.clear();
const controller = new Controller();

// ===========================================
//      MANEJO DE NAVEGACIÓN (NO TOCAR)
// ===========================================
const itemInicio = document.getElementById("itemInicio");
const itemPortafolio = document.getElementById("itemPortafolio");
const itemAnalisis = document.getElementById("itemAnalisis");
const itemBilletera = document.getElementById("itemBilletera");

const paginaInicio = document.getElementById("paginaInicio");
const paginaPortafolio = document.getElementById("paginaPortafolio");
const paginaAnalisis = document.getElementById("paginaAnalisis");
const paginaBilletera = document.getElementById("paginaBilletera");

function ocultarTodasLasPaginas() {
  paginaInicio.classList.add("d-none");
  paginaPortafolio.classList.add("d-none");
  paginaAnalisis.classList.add("d-none");
  paginaBilletera.classList.add("d-none");
}

function limpiarActivosMenu() {
  document.querySelectorAll("#menu a").forEach(a => a.classList.remove("active"));
}

function irA(pagina, itemMenu) {
  ocultarTodasLasPaginas();
  limpiarActivosMenu();
  pagina.classList.remove("d-none");
  itemMenu.querySelector("a").classList.add("active");
}

itemInicio.addEventListener("click", () => {
  irA(paginaInicio, itemInicio);
  actualizarDatosActivo(selectActivo.value);
  recalcularDesdeAccion();
  pintarHistorial();
});

itemPortafolio.addEventListener("click", () => irA(paginaPortafolio, itemPortafolio));
itemAnalisis.addEventListener("click", () => irA(paginaAnalisis, itemAnalisis));
itemBilletera.addEventListener("click", () => irA(paginaBilletera, itemBilletera));

irA(paginaInicio, itemInicio);

// ===========================================
// DOM
// ===========================================
const selectActivo = document.getElementById("selccionDeAccionInicio");
const selectTipoAccion = document.getElementById("tipoAccion");
const pValorAccion = document.getElementById("idValorDeAccion");

const inputAccion = document.getElementById("accion");
const inputDinero = document.getElementById("dinero");

const btnComprar = document.getElementById("btnComprar");
const btnVender = document.getElementById("btnVender");

const btnUSD = document.getElementById("btnUSD");
const btnUYU = document.getElementById("btnUYU");

const divHistorial = document.getElementById("textoPosicionesAbiertas");
const switchModo = document.getElementById("switchCheckDefault");

// ===========================================
// MAPEO TIPOS
// ===========================================
function mapearTipo(tipo) {
  if (tipo === "Bonos") return "";
  if (tipo === "Criptomonedas") return "limite";
  if (tipo === "Forex") return "market";
  if (tipo === "Acciones") return "stop";
  return "";
}

// ===========================================
// ACTIVOS
// ===========================================
function cargarSelectActivos() {
  const lista = controller.getListaActivos();
  selectActivo.innerHTML = lista
    .map(a => `<option value="${a.id}">${a.nombre}</option>`)
    .join("");

  if (lista.length > 0) {
    actualizarDatosActivo(lista[0].id);
  }
}

function actualizarDatosActivo(id) {
  const datos = controller.getDatosActivo(parseInt(id));
  if (!datos) return;

  selectTipoAccion.value = mapearTipo(datos.tipo);
  pValorAccion.textContent = `Valor de Acción: ${datos.precioTexto}`;
}

// ===========================================
// ACCIÓN ↔ DINERO
// ===========================================
function recalcularDesdeAccion() {
  const id = parseInt(selectActivo.value);
  const cantidad = parseFloat(inputAccion.value) || 0;

  const res = controller.calcularDinero(id, cantidad);
  inputDinero.value = res.dineroNumerico.toFixed(2);
}

function recalcularDesdeDinero() {
  const id = parseInt(selectActivo.value);
  const dinero = parseFloat(inputDinero.value) || 0;

  const res = controller.calcularCantidad(id, dinero);
  inputAccion.value = res.cantidadNumerica.toFixed(4);
}

// ===========================================
// HISTORIAL
// ===========================================
function pintarHistorial() {
  const lista = controller.getHistorialParaVista();

  if (!lista.length) {
    divHistorial.textContent = "Sin operaciones recientes.";
    return;
  }

  divHistorial.innerHTML = lista.map(op =>
    `<p class="mb-1">${op.texto}</p>`
  ).join("");
}

// ===========================================
// COMPRA / VENTA
// ===========================================
btnComprar.addEventListener("click", () => {
  const cantidad = parseFloat(inputAccion.value);

  if (cantidad <= 0 || isNaN(cantidad)) {
    mostrarMensaje("La cantidad debe ser mayor a 0.", "warning");
    return;
  }
  const res = controller.realizarCompra(
    parseInt(selectActivo.value),
    cantidad
  );
  if (!res.ok) {
    mostrarMensaje(res.mensaje, "danger");
    return;
  }
  mostrarMensaje("Compra realizada correctamente", "success");
  pintarHistorial();
});

btnVender.addEventListener("click", () => {
  const cantidad = parseFloat(inputAccion.value);
  if (cantidad <= 0 || isNaN(cantidad)) {
    mostrarMensaje("La cantidad debe ser mayor a 0", "warning");
    return;
  }
  const res = controller.realizarVenta(
    parseInt(selectActivo.value),
    cantidad
  );
  if (!res.ok) {
    mostrarMensaje(res.mensaje, "danger");
    return;
  }
  mostrarMensaje("Venta realizada correctamente", "success");
  pintarHistorial();
});

// ===========================================
// SELECT ACTIVO
// ===========================================
selectActivo.addEventListener("change", () => {
  actualizarDatosActivo(selectActivo.value);
  inputAccion.value = 1;
  recalcularDesdeAccion();
});

selectTipoAccion.addEventListener("change", () => {
  const tipo = selectTipoAccion.value;
  const lista = controller.buscarActivosPorTipo(tipo);

  selectActivo.innerHTML = lista
    .map(a => `<option value="${a.id}">${a.nombre}</option>`)
    .join("");

  if (lista.length > 0) {
    actualizarDatosActivo(lista[0].id);
    inputAccion.value = 1;
    recalcularDesdeAccion();
  } else {
    pValorAccion.textContent = "Sin activos disponibles";
    inputAccion.value = "";
    inputDinero.value = "";
  }
});

// ===========================================
// INPUTS
// ===========================================
inputAccion.addEventListener("input", recalcularDesdeAccion);
inputDinero.addEventListener("input", recalcularDesdeDinero);

// ===========================================
// MONEDA
// ===========================================
btnUSD.addEventListener("click", () => {
  controller.cambiarMoneda("USD");
  btnUSD.classList.add("active");
  btnUYU.classList.remove("active");

  actualizarDatosActivo(selectActivo.value);
  recalcularDesdeAccion();
});

btnUYU.addEventListener("click", () => {
  controller.cambiarMoneda("UYU");
  btnUYU.classList.add("active");
  btnUSD.classList.remove("active");

  actualizarDatosActivo(selectActivo.value);
  recalcularDesdeAccion();
});

// ===========================================
// MODO DEMO / REAL
// ===========================================
switchModo.addEventListener("change", () => {
  controller.setModo(switchModo.checked);

  cargarSelectActivos();
  actualizarDatosActivo(selectActivo.value);
  pintarHistorial();
});

// ===========================================
// INIT
// ===========================================
cargarSelectActivos();
pintarHistorial();

// NOTIFICACIONES
function mostrarMensaje(texto, tipo = "danger") {
  const alerta = document.getElementById("alertaSistema");

  alerta.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
  alerta.textContent = texto;

  alerta.classList.remove("d-none");

  // Oculta solo después de 3 segundos
  setTimeout(() => {
    alerta.classList.add("d-none");
  }, 3000);
}
