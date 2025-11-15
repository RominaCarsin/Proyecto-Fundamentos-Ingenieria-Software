import Controller from "../domain/Controller.js";
import CalculadoraComisiones from "../domain/CalculadoraComisiones.js";

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

let movimientoActual = {
  tipo: "", // 'deposito' o 'retiro'
  moneda: "" // 'USD' o 'UYU'
};

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
const paginaCentroAprendizaje = document.getElementById("paginaCentroAprendizaje");

//DOM - INICIO/TRADING

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

//DOM - CALCULADORA DE COMISIONES
const montoInput = document.getElementById("monto");
const tipoOperacionInput = document.getElementById("tipoOperacion");
const divisaInput = document.getElementById("divisa");
const tasaInput = document.getElementById("tasa");
const btnCalcularComision = document.getElementById("btnCalcularComision");
const comisionEstimada = document.getElementById("comisionEstimada");
const totalRecibir = document.getElementById("totalRecibir");


// FUNCIONES DE NAVEGACIÓN
function ocultarTodasLasPaginas() {
  paginaInicio.classList.add("d-none");
  paginaPortafolio.classList.add("d-none");
  paginaAnalisis.classList.add("d-none");
  paginaBilletera.classList.add("d-none");
  paginaCentroAprendizaje.classList.add("d-none"); 
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


// FUNCIONES DE UTILIDAD

function mapearTipo(tipo) {
  const tipos = {
    "Bonos": "",
    "Criptomonedas": "limite",
    "Forex": "market",
    "Acciones": "stop"
  };
  return tipos[tipo] || "";
}

function normalizarOperacion(op) {
  return op
    .toLowerCase()
    .replace("ó", "o")
    .replace("é", "e")
    .trim();
}

function mostrarMensaje(texto, tipo = "danger") {
  const alerta = document.getElementById("alertaSistema");
  alerta.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
  alerta.textContent = texto;
  alerta.classList.remove("d-none");

  setTimeout(() => {
    alerta.classList.add("d-none");
  }, 3000);
}


// FUNCIONES DE INICIO/TRADING

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

function realizarOperacion(tipo) {
  const cantidad = parseFloat(inputAccion.value);

  if (cantidad <= 0 || isNaN(cantidad)) {
    mostrarMensaje(`La cantidad debe ser mayor a 0.`, "warning");
    return;
  }

  const res = tipo === "compra" 
    ? controller.realizarCompra(parseInt(selectActivo.value), cantidad)
    : controller.realizarVenta(parseInt(selectActivo.value), cantidad);

  mostrarMensaje(res.mensaje, res.ok ? "success" : "danger");
  
  if (res.ok) pintarHistorial();
}

function cambiarMoneda(moneda) {
  controller.cambiarMoneda(moneda);
  btnUSD.classList.toggle("active", moneda === "USD");
  btnUYU.classList.toggle("active", moneda === "UYU");
  actualizarDatosActivo(selectActivo.value);
  recalcularDesdeAccion();
}

function cargarActivoEnInicio(idActivo) {
  irA(paginaInicio, itemInicio);
  selectActivo.value = idActivo;
  selectActivo.dispatchEvent(new Event("change"));
  inputAccion.value = 1;
  recalcularDesdeAccion();
}


// FUNCIONES DE PORTAFOLIO

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

function cambiarCategoria(cat) {
  categoriaActual = cat;
  document.querySelectorAll("#categorias button").forEach(btn =>
    btn.classList.remove("active")
  );
  document.querySelector(`#btnCategoria${cat}`)?.classList.add("active");
  limiteTarjetas = 3;
  renderPortafolio();
}

function renderPortafolio() {
  const todos = controller.getPortafolioParaVista();

  // Filtrar por categoría
  const filtradosPorCategoria = categoriaActual === "Todas"
    ? todos
    : todos.filter(a => a.tipo.toLowerCase() === categoriaActual.toLowerCase());

  // Filtrar por texto
  const texto = inputBuscarPortafolio.value.trim().toLowerCase();
  const filtrados = filtradosPorCategoria.filter(a =>
    a.nombre.toLowerCase().includes(texto)
  );

  // Limitar tarjetas mostradas
  const visibles = filtrados.slice(0, limiteTarjetas);

  // Renderizar HTML
  grillaActivos.innerHTML = visibles.map(a => crearTarjetaHTML(a)).join("");

  // Control de botón "Ver más"
  btnVerMasPortafolio.classList.toggle(
    "d-none",
    filtrados.length <= limiteTarjetas
  );
}


// FUNCIONES DE ANÁLISIS

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

function cambiarCategoriaAnalisis(cat) {
  categoriaAnalisisActual = cat;
  document.querySelectorAll("#categoriasAnalisis button")
    .forEach(btn => btn.classList.remove("active"));
  document.querySelector(`#btnCategoriaAnalisis${cat}`)?.classList.add("active");
  renderAnalisis();
}

function renderAnalisis() {
  const lista = controller.getListaActivos();

  // Filtrar por categoría
  const filtradosCategoria = categoriaAnalisisActual === "Todas"
    ? lista
    : lista.filter(a => a.tipo.toLowerCase() === categoriaAnalisisActual.toLowerCase());

  // Filtrar por texto
  const texto = buscarAnalisis.value.trim().toLowerCase();
  const filtrados = filtradosCategoria.filter(a =>
    a.nombre.toLowerCase().includes(texto)
  );

  // Renderizar tabla
  tablaInstrumentos.innerHTML = filtrados.map(a => crearFilaAnalisis(a)).join("");

  // Actualizar resumen
  actualizarResumen();
}


// FUNCIONES DE BILLETERA

function renderBilletera() {
  const saldos = controller.getSaldos();

  // USD
  saldoTotalUSD.textContent = `$ ${saldos.USD.total.toFixed(2)}`;
  disponibleUSD.textContent = `$ ${saldos.USD.disponible.toFixed(2)}`;
  garantiaUSD.textContent = `$ ${saldos.USD.garantia.toFixed(2)}`;

  // UYU
  saldoTotalUYU.textContent = `$ ${saldos.UYU.total.toFixed(2)}`;
  disponibleUYU.textContent = `$ ${saldos.UYU.disponible.toFixed(2)}`;
  garantiaUYU.textContent = `$ ${saldos.UYU.garantia.toFixed(2)}`;
}


// FUNCIONES DE MOVIMIENTOS CON MODAL

function abrirModalMovimiento(moneda, tipo) {
  // Guardar los datos de la operación actual
  movimientoActual.moneda = moneda;
  movimientoActual.tipo = tipo;
  
  // Configurar el modal según el tipo de operación
  const modalLabel = document.getElementById('modalMovimientoLabel');
  const tipoInput = document.getElementById('tipoOperacionModal');
  const monedaInput = document.getElementById('monedaModal');
  const montoInput = document.getElementById('montoModal');
  const btnConfirmar = document.getElementById('btnConfirmarMovimiento');
  
  // Textos según el tipo de operación
  const esDeposito = tipo === 'deposito';
  const textoOperacion = esDeposito ? 'Depósito' : 'Retiro';
  const textoBoton = esDeposito ? 'Depositar' : 'Retirar';
  const claseBoton = esDeposito ? 'btn-success' : 'btn-warning';
  
  // Configurar elementos del modal
  modalLabel.textContent = `${textoOperacion} - ${moneda}`;
  tipoInput.value = textoOperacion;
  monedaInput.value = moneda;
  montoInput.value = '';
  
  // Configurar botón de confirmación
  btnConfirmar.textContent = textoBoton;
  btnConfirmar.className = `btn ${claseBoton}`;
  
  // Ocultar resumen inicialmente
  document.getElementById('resumenOperacion').classList.add('d-none');
  
  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById('modalMovimiento'));
  modal.show();
}

function actualizarResumenOperacion() {
  const montoBruto = parseFloat(document.getElementById('montoModal').value);
  
  if (isNaN(montoBruto) || montoBruto <= 0) {
    document.getElementById('resumenOperacion').classList.add('d-none');
    return;
  }
  
  const tipoNormalizado = normalizarOperacion(movimientoActual.tipo);
  const { comision, neto, tasa } = calc.calcularPorOperacion(
    montoBruto, 
    tipoNormalizado, 
    movimientoActual.moneda
  );
  
  // Actualizar elementos del resumen
  document.getElementById('resumenMonto').textContent = `${montoBruto.toFixed(2)} ${movimientoActual.moneda}`;
  document.getElementById('resumenTasa').textContent = tasa;
  document.getElementById('resumenComision').textContent = `-${comision.toFixed(2)} ${movimientoActual.moneda}`;
  document.getElementById('resumenNeto').textContent = `${neto.toFixed(2)} ${movimientoActual.moneda}`;
  
  // Mostrar resumen
  document.getElementById('resumenOperacion').classList.remove('d-none');
}

function confirmarMovimiento() {
  const montoBruto = parseFloat(document.getElementById('montoModal').value);
  
  if (isNaN(montoBruto) || montoBruto <= 0) {
    mostrarMensaje("Ingrese un monto válido.", "warning");
    return;
  }
  
  const tipoNormalizado = normalizarOperacion(movimientoActual.tipo);
  const { comision, neto, tasa } = calc.calcularPorOperacion(
    montoBruto, 
    tipoNormalizado, 
    movimientoActual.moneda
  );
  
  // Realizar la operación
  let res;
  if (tipoNormalizado === "deposito") {
    res = controller.depositar(movimientoActual.moneda, neto);
  } else {
    res = controller.retirar(movimientoActual.moneda, neto);
  }
  
  // Mostrar resultado
  mostrarMensaje(res.mensaje, res.ok ? "success" : "danger");
  
  if (res.ok) {
    // Actualizar billetera y cerrar modal
    renderBilletera();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalMovimiento'));
    modal.hide();
  }
}


// FUNCIONES DE CALCULADORA DE COMISIONES

function actualizarTasaCalculadora() {
  const tipo = normalizarOperacion(tipoOperacionInput.value);
  const moneda = divisaInput.value;
  tasaInput.value = calc.obtenerTasa(tipo, moneda);
}

function calcularComision() {
  const monto = parseFloat(montoInput.value);
  const tipo = normalizarOperacion(tipoOperacionInput.value);
  const moneda = divisaInput.value;

  if (isNaN(monto) || monto <= 0) {
    mostrarMensaje("Ingrese un monto válido.", "warning");
    return;
  }

  const { comision, neto, tasa } = calc.calcularPorOperacion(monto, tipo, moneda);

  tasaInput.value = tasa;
  comisionEstimada.textContent = `${comision.toFixed(2)} ${moneda}`;
  totalRecibir.textContent = `${neto.toFixed(2)} ${moneda}`;
}


// EVENT LISTENERS - NAVEGACIÓN

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

itemAnalisis.addEventListener("click", () => {
  irA(paginaAnalisis, itemAnalisis);
  renderAnalisis();
});

itemBilletera.addEventListener("click", () => {
  irA(paginaBilletera, itemBilletera);
  renderBilletera();
  actualizarTasaCalculadora();
});

/* itemCentroAprendizaje.addEventListener("click", () => {
  irA(paginaCentroAprendizaje, itemCentroAprendizaje);
}); */

// ====== NAVEGACIÓN: CENTRO DE APRENDIZAJE ======
itemCentroAprendizaje.addEventListener("click", () => {
    paginaInicio.classList.add("d-none");
    paginaPortafolio.classList.add("d-none");
    paginaAnalisis.classList.add("d-none");
    paginaBilletera.classList.add("d-none");

    paginaCentroAprendizaje.classList.remove("d-none");
});


// EVENT LISTENERS - INICIO/TRADING

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

inputAccion.addEventListener("input", recalcularDesdeAccion);
inputDinero.addEventListener("input", recalcularDesdeDinero);

btnComprar.addEventListener("click", () => realizarOperacion("compra"));
btnVender.addEventListener("click", () => realizarOperacion("venta"));

btnUSD.addEventListener("click", () => cambiarMoneda("USD"));
btnUYU.addEventListener("click", () => cambiarMoneda("UYU"));

switchModo.addEventListener("change", () => {
  controller.setModo(switchModo.checked);
  cargarSelectActivos();
  actualizarDatosActivo(selectActivo.value);
  pintarHistorial();
});


// EVENT LISTENERS - PORTAFOLIO

btnCategoriaTodas.onclick = () => cambiarCategoria("Todas");
btnCategoriaBonos.onclick = () => cambiarCategoria("Bonos");
btnCategoriaCripto.onclick = () => cambiarCategoria("Criptomonedas");
btnCategoriaForex.onclick = () => cambiarCategoria("Forex");
btnCategoriaAcciones.onclick = () => cambiarCategoria("Acciones");

inputBuscarPortafolio.oninput = renderPortafolio;
btnVerMasPortafolio.onclick = () => {
  limiteTarjetas += 3;
  renderPortafolio();
};


// EVENT LISTENERS - ANÁLISIS

btnCategoriaAnalisisTodas.onclick = () => cambiarCategoriaAnalisis("Todas");
btnCategoriaAnalisisBonos.onclick = () => cambiarCategoriaAnalisis("Bonos");
btnCategoriaAnalisisCripto.onclick = () => cambiarCategoriaAnalisis("Criptomonedas");
btnCategoriaAnalisisForex.onclick = () => cambiarCategoriaAnalisis("Forex");
btnCategoriaAnalisisAcciones.onclick = () => cambiarCategoriaAnalisis("Acciones");

buscarAnalisis.oninput = renderAnalisis;

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


// EVENT LISTENERS - BILLETERA (ACTUALIZADOS)

btnDepositoUSD.addEventListener("click", () => abrirModalMovimiento("USD", "deposito"));
btnRetiroUSD.addEventListener("click", () => abrirModalMovimiento("USD", "retiro"));
btnDepositoUYU.addEventListener("click", () => abrirModalMovimiento("UYU", "deposito"));
btnRetiroUYU.addEventListener("click", () => abrirModalMovimiento("UYU", "retiro"));


// EVENT LISTENERS - CALCULADORA DE COMISIONES

tipoOperacionInput.addEventListener("change", actualizarTasaCalculadora);
divisaInput.addEventListener("change", actualizarTasaCalculadora);
btnCalcularComision.addEventListener("click", calcularComision);


// EVENT LISTENERS DEL MODAL DE MOVIMIENTOS

document.getElementById('montoModal')?.addEventListener('input', actualizarResumenOperacion);
document.getElementById('btnConfirmarMovimiento')?.addEventListener('click', confirmarMovimiento);
document.getElementById('montoModal')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    confirmarMovimiento();
  }
});


// INICIALIZACIÓN

irA(paginaInicio, itemInicio);
cargarSelectActivos();
pintarHistorial();


// FUNCIONES GLOBALES

window.irAInicio = function(idActivo) {
  irA(paginaInicio, itemInicio);
  selectActivo.value = idActivo;
  selectActivo.dispatchEvent(new Event("change"));
  inputAccion.value = 1;
  recalcularDesdeAccion();
};



// ELEMENTOS DOM - CENTRO DE APRENDIZAJE


const contenedorVideos = document.getElementById("contenedorVideos");
const btnVerMasVideos = document.getElementById("btnVerMasVideos");
const inputBuscarCentro = document.querySelector(
  "#paginaCentroAprendizaje input[type='search']"
);


// FUNCIONES - CENTRO DE APRENDIZAJE


// Inicialmente solo 4 videos visibles
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
  btnVerMasVideos.textContent =
    videosVisibles >= videos.length ? "Ver menos" : "Ver más";
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
  const texto = inputBuscarCentro.value.toLowerCase().trim();
  const videos = document.querySelectorAll("#contenedorVideos .video-item");

  // Mostrar todos los videos antes de filtrar
  videos.forEach(v => {
    v.classList.remove("d-none"); 
    v.style.display = ""; // reset
  });

  // Aplicar filtro
  videos.forEach(v => {
    const titulo = v.querySelector("small").textContent.toLowerCase();
    const coincide = titulo.includes(texto);

    // Si no coincide → ocultar
    if (!coincide) {
      v.style.display = "none";
    }
  });

  // Si hay texto → ocultar el botón "ver más"
  btnVerMasVideos.style.display = texto.length > 0 ? "none" : "";

  // Si no hay texto → restaurar visibilidad normal
  if (texto.length === 0) {
    videosVisibles = 4;
    actualizarVisibilidadVideos();
  }
}



// EVENTOS - CENTRO DE APRENDIZAJE

btnVerMasVideos?.addEventListener("click", toggleVerMasVideos);
inputBuscarCentro?.addEventListener("input", filtrarVideosCentro);

itemCentroAprendizaje.addEventListener("click", () => {
  irA(paginaCentroAprendizaje, itemCentroAprendizaje);

  // Reiniciar vista al entrar
  videosVisibles = 4;
  actualizarVisibilidadVideos();
  filtrarVideosCentro();
});



// INICIALIZACIÓN

irA(paginaInicio, itemInicio);
cargarSelectActivos();
pintarHistorial();

// Centro aprendizaje: establecer visibilidad inicial
actualizarVisibilidadVideos();
