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

