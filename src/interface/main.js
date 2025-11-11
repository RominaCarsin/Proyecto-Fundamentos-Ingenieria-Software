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