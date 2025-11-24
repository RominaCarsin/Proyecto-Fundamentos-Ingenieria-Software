"use strict";

import Controller from "../domain/Controller.js";
import CalculadoraComisiones from "../domain/CalculadoraComisiones.js";

function paginaVisible(idPagina) {
  const elemento = document.getElementById(idPagina);
  return elemento && !elemento.classList.contains("d-none");
}

console.clear();

// INICIALIZACIÓN
const controller = new Controller();
const calc = new CalculadoraComisiones();

// VARIABLES GLOBALES
let categoriaActual = "Todas";
let categoriaAnalisisActual = "Todas";
let limiteTarjetas = 3;
let seleccionadosAnalisis = [];

// VARIABLES PARA MOVIMIENTOS
const movimientoActual = {
  tipo: "", // 'deposito' o 'retiro'
  moneda: "", // 'USD' o 'UYU'
};

// VARIABLES GRÁFICA
let ctx = null;
let canvas = null;
let idActivoActual = null;

let intervaloActual = "min"; // min, h, d, m
let puntosGrafica = []; // últimos puntos procesados para tooltip
//let ultimoTooltip = null; // para mostrar valor al hacer click

let usuarioEditando = false;

// DOM - NAVEGACIÓN
const itemInicio = document.getElementById("itemInicio");
const itemPortafolio = document.getElementById("itemPortafolio");
const itemAnalisis = document.getElementById("itemAnalisis");
const itemBilletera = document.getElementById("itemBilletera");
const itemCentroAprendizaje = document.getElementById("itemCentroAprendizaje");

const paginaInicio = document.getElementById("paginaInicio");
const paginaPortafolio = document.getElementById("paginaPortafolio");
const paginaAnalisis = document.getElementById("paginaAnalisis");
const paginaBilletera = document.getElementById("paginaBilletera");
const paginaCentroAprendizaje = document.getElementById(
  "paginaCentroAprendizaje",
);

// DOM - INICIO/TRADING
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
const contenedorGrafico = document.getElementById("contenedorGrafico");

// DOM - PORTAFOLIO
const inputBuscarPortafolio = document.getElementById("buscarPortafolio");
const btnCategoriaTodas = document.getElementById("btnCategoriaTodas");
const btnCategoriaBonos = document.getElementById("btnCategoriaBonos");
const btnCategoriaCripto = document.getElementById("btnCategoriaCripto");
const btnCategoriaForex = document.getElementById("btnCategoriaForex");
const btnCategoriaAcciones = document.getElementById("btnCategoriaAcciones");
const grillaActivos = document.getElementById("grillaActivos");
const btnVerMasPortafolio = document.getElementById("btnVerMasPortafolio");

// DOM - ANÁLISIS
const buscarAnalisis = document.getElementById("buscarAnalisis");
const btnCategoriaAnalisisTodas = document.getElementById(
  "btnCategoriaAnalisisTodas",
);
const btnCategoriaAnalisisBonos = document.getElementById(
  "btnCategoriaAnalisisBonos",
);
const btnCategoriaAnalisisCripto = document.getElementById(
  "btnCategoriaAnalisisCripto",
);
const btnCategoriaAnalisisForex = document.getElementById(
  "btnCategoriaAnalisisForex",
);
const btnCategoriaAnalisisAcciones = document.getElementById(
  "btnCategoriaAnalisisAcciones",
);
const tablaInstrumentosElement = document.getElementById("tablaInstrumentos");
const tablaInstrumentos = tablaInstrumentosElement
  ? tablaInstrumentosElement.querySelector("tbody")
  : null;
const totalSeleccionados = document.getElementById("totalSeleccionados");
const promedioRendimiento = document.getElementById("promedioRendimiento");
const costoEstimado = document.getElementById("costoEstimado");
const ultimaActualizacion = document.getElementById("ultimaActualizacion");

// DOM - BILLETERA
const saldoTotalUSD = document.getElementById("saldoTotalUSD");
const disponibleUSD = document.getElementById("disponibleUSD");
const garantiaUSD = document.getElementById("garantiaUSD");
const saldoTotalUYU = document.getElementById("saldoTotalUYU");
const disponibleUYU = document.getElementById("disponibleUYU");
const garantiaUYU = document.getElementById("garantiaUYU");
const btnDepositoUSD = document.getElementById("btnDepositoUSD");
const btnRetiroUSD = document.getElementById("btnRetiroUSD");
const btnDepositoUYU = document.getElementById("btnDepositoUYU");
const btnRetiroUYU = document.getElementById("btnRetiroUYU");

// DOM - CALCULADORA DE COMISIONES
const montoInput = document.getElementById("monto");
const tipoOperacionInput = document.getElementById("tipoOperacion");
const divisaInput = document.getElementById("divisa");
const tasaInput = document.getElementById("tasa");
const btnCalcularComision = document.getElementById("btnCalcularComision");
const comisionEstimada = document.getElementById("comisionEstimada");
const totalRecibir = document.getElementById("totalRecibir");

// DOM - CENTRO DE APRENDIZAJE
//const contenedorVideos = document.getElementById("contenedorVideos");
const btnVerMasVideos = document.getElementById("btnVerMasVideos");
const inputBuscarCentro = document.querySelector(
  "#paginaCentroAprendizaje input[type='search']",
);

//   GRÁFICA DINÁMICA (con puntos)

function iniciarGrafica() {
  if (!contenedorGrafico) {
    console.error("Contenedor gráfico no encontrado");
    return;
  }

  canvas = document.createElement("canvas");
  canvas.id = "canvasGrafica";

  // Limpiar contenedor
  contenedorGrafico.innerHTML = "";
  contenedorGrafico.appendChild(canvas);

  ctx = canvas.getContext("2d");

  // Redimensionar después de agregar al DOM
  setTimeout(() => {
    canvas.width = contenedorGrafico.clientWidth;
    canvas.height = contenedorGrafico.clientHeight || 350;
    dibujarGrafica();
  }, 100);
  setTimeout(() => dibujarGrafica(), 300);

  if (canvas) {
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // buscar punto cercano
      let mejor = null;
      puntosGrafica.forEach((p) => {
        const d = Math.hypot(p.x - clickX, p.y - clickY);
        if (!mejor || d < mejor.dist) {
          mejor = { ...p, dist: d };
        }
      });

      if (mejor && mejor.dist < 20) {
        //ultimoTooltip = mejor;
        dibujarGrafica();

        // Dibujar tooltip
        ctx.fillStyle = "#000";
        ctx.font = "12px Arial";
        ctx.fillText(`$${mejor.valor.toFixed(2)}`, mejor.x + 10, mejor.y - 10);
      }
    });
  }
}

function aplicarIntervalo(datos) {
  switch (intervaloActual) {
    case "min":
      return datos.slice(-20); // 20 puntos
    case "h":
      return datos.slice(-40); // 40 puntos
    case "d":
      return datos.slice(-60); // 60 puntos
    case "m":
      return datos.slice(-100); // 100 puntos
    default:
      return datos;
  }
}

function dibujarGrafica() {
  if (!idActivoActual || !ctx || !canvas) return;
  const activo = controller.listaActivos.getPorId(
    idActivoActual,
    controller.getModo(),
  );
  if (!activo || typeof activo.getHistorial !== "function") return;
  let datos = aplicarIntervalo(activo.getHistorial());
  puntosGrafica = [];
  if (datos.length < 2) return dibujarMensajeEsperando();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { padding, width, height, min, range, color } =
    obtenerConfigGrafica(datos);
  if (range === 0) return;
  dibujarEjes(ctx, padding, width, height);
  dibujarLineaPrecios(ctx, datos, padding, width, height, min, range, color);
  dibujarPuntosExtremos(ctx, datos, padding, width, height, min, range, color);
}

function dibujarMensajeEsperando() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#666";
  ctx.textAlign = "center";
  ctx.fillText("Esperando datos...", canvas.width / 2, canvas.height / 2);
}

function obtenerConfigGrafica(datos) {
  const padding = 40;
  const width = canvas.width - padding * 2;
  const height = canvas.height - padding * 2;
  const max = Math.max(...datos) * 1.02;
  const min = Math.min(...datos) * 0.98;
  const range = max - min;
  const color = datos[datos.length - 1] >= datos[0] ? "#28a745" : "#dc3545";
  return { padding, width, height, min, max, range, color };
}

function dibujarEjes(ctx, padding, width, height) {
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding + height);
  ctx.lineTo(padding + width, padding + height);
  ctx.stroke();
}

function dibujarLineaPrecios(
  ctx,
  datos,
  padding,
  width,
  height,
  min,
  range,
  color,
) {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  const stepX = width / (datos.length - 1);
  datos.forEach((valor, i) => {
    const x = padding + i * stepX;
    const y = padding + height - ((valor - min) / range) * height;
    puntosGrafica.push({ x, y, valor });
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function dibujarPuntosExtremos(
  ctx,
  datos,
  padding,
  width,
  height,
  min,
  range,
  color,
) {
  if (datos.length > 0) {
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.arc(
      padding,
      padding + height - ((datos[0] - min) / range) * height,
      3,
      0,
      2 * Math.PI,
    );
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
      padding + width,
      padding + height - ((datos[datos.length - 1] - min) / range) * height,
      4,
      0,
      2 * Math.PI,
    );
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = "12px Arial";
    ctx.fillText(
      `$${datos[datos.length - 1].toFixed(2)}`,
      padding + width - 40,
      padding +
        height -
        ((datos[datos.length - 1] - min) / range) * height -
        10,
    );
  }
}

// FUNCIONES DE NAVEGACIÓN
function ocultarTodasLasPaginas() {
  const paginas = [
    paginaInicio,
    paginaPortafolio,
    paginaAnalisis,
    paginaBilletera,
    paginaCentroAprendizaje,
  ];

  paginas.forEach((pagina) => {
    if (pagina) {
      pagina.classList.add("d-none");
    }
  });
}

function limpiarActivosMenu() {
  document
    .querySelectorAll("#menu a")
    .forEach((a) => a.classList.remove("active"));
}

function irA(pagina, itemMenu) {
  ocultarTodasLasPaginas();
  limpiarActivosMenu();
  if (pagina) {
    pagina.classList.remove("d-none");
  }
  if (itemMenu) {
    const link = itemMenu.querySelector("a");
    if (link) {
      link.classList.add("active");
    }
  }
}

// FUNCIONES DE UTILIDAD
function mapearTipo(tipo) {
  const tipos = {
    Bonos: "",
    Criptomonedas: "limite",
    Forex: "market",
    Acciones: "stop",
  };
  return tipos[tipo] || "";
}

function normalizarOperacion(op) {
  return op.toLowerCase().replace("ó", "o").replace("é", "e").trim();
}

function mostrarMensaje(texto, tipo = "danger") {
  const alerta = document.getElementById("alertaSistema");
  if (!alerta) {
    return;
  }

  alerta.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
  alerta.textContent = texto;
  alerta.classList.remove("d-none");

  setTimeout(() => {
    alerta.classList.add("d-none");
  }, 3000);
}

// FUNCIONES DE INICIO/TRADING
function cargarSelectActivos() {
  if (!selectActivo) {
    return;
  }

  const lista = controller.getListaActivos();
  selectActivo.innerHTML = lista
    .map((a) => `<option value="${a.id}">${a.nombre}</option>`)
    .join("");

  if (lista.length > 0) {
    actualizarDatosActivo(lista[0].id);
  }
}

function actualizarDatosActivo(id) {
  if (!pValorAccion) {
    return;
  }

  const datos = controller.getDatosActivo(parseInt(id, 10));
  if (!datos) {
    return;
  }

  // Si el precio no existe o es cero -> no mostrar 0.0000
  if (!datos.precioNumerico || datos.precioNumerico === 0) {
    pValorAccion.textContent = "Valor de Acción: —";
    return;
  }

  // Solo si hay precio real, actualizo completo
  if (selectTipoAccion) {
    selectTipoAccion.value = mapearTipo(datos.tipo);
  }
  pValorAccion.textContent = `Valor de Acción: ${datos.precioTexto}`;
}

function recalcularDesdeAccion() {
  const id = parseInt(selectActivo.value, 10);

  // ALERTA  si el input está vacío -> no tocar nada
  if (!inputAccion || inputAccion.value.trim() === "") {
    if (inputDinero) {
      inputDinero.value = "";
    }
    return;
  }

  const cantidad = parseFloat(inputAccion.value);
  if (Number.isNaN(cantidad) || cantidad <= 0) {
    if (inputDinero) {
      inputDinero.value = "";
    }
    return;
  }

  const res = controller.calcularDinero(id, cantidad);
  if (inputDinero && res.dineroNumerico) {
    inputDinero.value = res.dineroNumerico.toFixed(2);
  }
}

function recalcularDesdeDinero() {
  const id = parseInt(selectActivo.value, 10);

  if (!inputDinero || inputDinero.value.trim() === "") {
    if (inputAccion) {
      inputAccion.value = "";
    }
    return;
  }

  const dinero = parseFloat(inputDinero.value);
  if (Number.isNaN(dinero) || dinero <= 0) {
    if (inputAccion) {
      inputAccion.value = "";
    }
    return;
  }

  const res = controller.calcularCantidad(id, dinero);
  if (inputAccion && res.cantidadNumerica) {
    inputAccion.value = res.cantidadNumerica.toFixed(4);
  }
}

function pintarHistorial() {
  if (!divHistorial) {
    return;
  }

  const lista = controller.getHistorialParaVista();

  if (!lista.length) {
    divHistorial.textContent = "Sin operaciones recientes.";
    return;
  }

  divHistorial.innerHTML = lista
    .map((op) => `<p class="mb-1">${op.texto}</p>`)
    .join("");
}

function realizarOperacion(tipo) {
  if (!inputAccion) {
    return;
  }

  const cantidad = parseFloat(inputAccion.value);

  if (cantidad <= 0 || Number.isNaN(cantidad)) {
    mostrarMensaje("La cantidad debe ser mayor a 0.", "warning");
    return;
  }

  const id = parseInt(selectActivo.value, 10);
  const res =
    tipo === "compra"
      ? controller.realizarCompra(id, cantidad)
      : controller.realizarVenta(id, cantidad);

  mostrarMensaje(res.mensaje, res.ok ? "success" : "danger");

  if (res.ok) {
    pintarHistorial();
  }
}

function cambiarMoneda(moneda) {
  controller.cambiarMoneda(moneda);
  if (btnUSD) {
    btnUSD.classList.toggle("active", moneda === "USD");
  }
  if (btnUYU) {
    btnUYU.classList.toggle("active", moneda === "UYU");
  }
  actualizarDatosActivo(selectActivo.value);
  recalcularDesdeAccion();
}

function cargarActivoEnInicio(idActivo) {
  irA(paginaInicio, itemInicio);
  if (selectActivo) {
    selectActivo.value = idActivo;
    selectActivo.dispatchEvent(new Event("change"));
  }
  if (inputAccion) {
    inputAccion.value = "1";
    recalcularDesdeAccion();
  }
}

// FUNCIONES DE PORTAFOLIO
function crearTarjetaHTML(activo) {
  return `
  <article class="col-sm-6 col-md-4 col-lg-3">
    <article class="card activo text-center p-3" data-tipo="${activo.tipo}">
      <h3 class="fw-bold mb-1">${activo.nombre}</h3>
      <p class="text-muted small mb-2">${activo.tipo}</p>
      <section class="d-flex justify-content-around align-items-center mb-2">
        <span class="badge bg-light text-dark px-3">${activo.rendimiento.toFixed(2)}%</span>
        <span class="fw-bold text-success">${activo.precio.toFixed(2)} ${activo.moneda}</span>
      </section>
      <button class="btn btn-primary btn-sm" onclick="irAInicio(${activo.id})">
        Ir
      </button>
    </article>
  </article>
  `;
}

function cambiarCategoria(cat) {
  categoriaActual = cat;
  document
    .querySelectorAll("#categorias button")
    .forEach((btn) => btn.classList.remove("active"));
  const btnCategoria = document.getElementById(`btnCategoria${cat}`);
  if (btnCategoria) {
    btnCategoria.classList.add("active");
  }
  limiteTarjetas = 3;
  renderPortafolio();
}

function renderPortafolio() {
  if (!grillaActivos) {
    return;
  }

  const todos = controller.getPortafolioParaVista();

  // Filtrar por categoría
  const filtradosPorCategoria =
    categoriaActual === "Todas"
      ? todos
      : todos.filter(
          (a) => a.tipo.toLowerCase() === categoriaActual.toLowerCase(),
        );

  // Filtrar por texto
  const texto = inputBuscarPortafolio
    ? inputBuscarPortafolio.value.trim().toLowerCase()
    : "";
  const filtrados = filtradosPorCategoria.filter((a) =>
    a.nombre.toLowerCase().includes(texto),
  );

  // Limitar tarjetas mostradas
  const visibles = filtrados.slice(0, limiteTarjetas);

  // Renderizar HTML
  grillaActivos.innerHTML = visibles.map((a) => crearTarjetaHTML(a)).join("");

  // Control de botón "Ver más"
  if (btnVerMasPortafolio) {
    btnVerMasPortafolio.classList.toggle(
      "d-none",
      filtrados.length <= limiteTarjetas,
    );
  }
}

// FUNCIONES DE ANÁLISIS
function crearFilaAnalisis(activo) {
  const colorRend = activo.rendimiento >= 0 ? "text-success" : "text-danger";
  const checked = seleccionadosAnalisis.includes(activo.id) ? "checked" : "";

  // Crear ID único accesible
  const checkboxId = `check-analisis-${activo.id}`;

  return `
    <tr>
      <td>
        <div class="form-check">
          <input 
            type="checkbox" 
            id="${checkboxId}"
            class="form-check-input check-analisis"
            data-id="${activo.id}"
            ${checked}
          />
          <label for="${checkboxId}" class="form-check-label">${activo.nombre}</label>
        </div>
      </td>

      <td class="text-center">
        <span class="${colorRend}">${activo.rendimiento.toFixed(2)}%</span>
      </td>

      <td class="text-center">${activo.precio.toFixed(2)} ${activo.moneda}</td>

      <td class="text-center">
        <button 
          class="btn btn-primary btn-sm btn-operar" 
          data-id="${activo.id}">
          Operar
        </button>
      </td>
    </tr>
  `;
}

const lista = controller.getListaActivos();
const seleccionados = lista.filter((a) => seleccionadosAnalisis.includes(a.id));

if (totalSeleccionados) {
  totalSeleccionados.textContent = seleccionados.length;
}

// Rendimiento promedio
if (promedioRendimiento) {
  if (seleccionados.length > 0) {
    const promedio =
      seleccionados.reduce((sum, a) => sum + a.rendimiento, 0) /
      seleccionados.length;
    promedioRendimiento.textContent = `${promedio.toFixed(2)}%`;
    promedioRendimiento.classList.toggle("text-success", promedio >= 0);
    promedioRendimiento.classList.toggle("text-danger", promedio < 0);
  } else {
    promedioRendimiento.textContent = "-";
  }
}

// Costo estimado
// ...existing code...
function actualizarResumen() {
  const lista = controller.getListaActivos();
  const seleccionados = lista.filter((a) =>
    seleccionadosAnalisis.includes(a.id),
  );
  actualizarResumenSeleccionados(seleccionados);
  actualizarResumenRendimiento(seleccionados);
  actualizarResumenCosto(seleccionados);
  actualizarResumenUltimaActualizacion();
}

function actualizarResumenSeleccionados(seleccionados) {
  if (totalSeleccionados) totalSeleccionados.textContent = seleccionados.length;
}

function actualizarResumenRendimiento(seleccionados) {
  if (!promedioRendimiento) return;
  if (seleccionados.length > 0) {
    const promedio =
      seleccionados.reduce((sum, a) => sum + a.rendimiento, 0) /
      seleccionados.length;
    promedioRendimiento.textContent = `${promedio.toFixed(2)}%`;
    promedioRendimiento.classList.toggle("text-success", promedio >= 0);
    promedioRendimiento.classList.toggle("text-danger", promedio < 0);
  } else {
    promedioRendimiento.textContent = "-";
  }
}

function actualizarResumenCosto(seleccionados) {
  if (costoEstimado) {
    const costo = seleccionados.reduce((sum, a) => sum + a.precio, 0);
    costoEstimado.textContent = `${costo} USD`;
  }
}

function actualizarResumenUltimaActualizacion() {
  if (ultimaActualizacion) {
    ultimaActualizacion.textContent = new Date().toLocaleTimeString();
  }
}

function cambiarCategoriaAnalisis(categoria) {
  categoriaAnalisisActual = categoria;
  document
    .querySelectorAll("#categoriasAnalisis button")
    .forEach((btn) => btn.classList.remove("active"));
  const btnCategoriaAnalisis = document.getElementById(
    `btnCategoriaAnalisis${categoria}`,
  );
  if (btnCategoriaAnalisis) {
    btnCategoriaAnalisis.classList.add("active");
  }
  renderAnalisis();
}

function renderAnalisis() {
  if (!tablaInstrumentos) {
    return;
  }

  const lista = controller.getListaActivos();

  // Filtrar por categoría
  const filtradosCategoria =
    categoriaAnalisisActual === "Todas"
      ? lista
      : lista.filter(
          (a) => a.tipo.toLowerCase() === categoriaAnalisisActual.toLowerCase(),
        );

  // Filtrar por texto
  const texto = buscarAnalisis ? buscarAnalisis.value.trim().toLowerCase() : "";
  const filtrados = filtradosCategoria.filter((a) =>
    a.nombre.toLowerCase().includes(texto),
  );

  // Renderizar tabla
  tablaInstrumentos.innerHTML = filtrados
    .map((a) => crearFilaAnalisis(a))
    .join("");

  // Actualizar resumen
  actualizarResumen();
}

// FUNCIONES DE BILLETERA
function renderBilletera() {
  const saldos = controller.getSaldos();

  // USD
  if (saldoTotalUSD) {
    saldoTotalUSD.textContent = `$ ${saldos.USD.total.toFixed(2)}`;
  }
  if (disponibleUSD) {
    disponibleUSD.textContent = `$ ${saldos.USD.disponible.toFixed(2)}`;
  }
  if (garantiaUSD) {
    garantiaUSD.textContent = `$ ${saldos.USD.garantia.toFixed(2)}`;
  }

  // UYU
  if (saldoTotalUYU) {
    saldoTotalUYU.textContent = `$ ${saldos.UYU.total.toFixed(2)}`;
  }
  if (disponibleUYU) {
    disponibleUYU.textContent = `$ ${saldos.UYU.disponible.toFixed(2)}`;
  }
  if (garantiaUYU) {
    garantiaUYU.textContent = `$ ${saldos.UYU.garantia.toFixed(2)}`;
  }
}

// FUNCIONES DE MOVIMIENTOS CON MODAL
function abrirModalMovimiento(moneda, tipo) {
  movimientoActual.moneda = moneda;
  movimientoActual.tipo = tipo;
  const elementos = obtenerElementosModalMovimiento();
  if (!elementos) return;
  configurarElementosModal(elementos, moneda, tipo);
  ocultarResumenOperacion();
  mostrarModalMovimiento();
}

function obtenerElementosModalMovimiento() {
  const modalLabel = document.getElementById("modalMovimientoLabel");
  const tipoInput = document.getElementById("tipoOperacionModal");
  const monedaInput = document.getElementById("monedaModal");
  const montoInputModal = document.getElementById("montoModal");
  const btnConfirmar = document.getElementById("btnConfirmarMovimiento");
  if (
    !modalLabel ||
    !tipoInput ||
    !monedaInput ||
    !montoInputModal ||
    !btnConfirmar
  ) {
    console.error("Elementos del modal no encontrados");
    return null;
  }
  return { modalLabel, tipoInput, monedaInput, montoInputModal, btnConfirmar };
}

function configurarElementosModal(
  { modalLabel, tipoInput, monedaInput, montoInputModal, btnConfirmar },
  moneda,
  tipo,
) {
  const esDeposito = tipo === "deposito";
  const textoOperacion = esDeposito ? "Depósito" : "Retiro";
  const textoBoton = esDeposito ? "Depositar" : "Retirar";
  const claseBoton = esDeposito ? "btn-success" : "btn-warning";
  modalLabel.textContent = `${textoOperacion} - ${moneda}`;
  tipoInput.value = textoOperacion;
  monedaInput.value = moneda;
  montoInputModal.value = "";
  btnConfirmar.textContent = textoBoton;
  btnConfirmar.className = `btn ${claseBoton}`;
}

function ocultarResumenOperacion() {
  const resumenOperacion = document.getElementById("resumenOperacion");
  if (resumenOperacion) resumenOperacion.classList.add("d-none");
}

function mostrarModalMovimiento() {
  const modalElement = document.getElementById("modalMovimiento");
  if (modalElement && window.bootstrap) {
    const modal = new window.bootstrap.Modal(modalElement);
    modal.show();
  }
}

function actualizarResumenOperacion() {
  const montoModal = document.getElementById("montoModal");
  if (!montoModal) return;
  const montoBruto = parseFloat(montoModal.value);
  if (Number.isNaN(montoBruto) || montoBruto <= 0)
    return ocultarResumenOperacion();
  const tipoNormalizado = normalizarOperacion(movimientoActual.tipo);
  const { comision, neto, tasa } = calc.calcularPorOperacion(
    montoBruto,
    tipoNormalizado,
    movimientoActual.moneda,
  );
  actualizarElementosResumen(montoBruto, comision, neto, tasa);
  mostrarResumenOperacion();
}

function actualizarElementosResumen(montoBruto, comision, neto, tasa) {
  const resumenMonto = document.getElementById("resumenMonto");
  const resumenTasa = document.getElementById("resumenTasa");
  const resumenComision = document.getElementById("resumenComision");
  const resumenNeto = document.getElementById("resumenNeto");
  if (resumenMonto)
    resumenMonto.textContent = `${montoBruto.toFixed(2)} ${movimientoActual.moneda}`;
  if (resumenTasa) resumenTasa.textContent = tasa;
  if (resumenComision)
    resumenComision.textContent = `-${comision.toFixed(2)} ${movimientoActual.moneda}`;
  if (resumenNeto)
    resumenNeto.textContent = `${neto.toFixed(2)} ${movimientoActual.moneda}`;
}

function mostrarResumenOperacion() {
  const resumenOperacion = document.getElementById("resumenOperacion");
  if (resumenOperacion) resumenOperacion.classList.remove("d-none");
}

function confirmarMovimiento() {
  const montoModal = document.getElementById("montoModal");
  if (!montoModal) return;
  const montoBruto = parseFloat(montoModal.value);
  if (Number.isNaN(montoBruto) || montoBruto <= 0)
    return mostrarMensaje("Ingrese un monto válido.", "warning");
  const tipoNormalizado = normalizarOperacion(movimientoActual.tipo);
  const { neto } = calc.calcularPorOperacion(
    montoBruto,
    tipoNormalizado,
    movimientoActual.moneda,
  );
  const res = realizarOperacionMovimiento(tipoNormalizado, neto);
  mostrarMensaje(res.mensaje, res.ok ? "success" : "danger");
  if (res.ok) actualizarBilleteraYModal();
}

function realizarOperacionMovimiento(tipoNormalizado, neto) {
  if (tipoNormalizado === "deposito") {
    return controller.depositar(movimientoActual.moneda, neto);
  } else {
    return controller.retirar(movimientoActual.moneda, neto);
  }
}

function actualizarBilleteraYModal() {
  renderBilletera();
  const modalElement = document.getElementById("modalMovimiento");
  if (modalElement && window.bootstrap) {
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
  }
}

// FUNCIONES DE CALCULADORA DE COMISIONES
function actualizarTasaCalculadora() {
  if (!tipoOperacionInput || !divisaInput || !tasaInput) {
    return;
  }

  const tipo = normalizarOperacion(tipoOperacionInput.value);
  const moneda = divisaInput.value;
  tasaInput.value = calc.obtenerTasa(tipo, moneda);
}

function calcularComision() {
  if (!montoInput || !tipoOperacionInput || !divisaInput || !tasaInput) {
    return;
  }

  const monto = parseFloat(montoInput.value);
  const tipo = normalizarOperacion(tipoOperacionInput.value);
  const moneda = divisaInput.value;

  if (Number.isNaN(monto) || monto <= 0) {
    mostrarMensaje("Ingrese un monto válido.", "warning");
    return;
  }

  const { comision, neto, tasa } = calc.calcularPorOperacion(
    monto,
    tipo,
    moneda,
  );

  tasaInput.value = tasa;
  if (comisionEstimada) {
    comisionEstimada.textContent = `${comision.toFixed(2)} ${moneda}`;
  }
  if (totalRecibir) {
    totalRecibir.textContent = `${neto.toFixed(2)} ${moneda}`;
  }
}

// FUNCIONES - CENTRO DE APRENDIZAJE
let videosVisibles = 4;

function actualizarVisibilidadVideos() {
  const videos = document.querySelectorAll("#contenedorVideos .video-item");

  videos.forEach((v, i) => {
    if (i < videosVisibles) {
      v.classList.remove("d-none");
    } else {
      v.classList.add("d-none");
    }
  });

  // Cambiar texto del botón
  if (btnVerMasVideos) {
    btnVerMasVideos.textContent =
      videosVisibles >= videos.length ? "Ver menos" : "Ver más";
  }
}

function toggleVerMasVideos() {
  const videos = document.querySelectorAll("#contenedorVideos .video-item");

  if (videosVisibles >= videos.length) {
    // Contraer
    videosVisibles = 4;
  } else {
    // Expandir todos los videos
    videosVisibles = videos.length;
  }

  actualizarVisibilidadVideos();
}

function filtrarVideosCentro() {
  const texto = inputBuscarCentro
    ? inputBuscarCentro.value.toLowerCase().trim()
    : "";
  const videos = document.querySelectorAll("#contenedorVideos .video-item");

  // Mostrar todos los videos antes de filtrar
  videos.forEach((v) => {
    v.classList.remove("d-none");
    v.style.display = ""; // reset
  });

  // Aplicar filtro
  videos.forEach((v) => {
    const titulo = v.querySelector("small").textContent.toLowerCase();
    const coincide = titulo.includes(texto);

    // Si no coincide -> ocultar
    if (!coincide) {
      v.style.display = "none";
    }
  });

  // Si hay texto -> ocultar el botón "ver más"
  if (btnVerMasVideos) {
    btnVerMasVideos.style.display = texto.length > 0 ? "none" : "";
  }

  // Si no hay texto -> restaurar visibilidad normal
  if (texto.length === 0) {
    videosVisibles = 4;
    actualizarVisibilidadVideos();
  }
}

// EVENT LISTENERS - NAVEGACIÓN
if (itemInicio) {
  itemInicio.addEventListener("click", () => {
    irA(paginaInicio, itemInicio);
    actualizarDatosActivo(selectActivo.value);
    recalcularDesdeAccion();
    pintarHistorial();
  });
}

if (itemPortafolio) {
  itemPortafolio.addEventListener("click", () => {
    irA(paginaPortafolio, itemPortafolio);
    renderPortafolio();
  });
}

if (itemAnalisis) {
  itemAnalisis.addEventListener("click", () => {
    irA(paginaAnalisis, itemAnalisis);
    renderAnalisis();
  });
}

if (itemBilletera) {
  itemBilletera.addEventListener("click", () => {
    irA(paginaBilletera, itemBilletera);
    renderBilletera();
    actualizarTasaCalculadora();
  });
}

if (itemCentroAprendizaje) {
  itemCentroAprendizaje.addEventListener("click", () => {
    irA(paginaCentroAprendizaje, itemCentroAprendizaje);
    // Reiniciar vista al entrar
    videosVisibles = 4;
    actualizarVisibilidadVideos();
    filtrarVideosCentro();
  });
}

// EVENT LISTENERS - INICIO/TRADING
if (selectActivo) {
  selectActivo.addEventListener("change", () => {
    idActivoActual = parseInt(selectActivo.value, 10);
    console.log("Activo cambiado a:", idActivoActual);
    actualizarDatosActivo(selectActivo.value);
    if (inputAccion) {
      inputAccion.value = "1";
    }
    recalcularDesdeAccion();
    iniciarGrafica();
  });
}

if (selectTipoAccion) {
  selectTipoAccion.addEventListener("change", () => {
    const tipo = selectTipoAccion.value;
    const lista = controller.buscarActivosPorTipo(tipo);
    if (selectActivo) {
      actualizarOpcionesSelectActivo(lista);
      if (lista.length > 0) {
        manejarActivoDisponible(lista);
      } else {
        manejarSinActivos();
      }
    }
  });

  function actualizarOpcionesSelectActivo(lista) {
    selectActivo.innerHTML = lista
      .map((a) => `<option value="${a.id}">${a.nombre}</option>`)
      .join("");
  }

  function manejarActivoDisponible(lista) {
    idActivoActual = parseInt(lista[0].id, 10);
    actualizarDatosActivo(lista[0].id);
    if (inputAccion) inputAccion.value = "1";
    recalcularDesdeAccion();
    iniciarGrafica();
  }

  function manejarSinActivos() {
    if (pValorAccion) pValorAccion.textContent = "Sin activos disponibles";
    if (inputAccion) inputAccion.value = "";
    if (inputDinero) inputDinero.value = "";
  }
}

if (inputAccion) {
  inputAccion.addEventListener("input", () => {
    usuarioEditando = true;
    recalcularDesdeAccion();
  });

  inputAccion.addEventListener("blur", () => {
    usuarioEditando = false;
  });
}

if (inputDinero) {
  inputDinero.addEventListener("input", () => {
    usuarioEditando = true;
    recalcularDesdeDinero();
  });

  inputDinero.addEventListener("blur", () => {
    usuarioEditando = false;
  });
}

if (btnComprar) {
  btnComprar.addEventListener("click", () => realizarOperacion("compra"));
}
if (btnVender) {
  btnVender.addEventListener("click", () => realizarOperacion("venta"));
}

if (btnUSD) {
  btnUSD.addEventListener("click", () => cambiarMoneda("USD"));
}
if (btnUYU) {
  btnUYU.addEventListener("click", () => cambiarMoneda("UYU"));
}

if (switchModo) {
  switchModo.addEventListener("change", () => {
    controller.setModo(switchModo.checked);
    cargarSelectActivos();
    if (selectActivo) {
      selectActivo.dispatchEvent(new Event("change"));
    }
    pintarHistorial();
  });
}

// EVENT LISTENERS - PORTAFOLIO
if (btnCategoriaTodas) {
  btnCategoriaTodas.onclick = () => cambiarCategoria("Todas");
}
if (btnCategoriaBonos) {
  btnCategoriaBonos.onclick = () => cambiarCategoria("Bonos");
}
if (btnCategoriaCripto) {
  btnCategoriaCripto.onclick = () => cambiarCategoria("Criptomonedas");
}
if (btnCategoriaForex) {
  btnCategoriaForex.onclick = () => cambiarCategoria("Forex");
}
if (btnCategoriaAcciones) {
  btnCategoriaAcciones.onclick = () => cambiarCategoria("Acciones");
}

if (inputBuscarPortafolio) {
  inputBuscarPortafolio.oninput = renderPortafolio;
}
if (btnVerMasPortafolio) {
  btnVerMasPortafolio.onclick = () => {
    limiteTarjetas += 3;
    renderPortafolio();
  };
}

// EVENT LISTENERS - ANÁLISIS
if (btnCategoriaAnalisisTodas) {
  btnCategoriaAnalisisTodas.onclick = () => cambiarCategoriaAnalisis("Todas");
}
if (btnCategoriaAnalisisBonos) {
  btnCategoriaAnalisisBonos.onclick = () => cambiarCategoriaAnalisis("Bonos");
}
if (btnCategoriaAnalisisCripto) {
  btnCategoriaAnalisisCripto.onclick = () =>
    cambiarCategoriaAnalisis("Criptomonedas");
}
if (btnCategoriaAnalisisForex) {
  btnCategoriaAnalisisForex.onclick = () => cambiarCategoriaAnalisis("Forex");
}
if (btnCategoriaAnalisisAcciones) {
  btnCategoriaAnalisisAcciones.onclick = () =>
    cambiarCategoriaAnalisis("Acciones");
}

if (buscarAnalisis) {
  buscarAnalisis.oninput = renderAnalisis;
}

if (tablaInstrumentos) {
  tablaInstrumentos.addEventListener("click", (e) => {
    // Checkbox
    if (e.target.classList.contains("check-analisis")) {
      const id = parseInt(e.target.dataset.id, 10);
      if (e.target.checked) {
        if (!seleccionadosAnalisis.includes(id)) {
          seleccionadosAnalisis.push(id);
        }
      } else {
        seleccionadosAnalisis = seleccionadosAnalisis.filter((x) => x !== id);
      }
      actualizarResumen();
    }

    // Botón Operar
    if (e.target.classList.contains("btn-operar")) {
      const id = parseInt(e.target.dataset.id, 10);
      cargarActivoEnInicio(id);
    }
  });
}

// EVENT LISTENERS - BILLETERA
if (btnDepositoUSD) {
  btnDepositoUSD.addEventListener("click", () =>
    abrirModalMovimiento("USD", "deposito"),
  );
}
if (btnRetiroUSD) {
  btnRetiroUSD.addEventListener("click", () =>
    abrirModalMovimiento("USD", "retiro"),
  );
}
if (btnDepositoUYU) {
  btnDepositoUYU.addEventListener("click", () =>
    abrirModalMovimiento("UYU", "deposito"),
  );
}
if (btnRetiroUYU) {
  btnRetiroUYU.addEventListener("click", () =>
    abrirModalMovimiento("UYU", "retiro"),
  );
}

// EVENT LISTENERS - CALCULADORA DE COMISIONES
if (tipoOperacionInput) {
  tipoOperacionInput.addEventListener("change", actualizarTasaCalculadora);
}
if (divisaInput) {
  divisaInput.addEventListener("change", actualizarTasaCalculadora);
}
if (btnCalcularComision) {
  btnCalcularComision.addEventListener("click", calcularComision);
}

// EVENT LISTENERS DEL MODAL DE MOVIMIENTOS
const montoModalElement = document.getElementById("montoModal");
if (montoModalElement) {
  montoModalElement.addEventListener("input", actualizarResumenOperacion);
  montoModalElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      confirmarMovimiento();
    }
  });
}

const btnConfirmarMovimientoElement = document.getElementById(
  "btnConfirmarMovimiento",
);
if (btnConfirmarMovimientoElement) {
  btnConfirmarMovimientoElement.addEventListener("click", confirmarMovimiento);
}

// EVENTOS - CENTRO DE APRENDIZAJE
if (btnVerMasVideos) {
  btnVerMasVideos.addEventListener("click", toggleVerMasVideos);
}

if (inputBuscarCentro) {
  inputBuscarCentro.addEventListener("input", filtrarVideosCentro);
}

// INICIALIZACIÓN COMPLETA
document.addEventListener("DOMContentLoaded", function () {
  if (paginaInicio && itemInicio) {
    irA(paginaInicio, itemInicio);
  }

  cargarSelectActivos();
  pintarHistorial();

  // INICIALIZAR GRÁFICA Y SIMULACIÓN
  setTimeout(() => {
    if (selectActivo && selectActivo.value) {
      idActivoActual = parseInt(selectActivo.value, 10);
      console.log("Inicializando gráfica con activo:", idActivoActual);
      iniciarGrafica();
      controller.iniciarSimulacionMercado();
    }
  }, 1000);

  // Centro aprendizaje: establecer visibilidad inicial
  actualizarVisibilidadVideos();
});

// Actualizar gráfica cada segundo
setInterval(() => {
  if (idActivoActual) {
    dibujarGrafica();
  }
}, 1000);

setInterval(() => {
  // Si estoy en Inicio -> NO hacemos nada extra (ya se actualiza)

  // Si estoy en Portafolio -> volver a renderizar
  if (paginaVisible("paginaPortafolio")) {
    renderPortafolio();
  }

  // Si estoy en Análisis de Mercado -> volver a renderizar
  if (paginaVisible("paginaAnalisis")) {
    renderAnalisis();
  }
}, 1000);

// Actualizar datos del activo cada segundo
setInterval(() => {
  if (!idActivoActual) {
    return;
  }

  // no interrumpir al usuario mientras escribe
  if (usuarioEditando) {
    actualizarDatosActivo(idActivoActual);
    return;
  }

  actualizarDatosActivo(idActivoActual);

  // si ambos inputs están vacíos, no autocalcular
  const accionVacio = !inputAccion || inputAccion.value.trim() === "";
  const dineroVacio = !inputDinero || inputDinero.value.trim() === "";

  if (accionVacio && dineroVacio) {
    return;
  }

  // recalcular según el dato ingresado
  if (!accionVacio) {
    recalcularDesdeAccion();
  } else if (!dineroVacio) {
    recalcularDesdeDinero();
  }
}, 1000);

// INTERVALOS DE TIEMPO
const btnIntervaloMin = document.getElementById("btnIntervaloMin");
const btnIntervaloHora = document.getElementById("btnIntervaloHora");
const btnIntervaloDia = document.getElementById("btnIntervaloDia");
const btnIntervaloMes = document.getElementById("btnIntervaloMes");

function cambiarIntervalo(nuevo, botonClickeado) {
  intervaloActual = nuevo;

  // Remover clase active de todos los botones
  [btnIntervaloMin, btnIntervaloHora, btnIntervaloDia, btnIntervaloMes].forEach(
    (boton) => {
      if (boton) {
        boton.classList.remove("active");
      }
    },
  );

  // Agregar clase active al botón clickeado
  if (botonClickeado) {
    botonClickeado.classList.add("active");
  }

  dibujarGrafica();
}

// Event listeners actualizados
if (btnIntervaloMin) {
  btnIntervaloMin.onclick = () => cambiarIntervalo("min", btnIntervaloMin);
}
if (btnIntervaloHora) {
  btnIntervaloHora.onclick = () => cambiarIntervalo("h", btnIntervaloHora);
}
if (btnIntervaloDia) {
  btnIntervaloDia.onclick = () => cambiarIntervalo("d", btnIntervaloDia);
}
if (btnIntervaloMes) {
  btnIntervaloMes.onclick = () => cambiarIntervalo("m", btnIntervaloMes);
}

// FUNCIONES GLOBALES
window.irAInicio = function (idActivo) {
  irA(paginaInicio, itemInicio);
  if (selectActivo) {
    selectActivo.value = idActivo;
    selectActivo.dispatchEvent(new Event("change"));
  }
  if (inputAccion) {
    inputAccion.value = "1";
    recalcularDesdeAccion();
  }
};
