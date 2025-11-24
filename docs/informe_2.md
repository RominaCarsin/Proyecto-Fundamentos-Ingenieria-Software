# Informe Académico 2

## Selección de Funcionalidades

En esta etapa del proyecto de la aplicación de inversiones **TradeUy**, el equipo (Romina Carsin y Guzmán Costa) decidió implementar primero las funcionalidades esenciales que permiten al usuario **invertir desde el primer momento**, siguiendo la lógica de un MVP (Producto Mínimo Viable).

Las funcionalidades implementadas corresponden principalmente a:

- **RF1** – Visualización de instrumentos financieros  
- **RF2** – Compra y venta de activos  
- **RF3** – Cuenta demo  
- **RF4** – Historial de operaciones  
- **RF8** – Cumplimiento básico de seguridad  
- **RF11** – Mostrar comisiones  
- **RNF18** – Mostrar comisiones antes de ejecutar  
- **RNF20** – Uso de colores semánticos (verde/rojo)  
- **US1** – Ver portafolio con variaciones  
- **US2** – Comprar y vender activos  

Además, definimos una **nueva User Story (US7):**  
> *Como usuario, quiero depositar y retirar dinero en distintas monedas para gestionar mis fondos.*

### Funcionalidades priorizadas (MoSCoW)

| Prioridad | Funcionalidad |
|----------|---------------|
| **Must** | Compra y venta de activos |
| **Must** | Portafolio |
| **Must** | Depósito y retiro de dinero |
| **Should** | Análisis de mercado |
| **Should** | Aplicación transparente de comisiones |
| **Could** | Resumen para cada acción |
| **Won’t (por ahora)** | Configuración, alertas avanzadas, reportes descargables |

---

## Usabilidad y Accesibilidad

### Diseño UI/UX aplicado

El diseño de la interfaz se basó en:

- Jerarquía visual clara  
- Consistencia en colores azul/verde/rojo  
- Iconografía de Bootstrap Icons  
- Layout responsivo móvil/escritorio  
- Menú lateral expandible al pasar el mouse  

### Capturas del prototipo UI

> Pantalla de inicio  
![Pantalla Inicio](/mnt/data/af6e64cb-c2a6-400c-9f05-f73dd8bb6e2e.png)

> Pantalla Portafolio  
![Portafolio](/mnt/data/2107425a-2c0b-41aa-a10a-bee1b97c4565.png)

> Pantalla Análisis  
![Análisis](/mnt/data/fd4b2cd3-b0a6-4f39-ab49-17a53839e3e7.png)

> Pantalla Billetera  
![Billetera](/mnt/data/1e60eb8f-5535-42f2-959d-51a59ac19b5b.png)

---

### Principios de Usabilidad Aplicados (Nielsen)

| Heurística | Aplicación en TradeUy |
|------------|-----------------------|
| Visibilidad del estado | Botones activos en el menú, cambios de página inmediatos |
| Control y libertad | Botones claros de comprar/vender, navegación simple |
| Consistencia | Misma estructura para portafolio, análisis y billetera |
| Prevención de errores | Validaciones al comprar/vender y al depositar |
| Reconocer antes que recordar | Menú con iconos y texto, categorías visibles |

### Criterios WCAG aplicados

- Contrastes adecuados entre texto y fondo  
- Botones grandes con etiquetas claras  
- Navegabilidad por teclado (Tab)  
- Evitamos animaciones rápidas  

---

## Calidad de Código

Para esta entrega se definió una estructura modular clara:

src/
├── domain/
│ ├── Activo.js
│ ├── Portafolio.js
│ ├── Billetera.js
│ ├── Controller.js
│
├── interface/
│ ├── inicio.js
│ ├── portafolio.js
│ ├── analisis.js
│ ├── billetera.js
│
├── main.js


###  Estándares aplicados

- **ESLint** para estilo del código  
- Modulación estricta (UI separada de lógica de negocio)  
- Evitamos usar lógica en HTML  
- Nombres de variables consistentes  
- Comentarios y documentación interna  




