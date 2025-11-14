export default class Portafolio {
  #items = [];
  // Cada item: { id, activo, cantidad }

  agregar(activo, cantidad) {
    const existente = this.#items.find(item => item.id === activo.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.#items.push({
        id: activo.id,
        activo,
        cantidad
      });
    }
  }

  tiene(idActivo, cantidadNecesaria) {
    const item = this.#items.find(it => it.id === idActivo);
    if (!item) return false;
    return item.cantidad >= cantidadNecesaria;
  }

  restar(idActivo, cantidad) {
    const item = this.#items.find(it => it.id === idActivo);
    if (!item) return;

    item.cantidad -= cantidad;
    if (item.cantidad <= 0) {
      this.#items = this.#items.filter(it => it.id !== idActivo);
    }
  }

  obtener() {
    // copia superficial para no exponer el array interno
    return this.#items.map(it => ({ ...it }));
  }

  filtrar(texto) {
    const t = texto.toLowerCase();
    return this.#items.filter(it =>
      it.activo.nombre.toLowerCase().includes(t)
    );
  }

  filtrarCategoria(tipo) {
    const t = tipo.toLowerCase();
    return this.#items.filter(it =>
      it.activo.tipo.toLowerCase() === t
    );
  }

 getActivos() {
  // devolver copia para no exponer array interno
  return this.#items.map(it => ({ ...it }));
}
}
