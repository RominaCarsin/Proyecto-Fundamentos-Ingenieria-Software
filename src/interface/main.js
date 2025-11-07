import { Country } from "../domain/country.js";
import { CountryList } from "../domain/countrylist.js";

const btnAdd = document.getElementById("btn-add");
const inpName = document.getElementById("inp-name");
const inpCapital = document.getElementById("inp-capital");

const mainCountryList = new CountryList();

btnAdd.addEventListener("click", () => {
  const newCountry = new Country(inpName.value);
  const countriesErrorContainer = document.getElementById(
    "add-countries-error",
  );
  const countriesError = document.getElementById("add-countries-error-msg");

  newCountry.setCapital(inpCapital.value);
  try {
    mainCountryList.add(newCountry);
    clearInputs();
    countriesErrorContainer.classList.add("d-none");
    loadCountryList(newCountry);
    appendAlert(`${newCountry.getNombre()} agregado correctamente!`, "success");
  } catch (error) {
    countriesErrorContainer.classList.remove("d-none");
    countriesError.innerText = error;
  }
});

function clearInputs() {
  inpName.value = "";
  inpCapital.value = "";
}

function loadCountryList(newCountry) {
  const countriesList = document.getElementById("countries-list");
  const countriesContainer = document.getElementById("countries");
  const emptyList = document.getElementById("empty-list");

  emptyList.classList.add("d-none");
  countriesContainer.classList.remove("d-none");
  let li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerText = newCountry.toString();
  countriesList.appendChild(li);
}

inpCapital.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnAdd.click();
  }
});

const alertPlaceholder = document.getElementById("alerts");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible pe-4" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};



// === FUNCIONES DE NAVEGACIÓN ===
function mostrarPagina(paginaMostrar, itemActivo) {
  // Oculta todas
  [paginaInicio, paginaPortafolio, paginaAnalisis].forEach(p => p.classList.add("d-none"));
  [itemInicio, itemPortafolio, itemAnalisis].forEach(i => i.querySelector("a").classList.remove("active"));

  // Muestra la elegida
  paginaMostrar.classList.remove("d-none");
  itemActivo.querySelector("a").classList.add("active");
}

// === SELECCIÓN DE ELEMENTOS ===
const itemInicio = document.getElementById("itemInicio");
const itemPortafolio = document.getElementById("itemPortafolio");
const itemAnalisis = document.getElementById("itemAnalisis");

const paginaInicio = document.getElementById("paginaInicio");
const paginaPortafolio = document.getElementById("paginaPortafolio");
const paginaAnalisis = document.getElementById("paginaAnalisis");

// === FUNCIÓN GENERAL ===
function mostrarPagina(paginaMostrar, itemActivo) {
  [paginaInicio, paginaPortafolio, paginaAnalisis].forEach(p => p.classList.add("d-none"));
  [itemInicio, itemPortafolio, itemAnalisis].forEach(i => i.querySelector("a").classList.remove("active"));
  paginaMostrar.classList.remove("d-none");
  itemActivo.querySelector("a").classList.add("active");
}

// === EVENTOS DE CLIC ===
itemInicio.querySelector("a").addEventListener("click", e => {
  e.preventDefault();
  mostrarPagina(paginaInicio, itemInicio);
});

itemPortafolio.querySelector("a").addEventListener("click", e => {
  e.preventDefault();
  mostrarPagina(paginaPortafolio, itemPortafolio);
});

itemAnalisis.querySelector("a").addEventListener("click", e => {
  e.preventDefault();
  mostrarPagina(paginaAnalisis, itemAnalisis);
});
