//FUNCIONAMIENTO DE MENU
let itemInicio = document.getElementById("itemInicio");
let itemPortafolio = document.getElementById("itemPortafolio");
let itemAnalisis = document.getElementById("itemAnalisis");
let itemBilletera = document.getElementById("itemBilletera");


let paginaInicio = document.getElementById("paginaInicio");
let paginaPortafolio = document.getElementById("paginaPortafolio");
let paginaAnalisis = document.getElementById("paginaAnalisis");
let paginaBilletera = document.getElementById("paginaBilletera");


function mostrarPagina(paginaActiva) {
  let secciones = [paginaInicio, paginaPortafolio, paginaAnalisis, paginaBilletera];

  secciones.forEach((seccion) => {
    if (seccion === paginaActiva) {
      seccion.classList.remove("d-none");
    } else {
      seccion.classList.add("d-none");
    }
  });
}

// aux para actualizar el menú activo
function actualizarMenuActivo(itemActivo) {
  let items = [itemInicio, itemPortafolio, itemAnalisis, itemBilletera];
  items.forEach((item) => item.querySelector("a").classList.remove("active"));
  itemActivo.querySelector("a").classList.add("active");
}

//Caundo aprieto cada boton que hago en cada parte
itemInicio.addEventListener("click", () => {
  mostrarPagina(paginaInicio);
  actualizarMenuActivo(itemInicio);
});

itemPortafolio.addEventListener("click", () => {
  mostrarPagina(paginaPortafolio);
  actualizarMenuActivo(itemPortafolio);
});

itemAnalisis.addEventListener("click", () => {
  mostrarPagina(paginaAnalisis);
  actualizarMenuActivo(itemAnalisis);
});

itemBilletera.addEventListener("click", () => {
  mostrarPagina(paginaBilletera);
  actualizarMenuActivo(itemBilletera);
});

//Mostrar Inicio por defecto al cargar la página
mostrarPagina(paginaInicio);
actualizarMenuActivo(itemInicio);

console.log("✅ Sistema de navegación cargado correctamente");
