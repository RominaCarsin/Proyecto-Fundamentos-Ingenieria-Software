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


const inputBuscarPortafolio = document.getElementById("buscarPortafolio");
const btnCategoriaTodas = document.getElementById("btnCategoriaTodas");
const btnCategoriaBonos = document.getElementById("btnCategoriaBonos");
const btnCategoriaCripto = document.getElementById("btnCategoriaCripto");
const btnCategoriaForex = document.getElementById("btnCategoriaForex");
const btnCategoriaAcciones = document.getElementById("btnCategoriaAcciones");
const grillaActivos = document.getElementById("grillaActivos");
const btnVerMasPortafolio = document.getElementById("btnVerMasPortafolio");

// Estado interno
let categoriaActual = "Todas";
let limiteTarjetas = 8; // cantidad inicial

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

itemPortafolio.addEventListener("click", () => {
  irA(paginaPortafolio, itemPortafolio);
  renderPortafolio();
});
itemAnalisis.addEventListener("click", () => irA(paginaAnalisis, itemAnalisis));
itemBilletera.addEventListener("click", () => irA(paginaBilletera, itemBilletera));

irA(paginaInicio, itemInicio);

// ===========================================
// DOM
// ===========================================
const selectActivo = document.getElementById("seleccionDeAccionInicio");
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

//FUNCIONES PARA IMPLEMENTAR PORTAFOLIO 
function renderPortafolio() {
  const todos = controller.getPortafolioParaVista();

  // 1) Filtrar por categoría
  const filtradosPorCategoria =
  categoriaActual === "Todas"
    ? todos
    : todos.filter(a => a.tipo.toLowerCase() === categoriaActual.toLowerCase());

  // 2) Filtrar por texto
  const texto = inputBuscarPortafolio.value.trim().toLowerCase();
  const filtrados = filtradosPorCategoria.filter(a =>
    a.nombre.toLowerCase().includes(texto)
  );

  // 3) Limitar tarjetas mostradas
  const visibles = filtrados.slice(0, limiteTarjetas);

  // 4) Renderizar HTML
  grillaActivos.innerHTML = visibles.map(a => crearTarjetaHTML(a)).join("");

  // 5) Control de botón "Ver más"
  btnVerMasPortafolio.classList.toggle(
    "d-none",
    filtrados.length <= limiteTarjetas
  );
}

function crearTarjetaHTML(activo) {
  return `
  <article class="col-sm-6 col-md-4 col-lg-3">
    <article class="card activo text-center p-3" data-tipo="${activo.tipo}">
      <h3 class="fw-bold mb-1">${activo.nombre}</h3>
      <p class="text-muted small mb-2">${activo.tipo}</p>

      <section class="d-flex justify-content-around align-items-center mb-2">
        <span class="badge bg-light text-dark px-3">${activo.rendimiento}%</span>
        <span class="fw-bold text-success">${activo.precio} ${activo.moneda}</span>
      </section>

      <button class="btn btn-primary btn-sm" onclick="irAInicio(${activo.id})">
        Ir
      </button>
    </article>
  </article>
  `;
}


function irAInicio(idActivo) {

  // Ir a la ventana inicio usando tu navegación
  irA(paginaInicio, itemInicio);

  // Seleccionar el activo correcto
  const selector = document.getElementById("seleccionDeAccionInicio");
  selector.value = idActivo;

  // Forzar update
  selector.dispatchEvent(new Event("change"));

  // Reiniciar valores
  inputAccion.value = 1;
  recalcularDesdeAccion();
}

btnCategoriaTodas.onclick = () => cambiarCategoria("Todas");
btnCategoriaBonos.onclick = () => cambiarCategoria("Bonos");
btnCategoriaCripto.onclick = () => cambiarCategoria("Criptomonedas");
btnCategoriaForex.onclick = () => cambiarCategoria("Forex");
btnCategoriaAcciones.onclick = () => cambiarCategoria("Acciones");

inputBuscarPortafolio.oninput = renderPortafolio;

btnVerMasPortafolio.onclick = () => {
  limiteTarjetas += 8;
  renderPortafolio();
};

function cambiarCategoria(cat) {
  categoriaActual = cat;

  document.querySelectorAll("#categorias button").forEach(btn =>
    btn.classList.remove("active")
  );

  document.querySelector(`#btnCategoria${cat}`)?.classList.add("active");

  limiteTarjetas = 8;
  renderPortafolio();
}

window.irAInicio = function (idActivo) {

  // 1) Ir a la ventana inicio usando tu navegación existente
  irA(paginaInicio, itemInicio);

  // 2) Seleccionar el activo
  selectActivo.value = idActivo;

  // 3) Forzar actualización
  selectActivo.dispatchEvent(new Event("change"));

  // 4) Reiniciar valores
  inputAccion.value = 1;
  recalcularDesdeAccion();
};

// ==============================
// ANÁLISIS DE MERCADO - DOM
// ==============================
const buscarAnalisis = document.getElementById("buscarAnalisis");

const btnCategoriaAnalisisTodas = document.getElementById("btnCategoriaAnalisisTodas");
const btnCategoriaAnalisisBonos = document.getElementById("btnCategoriaAnalisisBonos");
const btnCategoriaAnalisisCripto = document.getElementById("btnCategoriaAnalisisCripto");
const btnCategoriaAnalisisForex = document.getElementById("btnCategoriaAnalisisForex");
const btnCategoriaAnalisisAcciones = document.getElementById("btnCategoriaAnalisisAcciones");

const tablaInstrumentos = document.getElementById("tablaInstrumentos").querySelector("tbody");

const totalSeleccionados = document.getElementById("totalSeleccionados");
const promedioRendimiento = document.getElementById("promedioRendimiento");
const costoEstimado = document.getElementById("costoEstimado");
const ultimaActualizacion = document.getElementById("ultimaActualizacion");

let categoriaAnalisisActual = "Todas";
let seleccionadosAnalisis = [];  // Guarda IDs seleccionados

function renderAnalisis() {
  const lista = controller.getListaActivos();

  // 1) Filtrar por categoría
  const filtradosCategoria =
  categoriaAnalisisActual === "Todas"
    ? lista
    : lista.filter(a => a.tipo.toLowerCase() === categoriaAnalisisActual.toLowerCase());


  // 2) Filtrar por texto
  const texto = buscarAnalisis.value.trim().toLowerCase();
  const filtrados = filtradosCategoria.filter(a =>
    a.nombre.toLowerCase().includes(texto)
  );

  // 3) Renderizar tabla
  tablaInstrumentos.innerHTML = filtrados.map(a => crearFilaAnalisis(a)).join("");

  // 4) Actualizar resumen
  actualizarResumen();
}


function crearFilaAnalisis(activo) {
  const colorRend = activo.rendimiento >= 0 ? "text-success" : "text-danger";

  const checked = seleccionadosAnalisis.includes(activo.id) ? "checked" : "";

  return `
    <tr>
      <td>
        <figure class="form-check">
          <input 
            type="checkbox" 
            class="form-check-input check-analisis"
            data-id="${activo.id}"
            ${checked}
          />
          <label class="form-check-label">${activo.nombre}</label>
        </figure>
      </td>

      <td class="text-center">
        <span class="${colorRend}">${activo.rendimiento}%</span>
      </td>

      <td class="text-center">${activo.precio} ${activo.moneda}</td>

      <td class="text-center">
        <button class="btn btn-primary btn-sm btn-operar" data-id="${activo.id}">
          Operar
        </button>
      </td>
    </tr>
  `;
}


function actualizarResumen() {
  const lista = controller.getListaActivos();
  const seleccionados = lista.filter(a => seleccionadosAnalisis.includes(a.id));

  totalSeleccionados.textContent = seleccionados.length;

  // Rendimiento promedio
  if (seleccionados.length > 0) {
    const promedio = seleccionados.reduce((sum, a) => sum + a.rendimiento, 0) / seleccionados.length;
    promedioRendimiento.textContent = promedio.toFixed(2) + "%";
    promedioRendimiento.classList.toggle("text-success", promedio >= 0);
    promedioRendimiento.classList.toggle("text-danger", promedio < 0);
  } else {
    promedioRendimiento.textContent = "-";
  }

  // Costo estimado
  const costo = seleccionados.reduce((sum, a) => sum + a.precio, 0);
  costoEstimado.textContent = costo + " USD";

  // Última actualización
  ultimaActualizacion.textContent = new Date().toLocaleTimeString();
}

// Delegación para checkbox + botón operar dentro de la tabla
tablaInstrumentos.addEventListener("click", e => {

  // Checkbox
  if (e.target.classList.contains("check-analisis")) {
    const id = parseInt(e.target.dataset.id);

    if (e.target.checked) {
      if (!seleccionadosAnalisis.includes(id)) {
        seleccionadosAnalisis.push(id);
      }
    } else {
      seleccionadosAnalisis = seleccionadosAnalisis.filter(x => x !== id);
    }

    actualizarResumen();
  }

  // Botón Operar
  if (e.target.classList.contains("btn-operar")) {
    const id = parseInt(e.target.dataset.id);
    cargarActivoEnInicio(id);
  }
});

function cargarActivoEnInicio(idActivo) {
  irA(paginaInicio, itemInicio);

  selectActivo.value = idActivo;
  selectActivo.dispatchEvent(new Event("change"));
}

btnCategoriaAnalisisTodas.onclick = () => cambiarCategoriaAnalisis("Todas");
btnCategoriaAnalisisBonos.onclick = () => cambiarCategoriaAnalisis("Bonos");
btnCategoriaAnalisisCripto.onclick = () => cambiarCategoriaAnalisis("Criptomonedas");
btnCategoriaAnalisisForex.onclick = () => cambiarCategoriaAnalisis("Forex");
btnCategoriaAnalisisAcciones.onclick = () => cambiarCategoriaAnalisis("Acciones");

function cambiarCategoriaAnalisis(cat) {
  categoriaAnalisisActual = cat;

  document.querySelectorAll("#categoriasAnalisis button")
    .forEach(btn => btn.classList.remove("active"));

  document.querySelector(`#btnCategoriaAnalisis${cat}`)?.classList.add("active");

  renderAnalisis();
}

buscarAnalisis.oninput = renderAnalisis;

itemAnalisis.addEventListener("click", () => {
  irA(paginaAnalisis, itemAnalisis);
  renderAnalisis();
});