import { Usuario } from "../domain/usuario.js";
import { Activo } from "../domain/activo.js";
import { Transaccion } from "../domain/transaccion.js";

//Datos cargados

const activosDemo = [
  new Activo(1, "Microsoft (MSFT)", "Acciones", 498.57, 2.1),
  new Activo(2, "Apple (AAPL)", "Acciones", 220.1, -1.2),
  new Activo(3, "Bitcoin (BTC)", "Criptomonedas", 101245.2, 3.3),
  new Activo(4, "Bono UY", "Bonos", 100.0, 0.8),
];

let usuario = new Usuario("Demo User", "demo@tradeuy.com");
let monedaActual = "USD";
const cotizaciones = { USD: 1, UYU: 40 };
let activoSeleccionado = null;
let modoDemo = true;
let activosActuales = [...activosDemo];
let operacionesAbiertas = [];

//hago ref para no reepetir todo el tiempo codigo - luego cambiarlo
let itemsMenu = document.querySelectorAll('[id^="item"]');
let switchCuenta = document.getElementById("switchCheckDefault");
let selectAccion = document.getElementById("selccionDeAccionInicio");
let tipoAccion = document.getElementById("tipoAccion");
let valorAccionTexto = document.getElementById("idValorDeAccion");
let inputAccion = document.getElementById("accion");
let inputDinero = document.getElementById("dinero");
let btnUSD = document.getElementById("btnUSD");
let btnUYU = document.getElementById("btnUYU");
let textoPosiciones = document.getElementById("textoPosicionesAbiertas");
let btnComprar = document.getElementById("btnComprar");
let btnVender = document.getElementById("btnVender");

//GESTION DE MENU
function mostrarPagina(idPagina) {
  let paginas = document.querySelectorAll('[id^="pagina"]');
  for (let pagina of paginas) {
    pagina.classList.toggle("d-none", pagina.id !== idPagina);
  }
}

function actualizarMenuActivo(idItem) {
  for (let item of itemsMenu) {
    let link = item.querySelector("a");
    if (link) link.classList.toggle("active", item.id === idItem);
  }
}

function configurarMenu() {
  for (let item of itemsMenu) {
    item.addEventListener("click", function (e) {
      if (item.classList.contains("disabled-link")) {
        e.preventDefault();
        return;
      }
      let nombre = item.id.replace("item", "pagina");
      mostrarPagina(nombre);
      actualizarMenuActivo(item.id);
    });
  }

  mostrarPagina("paginaInicio");
  actualizarMenuActivo("itemInicio");
}

//Cambio de modo
function cambiarModoCuenta() {
  modoDemo = switchCuenta.checked;
  let etiqueta = document.querySelector('label[for="switchCheckDefault"]');
  etiqueta.textContent = modoDemo ? "Cuenta Demo" : "Cuenta Real";

  if (modoDemo) {
    activosActuales = [...activosDemo];
  } else {
    activosActuales = [
      new Activo(5, "Ethereum (ETH)", "Criptomonedas", 3750.2, 1.1),
      new Activo(6, "UYU/USD", "Forex", 0.025, 0.3),
    ];
  }

  cargarAcciones();
  limpiarCampos();
  actualizarPosiciones();
}

//INICIO
function cargarAcciones(lista) {
  if (!lista) lista = activosActuales;
  selectAccion.innerHTML = "<option value=''>Seleccione una acción</option>";

  for (let a of lista) {
    let opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = a.nombre;
    selectAccion.appendChild(opt);
  }
}

function seleccionarAccion() {
  let id = Number(selectAccion.value);
  activoSeleccionado = activosActuales.find((a) => a.id === id);

  if (!activoSeleccionado) {
    tipoAccion.value = "";
    valorAccionTexto.textContent = "Valor de Acción: -";
    inputAccion.value = "";
    inputDinero.value = "";
    return;
  }

  tipoAccion.value = activoSeleccionado.tipo;
  let precio = activoSeleccionado.precio * cotizaciones[monedaActual];
  valorAccionTexto.textContent = "Valor de Acción: $" + precio.toFixed(2);
  inputAccion.value = 1;
  inputDinero.value = precio.toFixed(2);
}

function filtrarPorTipo() {
  let tipoSeleccionado = tipoAccion.options[tipoAccion.selectedIndex].textContent.trim();

  if (tipoSeleccionado === "" || tipoSeleccionado === "Seleccione tipo") {
    cargarAcciones();
    activoSeleccionado = null;
    valorAccionTexto.textContent = "Valor de Acción: -";
    inputAccion.value = "";
    inputDinero.value = "";
    return;
  }

  let filtradas = activosActuales.filter((a) => a.tipo === tipoSeleccionado);
  cargarAcciones(filtradas);

  if (filtradas.length > 0) {
    let primerActivo = filtradas[0];
    selectAccion.value = primerActivo.id;
    activoSeleccionado = primerActivo;
    let precio = primerActivo.precio * cotizaciones[monedaActual];
    valorAccionTexto.textContent = "Valor de Acción: $" + precio.toFixed(2);
    inputAccion.value = 1;
    inputDinero.value = precio.toFixed(2);
  } else {
    activoSeleccionado = null;
    valorAccionTexto.textContent = "Valor de Acción: -";
    inputAccion.value = "";
    inputDinero.value = "";
  }
}


function cambiarMoneda(nuevaMoneda) {
  monedaActual = nuevaMoneda;
  btnUSD.classList.remove("active");
  btnUYU.classList.remove("active");
  if (nuevaMoneda === "USD") btnUSD.classList.add("active");
  else btnUYU.classList.add("active");

  if (activoSeleccionado) {
    let precio = activoSeleccionado.precio * cotizaciones[monedaActual];
    valorAccionTexto.textContent = "Valor de Acción: $" + precio.toFixed(2);
    recalcularValores();
  }
}

function recalcularValores() {
  if (!activoSeleccionado) return;
  let cantidad = parseFloat(inputAccion.value) || 0;
  inputDinero.value = (cantidad * activoSeleccionado.precio * cotizaciones[monedaActual]).toFixed(2);
}


// OPERAR (COMPRAR / VENDER)

function operar(tipo) {
  let cantidad = parseFloat(inputAccion.value);
  let dinero = parseFloat(inputDinero.value);

  if (!activoSeleccionado) {
    mostrarAlerta("Debe seleccionar una acción antes de operar.");
    return;
  }

  if (isNaN(cantidad) || isNaN(dinero)) {
    mostrarAlerta("Debe ingresar una cantidad válida.");
    return;
  }

  if (cantidad <= 0 || dinero <= 0) {
    mostrarAlerta("La cantidad y el monto deben ser mayores que cero.");
    return;
  }

  try {
    if (tipo === "Compra") {
      activoSeleccionado.comprar(cantidad);
    } else {
      activoSeleccionado.vender(cantidad);
    }

    let transaccion = new Transaccion(
      tipo,
      activoSeleccionado.nombre,
      cantidad,
      dinero
    );

    usuario.registrarTransaccion(transaccion);
    operacionesAbiertas.unshift(transaccion);

    // Agrega la nueva transacción al panel sin borrar las anteriores
    agregarTransaccionAlPanel(transaccion);

    limpiarCampos();

    mostrarAlerta(tipo + " realizada con éxito.");
  } catch (error) {
    mostrarAlerta(error.message);
  }
}


//Mejora la pagina
function mostrarAlerta(mensaje) {
  // Crea la alerta
  let alerta = document.createElement("div");
  alerta.className = "alert alert-warning mt-2 py-2 px-3 text-center border border-warning";
  alerta.textContent = mensaje;

  // Inserta la alerta arriba sin borrar las operaciones
  textoPosiciones.prepend(alerta);

  // Elimina la alerta luego de 3.5 segundos
  setTimeout(function () {
    if (alerta && alerta.parentElement) {
      alerta.remove();
    }
  }, 3500);
}

function actualizarPosiciones() {
  if (usuario.transacciones.length === 0) {
    textoPosiciones.textContent = "Sin operaciones recientes.";
    return;
  }

  let recientes = usuario.transacciones.slice().reverse();
  let html = "";

  for (let t of recientes) {
    html +=
      "<div class='mb-1'><strong>" +
      t.fecha.toLocaleDateString() +
      "</strong> - " +
      t.tipo +
      " " +
      t.activo +
      " (" +
      t.cantidad +
      "u) por <span class='text-success'>$" +
      t.monto.toFixed(2) +
      "</span></div>";
  }

  textoPosiciones.innerHTML = html;
}
function agregarTransaccionAlPanel(transaccion) {
  if (!transaccion) return;

  //Agrega la nueva transacción en la parte superior del listado
  let item = document.createElement("div");
  item.className = "mb-1";
  item.innerHTML =
    "<strong>" +
    transaccion.fecha.toLocaleDateString() +
    "</strong> - " +
    transaccion.tipo +
    " " +
    transaccion.activo +
    " (" +
    transaccion.cantidad +
    "u) por <span class='text-success'>$" +
    transaccion.monto.toFixed(2) +
    "</span>";

  //Si es la primera transacción, limpiamos el mensaje por defecto
  if (textoPosiciones.textContent === "Sin operaciones recientes.") {
    textoPosiciones.innerHTML = "";
  }

  //Insertamos la nueva transacción al inicio del panel
  textoPosiciones.prepend(item);
}

function limpiarCampos() {
  inputAccion.value = "";
  inputDinero.value = "";
}


// EVENTOS PRINCIPALES, luego moverlo para arriba del todo

document.addEventListener("DOMContentLoaded", function () {
  configurarMenu();
  cargarAcciones();
  actualizarPosiciones();

  switchCuenta.addEventListener("change", cambiarModoCuenta);
  selectAccion.addEventListener("change", seleccionarAccion);
  tipoAccion.addEventListener("change", filtrarPorTipo);
  btnUSD.addEventListener("click", function () {
    cambiarMoneda("USD");
  });
  btnUYU.addEventListener("click", function () {
    cambiarMoneda("UYU");
  });
  inputAccion.addEventListener("input", recalcularValores);
  btnComprar.addEventListener("click", function () {
    operar("Compra");
  });
  btnVender.addEventListener("click", function () {
    operar("Venta");
  });
});
