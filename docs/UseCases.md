## Use Cases (Casos de Uso)

Cada caso de uso describe **cómo interactúan los actores** con el sistema para lograr un objetivo concreto.  
Se detallan precondiciones, flujos principales y alternativos, postcondiciones y prioridad.

### **UC1 – Consultar portafolio**

**Actor:** Usuario autenticado  
**Precondición:** Tener inversiones activas  
**Flujo Normal:**

1. El usuario ingresa a “Portafolio”
2. El sistema muestra lista de activos con su variación diaria
3. Se genera gráfico de rendimiento
4. El usuario puede filtrar por tipo de activo o rango de fechas

**Flujo alternativo:**

- Si no hay inversiones → mostrar “No tenés activos todavía”

**Postcondición:** Información actualizada mostrada correctamente  
**Prioridad:** **<p style="color:green;">Should have </p>**

### **UC2 – Comprar activo**

**Actor:** Usuario autenticado  
**Precondición:** Tener saldo suficiente
**Flujo Normal:**

1. El usuario selecciona un activo (acción, cripto, etc)
2. Presiona “Comprar”
3. Ingresa monto o cantidad
4. El sistema calcula valor total y comisión (se direige a pagina Inicio con la informacion del activo seleccionado)
5. El usuario confirma la compra
6. El sistema ejecuta la orden y actualiza portafolio

**Flujos alternativos:**

- Si no hay saldo → operación rechazada por saldo insuficiente
- Si el mercado está cerrado → orden pendiente

**Postcondición:** Activo registrado en portafolio  
**Prioridad:** **<p style="color:blue;">Must have </p>**

### **UC3 – Configurar alerta de precio**

**Actor:** Usuario autenticado  
**Precondición:** Tener al menos un activo en seguimiento
**Flujo Normal:**

1. El usuario selecciona un activo
2. Configura umbral de precio (subida o bajada)
3. El sistema guarda la alerta.
4. Si se cumple la condición → se envía notificación

**Postcondición:** Alerta registrada correctamente

**Prioridad:** **<p style="color:yellow;">Could have </p>**

### **UC4 – Acceder a la sección educativa**

**Actor:** Usuario
**Precondición:** El usuario debe estar autenticado o acceder en modo invitado.

**Flujo Normal:**

1. El usuario selecciona la opción **“Centro de Aprendizaje”** en el menú lateral
2. El sistema muestra una lista de categorías (artículos, videos)
3. El usuario elige un contenido o utiliza la barra de búsqueda
4. El sistema despliega el contenido solicitado (artículo, video)
5. El usuario puede marcar el contenido como visto o agregarlo a favoritos

**Flujo alternativo:**

- Si no hay conexión a internet → se muestra mensaje “No se pudo cargar el contenido”.
- Si el contenido no existe → el sistema muestra “Elemento no disponible”.

**Postcondición:** El usuario accede al contenido educativo y puede consultarlo libremente.  
**Prioridad:** **<p style="color:green;">Should have </p>**

### **UC5 – Generar y descargar reporte PDF**

**Actor:** Inversionista avanzado  
**Precondición:** El usuario debe tener una cuenta activa y un portafolio con operaciones registradas.
**Flujo Normal:**

1. El usuario ingresa al módulo **“Billetera”** o **“Portafolio”**.
2. Selecciona la opción **“Generar reporte”**.
3. El sistema muestra filtros (rango de fechas, tipo de operación, activo).
4. El usuario define los parámetros y presiona **“Generar PDF”**.
5. El sistema compila la información y genera el archivo.
6. El usuario visualiza una vista previa y puede descargar o imprimir el reporte.

**Flujo alternativo:**

- Si no existen operaciones en el rango seleccionado → se muestra “No hay datos para generar el reporte”.
- Si ocurre un error en la generación del PDF → se notifica al usuario.

**Postcondición:** El reporte PDF se genera correctamente con los movimientos, montos y comisiones.  
**Prioridad:** **<p style="color:yellow;">Could have </p>**

### **UC6 – Mostrar advertencias de riesgo antes de invertir**

**Actor:** Usuario autenticado

**Precondición:**  
El usuario tiene saldo disponible e intenta realizar una operación (compra o venta) de un activo

**Flujo Normal:**

1. El usuario selecciona un activo y presiona **“Comprar”** o **“Vender”**
2. Antes de confirmar la operación, el sistema muestra un mensaje emergente con advertencias legales sobre el riesgo de pérdida de capital (esto se puede desactivar en configuracion).
3. Si el usuario acepta, el sistema permite confirmar la transacción.
4. La operación se ejecuta y se actualiza el portafolio.

**Flujos alternativos:**

- Si el usuario **no acepta** las advertencias → el sistema cancela la operación y vuelve a la pantalla anterior.
- Si el usuario intenta operar repetidamente sin aceptar → se bloquea temporalmente la acción y se muestra un mensaje recordatorio.

**Postcondición:**  
El sistema registra que el usuario aceptó las advertencias de riesgo (fecha y hora).

**Prioridad:** **<p style="color:green;">Should have </p>**

---

Las **User Stories y Use Cases** que presentamos buscan reflejar de manera realista las necesidades y expectativas de los usuarios uruguayos que invertirán en la plataforma. Al aplicar los criterios **INVEST** y la priorización **MoSCoW**, logramos organizar el trabajo en etapas claras y alcanzables, enfocándonos primero en lo esencial y luego en mejoras que realmente suman valor.
