[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20553875)

# 🚀 Proyecto 2025 S2

## 📝 Documentación del proyecto

La documentación completa del proyecto se encuentra en la carpeta `docs`.

| Informe           | Descripción                                                  |
| :---------------- | :----------------------------------------------------------- |
| `informe_1`       | Primer informe para la primera entrega.                      |
| `informe_2`       | Segundo informe para la segunda entrega.                     |
| `informe_testing` | Informe de testing y calidad del software (Segunda Entrega). |

**⚠️ Importante:** La entrega final debe realizarse tanto a través de este repositorio de Github como por la plataforma de **Gestión**.

---

## 📂 Estructura del proyecto

- `docs/`: Contiene toda la documentación, informes y especificaciones del proyecto.
- `src/`: **Código fuente** de la aplicación.
  - `domain/`: **Lógica de negocio** principal y sus respectivos **tests**.
  - `interface/`: Componentes de la **interfaz de usuario** y la lógica de presentación.
- `package.json`: Archivo de configuración de **npm**, que gestiona dependencias y scripts.
- `eslint.config.js`: **Configuración de ESLint** para mantener un código limpio y consistente.

---

## 🔗 Recursos adicionales

- **Letra del proyecto:** Encuentra el enunciado del problema y los requisitos detallados en **Aulas**.
- **Rúbrica de evaluación:** Los criterios de evaluación del proyecto están disponibles en la misma plataforma.



# Guía de Navegación y Funcionamiento de TradeUy

Toda la navegación se realiza mediante el **menú lateral izquierdo** (en computadora) o menu , visible en toda la página.

Los datos principales (activos, precios, saldos, rendimientos, videos, etc.) ya vienen **precargados**, por lo que se puede usar la aplicación sin ingresar datos externos.

---

## Navegación General

El menú lateral incluye:

- **Inicio**
- **Portafolio**
- **Análisis de Mercado**
- **Billetera**
- **Centro de Aprendizaje**

Para cambiar de sección, simplemente hacer clic en el icono correspondiente.  
La sección activa queda resaltada.

En la esquina superior derecha está el interruptor **“Cuenta Demo / Real”**:  
Esto cambia los datos visibles (precios, activos, saldos, historial, etc.), estos datos se aplican a todas las secciones de la pagina.

---

# Inicio (Trading)

En esta pantalla el usuario puede **comprar y vender activos**, ver precios en tiempo real y analizar la **gráfica dinámica**.

### Funcionalidades principales:

- Seleccionar un activo (MSFT, BTC, EUR/USD, etc.)
- Ver su precio actual
- Ingresar **cantidad de activos** o **dinero** (Es mas complejo comprar por dinero pues este actualiza cada un segundo, timpo insuficiente para realiazar la accion), y el sistema calcula la otra variable automáticamente
- Cambiar la moneda de la operación (USD o UYU)
- Ejecutar **compras** o **ventas**
- Ver **posiciones abiertas** Seria un historial de las compra/venta realizadas
- Visualizar gráfica de precio, con intervalos:
  - `min` (minutos)
  - `h` (horas)
  - `d` (días)
  - `m` (meses)
- Al hacer click sobre la gráfica se muestra el valor exacto del punto

La gráfica se actualiza automáticamente cada segundo.

---

# Portafolio

Sección que muestra una lista de activos con tarjetas visuales.
Solamnete muestra los activos en los se tiene dinero invertido.

### Características:

- Buscar activos por texto
- Filtrar por categoría:
  - Todas, Bonos, Criptomonedas, Forex, Acciones
- Ver:
  - Nombre  
  - Tipo  
  - Rendimiento  
  - Precio actual  
- Botón **“Ir”** para saltar directamente al Inicio con ese activo cargado
- Botón **“Ver más”** para cargar más activos

Los datos se actualizan automáticamente mientras el usuario está en esta sección.

---

# Análisis de Mercado

Vista en formato tabla para análisis rápido.

### Qué incluye:

- Búsqueda por nombre
- Filtros por categoría (igual que en Portafolio)
- Tabla con:
  - Nombre del instrumento
  - Rendimiento
  - Costo
  - Botón **Operar** (que lleva a Inicio con el activo ya seleccionado)
- Checkbox para seleccionar activos
- Panel de resumen con:
  - Total seleccionados
  - Promedio de rendimiento
  - Costo estimado
  - Hora de última actualización

Los datos se refrescan automáticamente cada segundo.

---

# Billetera

Muestra el estado financiero del usuario en **USD** y **UYU**.

Para cada divisa se muestra:

- Saldo total  
- Disponible  
- En garantía  
- Botones: **Depósito** y **Retiro**

### Modal de movimientos

Al elegir Depósito/Retiro aparece un modal donde el usuario puede:

1. Ver el tipo de operación (precargado según el botón)
2. Ver la moneda
3. Ingresar monto
4. Visualizar la comisión aplicada automáticamente
5. Confirmar la operación (actualiza los saldos)

---

# Calculadora de Comisiones

Herramienta ubicada debajo de la Billetera.

Permite:

- Elegir tipo de operación (Depósito o Retiro)
- Seleccionar método
- Escribir el monto
- Elegir divisa
- Calcular:
  - Comisión
  - Monto neto a recibir

La tasa se actualiza sola según la operación y moneda seleccionada.

---

# Centro de Aprendizaje

Sección dedicada al contenido educativo para el usuario.

### Incluye:

- Barra de búsqueda para filtrar material
- Vista inicial de 4 videos
- Botón **Ver más / Ver menos**
- Cada tarjeta tiene:
  - Imagen del video  
  - Título  
  - Botón **Ver**

Los videos son solo ilustrativos (no se reproducen dentro de la app).

---
---

# Actualizaciones Automáticas

La página se actualiza dinámicamente cada segundo:

- Precios del activo seleccionado
- Gráfica del Inicio
- Portafolio (si la ventana está activa)
- Análisis de Mercado (si la ventana está activa)

El sistema evita interrumpir al usuario mientras escribe en un campo.

---

# Modo Demo / Real

El switch superior alterna entre:

- Listas de activos diferentes  
- Precios distintos  
- Saldos independientes  
- Historial propio de cada modo  
- Comportamiento de simulación del mercado distinto

Puede cambiarse en cualquier momento, voliendo a la pagina de Inicio y cambiando el modo.


NOTA: En wave no se ve bien la pagina pero si funciona correactamente los controles. Se recomienda ver las alertas en la parte del codigo de wave.

Las alertas que se encuentran en Wave son por los videos de youtube 
---
