# Informe Testing

- Link a Repositorio Testeado: https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran


## SESIONES DE PRUEBA EXPLORATORIA


###  SESIÓN 1 - Administración de Mi Dinero (Ingreso / Retiro)
---


### Misión
Evaluar el funcionamiento completo de la sección **Mi Dinero**, verificando validaciones de monto, comportamiento de los botones, actualización del saldo, interacción con diferentes monedas (USD/UYU), y consistencia visual del formulario. 
El objetivo es asegurar que los flujos de **Ingreso** y **Retiro** funcionen correctamente y no permitan estados inválidos o comportamientos ambiguos.


### Áreas
- **OS:** Windows 10 
- **Dispositivo:** Laptop Windows
- **Rol:** Usuario final
- **Funcionalidad:** Mi Dinero (Ingreso / Retiro) 
- **Estrategia:** Testing Exploratorio

### Inicio – Fin
28/11/2025 - 12:40 a 13:15 (35 min)

### División de tareas
- Diseño y ejecución: 50%
- Reporte de defectos: 20%
- Armado de sesión: 20%
- Configuración del ambiente: 10%

### Misión vs Oportunidad
**75 / 25**

### Archivo de datos
- Montos probados: 0, -10, 1, 10000, valores extremadamente grandes 
- Monedas probadas: USD y UYU 
- Saldos iniciales distintos 

### Notas de prueba
- Depositar montos válidos e inválidos 
- Intentar retirar más dinero del disponible 
- Validar actualización inmediata de saldo 
- Probar comportamiento del botón **Retirar** con saldo 0 
- Revisar consistencia visual en los botones 
- Evaluar qué sucede si se ingresan símbolos o caracteres inválidos 
- Verificar si el formulario permanece visible después de una operación exitosa 
- Confirmar si el campo mantiene valores tras un error 
- Analizar claridad de los textos: "Acción", "Ingresar", "Retirar"

### Riesgos
- Ingreso de montos inválidos puede generar estados financieros inconsistentes 
- Botón de retiro activo sin saldo puede inducir errores de usuario 
- Mensajes de error ambiguos impiden comprender la causa del fallo 
- Falta de claridad en botones afecta usabilidad 
- El formulario que desaparece tras una operación interrumpe el flujo de acción del usuario


### Incidentes detectados
- **BUG-001**: Campos permiten caracteres inválidos (“+”, “-”, “e”) 
- **BUG-002**: Botón de Retiro permanece activo con saldo 0 
- **BUG-007**: Formularios no borran valores tras error 
- **BUG-009**: Cantidades y montos grandes se muestran en notación científica  
- **DEF-015**: Botones de Depósito y Retiro poco claros (flujo confuso) 
- **DEF-016**: El formulario desaparece después de una operación exitosa 
- **DEF-022**: Sección de saldos demasiado grande (afecta jerarquía visual) 
- **DEF-017**: Falta de claridad en nombres de campos (“Acción”) 

### Inconvenientes
- La sección carece de una guía clara de uso 
- La interfaz requiere una gran comprension para acciones simples 
- El comportamiento del formulario no es intuitivo 

### Evidencias
Todas las capturas y videos se adjuntaron en los issues correspondientes.


###  SESIÓN 2 - Operar: Compra y Venta de Activos (Consistencia + Flujo Completo)
---

### Misión
Evaluar de forma integral la sección **Operar**, validando que los datos mostrados (precios, variaciones, nombres de activos) sean coherentes y completos, y que los flujos de **Compra** y **Venta** funcionen correctamente.  
Se busca asegurar que las validaciones se ejecuten en el momento adecuado, que los cálculos sean correctos y que la interfaz facilite la comprensión de la operación.

### Áreas
- **OS:** Windows 10 
- **Dispositivo:** Laptop Windows 
- **Rol:** Usuario inversor 
- **Funcionalidad:** Compra y Venta 
- **Estrategia:** Testing Exploratorio

### Inicio – Fin
28/11/2025 - 12:40 a 15:00 (2h 20 min)

### División de tareas
- Diseño y ejecución: 55% 
- Reporte de defectos: 25% 
- Armado de sesión: 10% 
- Configuración del ambiente: 10%

### Misión vs Oportunidad
**80 / 20**

### Archivo de datos
- Cantidades: 0, 1, -1, 0.5, valores extremadamente pequeños y extremadamente grandes  
- Monedas: USD y UYU  
- Activos: WMT, ETF S&P500, BTC, activos precargados  
- Fechas del sistema actual

### Notas de prueba
- Consistencia entre datos mostrados (nombre, precio, variación)  
- Verificación de precio total + comisión  
- Compras y ventas con valores válidos e inválidos  
- Valores extremadamente grandes/pequeños para validar cálculos  
- Cantidades fraccionarias  
- Ventas de activos inexistentes  
- Cambio de moneda y validación correcta del cálculo  
- Revisión del historial de operaciones  
- Confirmación del comportamiento del formulario después de operar  
- Análisis del botón “Confirmar operación” y su claridad semántica

### Riesgos
- Compra/Venta en condiciones inválidas genera pérdidas simuladas  
- Cálculos erróneos pueden falsificar montos  
- Datos inconsistentes afectan decisiones del usuario  
- Ventas podrían ejecutarse con moneda incorrecta  
- Las validaciones se hacen demasiado tarde generan frustración  
- Historial sin orden ni título dificultan trazabilidad
- Mensajes de error ambiguos impiden comprender la causa del fallo.
En la práctica, esto hace que el usuario pierda tiempo intentando repetir acciones que nunca van a funcionar.

### Incidentes detectados
- **BUG-001**: Campos permiten caracteres inválidos (“+”, “-”, “e”)  
- **BUG-003**: Permite comprar una acción con valor 0  
- **BUG-005**: Venta usa moneda incorrecta  
- **BUG-007**: Formularios no borran valores tras error  
- **BUG-009**: Notación científica en cantidades grandes  
- **BUG-010**: Cálculos incorrectos con números extremadamente grandes  
- **BUG-011**: Tablas no responsivas  
- **BUG-008**: Cancelar operación no limpia el formulario  
- **BUG-026**: Validación tardía: permite completar todo el flujo sin verificar saldo o activos
- **ENH-004**: Historial sin título  
- **DEF-013**: Alertas inconsistentes  
- **DEF-017**: Etiquetas poco descriptivas  
- **DEF-019**: Lista desplegable sobresale del teléfono  
- **DEF-021**: “Confirmar operación” induce a error  
- **DEF-023**: Selección de moneda/tipo de operación poco intuitiva  
- **DEF-024**: Falta desglose del cálculo  

### Inconvenientes
- Formularios desaparecen tras operar  
- No se muestran combinaciones válidas de operaciones  
- Exceso de clics para acciones simples  
- Falta feedback inmediato  
- En vista móvil, la tarjeta de confirmación no se visualiza correctamente

### Evidencias
Todas las capturas y videos se adjuntaron en los issues correspondientes.

###  SESIÓN 3 - Mis Inversiones (Consulta Histórica y Valuación)
---

### Misión
Verificar la funcionalidad de la sección **Mis Inversiones**, evaluando la consulta histórica, validación de fechas, coherencia temporal de las inversiones, comportamiento con fechas futuras, correcta ocultación de activos no comprados aún y consistencia en los mensajes de error.


### Áreas
- **OS:** Windows 10 
- **Dispositivo:** Laptop Windows 
- **Rol:** Usuario inversor 
- **Funcionalidad:** Mis Inversiones (Historial / Valuación) 
- **Estrategia:** Testing Exploratorio

### Inicio – Fin
28/11/2025 - 13:35 a 14:00 (25 min)

### División de tareas
- Diseño y ejecución: 60%
- Reporte de defectos: 25%
- Armado de sesión: 10%
- Configuración del ambiente: 5%

### Misión vs Oportunidad
**70 / 30**

### Archivo de datos
- Activos comprados previamente (mínimo 1)
- Fechas probadas: 
 - válidas 
 - vacías 
 - futuras 
 - anteriores a la compra 


### Notas de prueba
- Consultar valores históricos en diferentes fechas 
- Elegir fechas posteriores al día actual 
- Seleccionar fechas anteriores a la compra del activo 
- Validar coherencia temporal (activos que aún no existían) 
- Verificar tipo de alerta cuando la fecha es inválida 
- Evaluar si la fecha inválida bloquea cálculos y revisar si el sistema muestra valores ficticios 
- Probar comportamiento del botón “Actualizar valores” 
- Revisar si la tabla se actualiza correctamente

### Riesgos
- Fechas futuras pueden generar datos financieros inexistentes 
- Fechas anteriores a las compras pueden mostrar activos falsos 
- Alertas inconsistentes inducen a error 
- Falta de validación puede comprometer la integridad histórica del portfolio 
- Información financiera incorrecta puede alterar decisiones del usuario

### Incidentes detectados
- **BUG-006**: Validación incorrecta de fechas (futuras y anteriores a la compra) 
- **BUG-018**: Alerta no estándar y cálculos realizados con fecha inválida 
- **DEF-013**: Mensajes de alerta inconsistentes 

### Inconvenientes
- Falta feedback claro al seleccionar fecha inválida 
- Los cálculos no siempre coinciden visualmente con el activo seleccionado

### Evidencias
Todas las capturas y videos se adjuntaron en los issues correspondientes.

###  SESIÓN 4 - Usabilidad, Navegación, Accesibilidad y Estándares de Diseño UI
---

### Misión
Evaluar globalmente la aplicación InversionesUY en términos de experiencia de usuario, claridad visual, consistencia estética, accesibilidad, y navegación general.
El objetivo es identificar problemas transversales que afectan la interacción del usuario, independientemente de la funcionalidad técnica de cada módulo.

### Áreas
- **OS:** Windows 10
- **Dispositivo:** Laptop
- **Rol:** Usuario
- **Funcionalidad:** Diseño UI, Navegación, Accesibilidad, Responsividad
- **Estrategia:** Testing Exploratorio

### Inicio – Fin
29/11/2025 - 16:00 a 17:10 (1h 10min)

### División de tareas
- Diseño y ejecución: 65%
- Reporte de defectos: 20%
- Armado de sesión: 10%
- Configuración del ambiente: 5%

### Misión vs Oportunidad
**60 / 40**

### Archivo de datos
No aplica. Solo se evaluaron elementos visuales y de interacción presentes en la interfaz.

### Notas de prueba
- Revisión de la ubicación del menú principal
- Consistencia visual entre secciones
- Evaluación de responsividad en móviles
- Revisión de tamaños relativos (saldos, botones, tarjetas)
- Claridad semántica en etiquetas
- Flujo natural del usuario
- Visibilidad de elementos escondidos (scroll requerido)
- Detección de opciones ocultas o confusas
- Estándar de alertas y notificaciones
- Verificación de que los botones representen claramente su acción real

### Riesgos
- Inconsistencias visuales generan confusión
- Menú mal ubicado dificulta la navegación
- Controles poco claros pueden causar errores del usuario
- Falta de responsividad puede ocultar información importante
- Falta de accesibilidad puede limitar el uso en móviles o con teclado

### Incidentes detectados
- DEF-013 - Alertas inconsistentes
- DEF-014 - Falta estándar visual de botones
- DEF-015 - Botones de Depósito/Retiro confusos
- DEF-016 - Formulario desaparece tras operación exitosa
- DEF-017 - Etiquetas poco descriptivas (“Acción”, “Cantidad”, etc.)
- DEF-019 - Lista desplegable sobresale en móviles
- DEF-020 - Menú mal ubicado
- DEF-021 - “Confirmar operación” induce a error
- DEF-022 - Sección de saldos demasiado grande
- DEF-023 - Selección de moneda/tipo de operación poco intuitiva
- DEF-024 - Falta detalle de descomposición de comisión
- BUG-011 - Tablas no responsivas
- BUG-012 - Botón “Cerrar sesión” no hace nada

### Inconvenientes
- La app presenta un diseño inconsistente entre secciones
- La navegación exige más clics de lo esperado
- En móviles se pierde información por fuera del viewport
- La jerarquía visual está invertida (saldos gigantes, menú pequeño)
- Botones y labels no transmiten claramente su propósito
- Algunas operaciones requieren scroll que no se indica visualmente

### Evidencias
Todas las capturas y videos se adjuntaron en los issues correspondientes.

## CASOS DE PRUEBA

Las pruebas de compatibilidad se ejecutaron en múltiples sistemas operativos y navegadores web, con el objetivo de verificar que el sistema mantenga su estabilidad funcional y comportamiento consistente ante las variaciones propias de los diferentes entornos tecnológicos.

### Dispositivos utilizados
- Laptop Windows 10
- Laptop Windows 11
- Modo móvil simulado (Chrome, Opera y Edge DevTools) 

### Sistemas operativos evaluados
- Windows 11
- Windows 10

### Navegadores probados
- Google Chrome
- Microsoft Edge
- Firefox
- Opera

### Datos de prueba empleados
Se utilizaron datos representativos de distintas clases de equivalencia, incluyendo valores válidos, inválidos y de borde.
- **Montos:** 0, -1, 1, 0.5, 100000000000000000000
- **Cantidades:** 0, -1, 1, 0.00000000001, 100, 1e10
- **Activos:** WMT, ETF S&P500, BTC, y activos precargados en sistema
- **Fechas:** válidas, vacías, futuras, anteriores a la compra


## Diseño de los Casos de Prueba
Los casos de prueba fueron diseñados utilizando técnicas de **testing de caja negra**, evaluando el comportamiento del sistema exclusivamente desde la perspectiva del usuario final, sin considerar la implementación interna.
Estas técnicas permitieron cubrir escenarios normales, casos inválidos y condiciones extremas presentes en las tres secciones principales de la aplicación (Mi Dinero, Operar, Mis Inversiones).

### Técnicas utilizadas

### Partición de Equivalencia
- Cantidades válidas / inválidas
- Montos positivos / cero / negativos
- Fechas válidas / fuera de rango / futuras
- Activos existentes / inexistentes
- Operaciones completas / incompletas

### Análisis de Valores Límite
Se proban valores cercanos a los límites operativos definidos por las reglas de negocio del sistema. Los casos evaluados incluyeron:

- Cantidades mínimas válidas y valores ligeramente superiores a cero
- Montos extremadamente altos y bajos en operaciones financieras
- Fechas límite en consultas históricas (rangos mínimos y máximos)
- Cambios de moneda durante flujos de operación en curso

## Tabla de Casos de Prueba
Los casos de Pruebas probados se encuentran en [**casosDePruebaTesting.md**](casosDePruebaTesting.md)

## Conclusión
La aplicación fue evaluada aplicando técnicas de caja negra, partición de equivalencia y análisis de valores límite, permitiendo detectar defectos funcionales y de usabilidad que afectan la experiencia del usuario final. Los resultados obtenidos aportan información clave para priorizar correcciones y mejoras del sistema.



## REPORTES DE ISSUES

### Total de issues: 26

|Tipo de problema | Cantidad |
| --- | ---| 
|Bugs| 11|
|Posibles mejoras| 15|

### Tabla se issues

| ID        | Título                                                                                               | Tipo             | Severidad | Link |
|-----------|-------------------------------------------------------------------------------------------------------|------------------|-----------|------|
| BUG-001   | Campos “Monto” y “Cantidad” permiten caracteres inválidos (“+”, “-”, “e”)                             | Bug              | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/18 |
| BUG-002   | Botón de Retiro permanece activo con saldo 0                                                          | Bug              | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/19 |
| BUG-003   | Compra permite comprar una acción con valor 0                                                         | Bug              | Crítico   | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/20 |
| ENH-004   | Historial de operaciones no tiene título                                                              | Mejora           | Mayor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/21 |
| BUG-005   | Venta usa moneda incorrecta                                                                           | Bug              | Crítico   | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/22 |
| BUG-006   | Validación incorrecta de fechas (futuras y anteriores a la compra)                                    | Bug              | Crítico   | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/23 |
| BUG-007   | Formularios no borran valores tras error                                                              | Bug              | Mayor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/25 |
| BUG-009   | Cantidades grandes se muestran en notación científica (“1e10”)                                        | Bug              | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/26 |
| BUG-010   | Números extremadamente grandes rompen cálculos                                                        | Bug              | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/27 |
| DEF-011   | Tablas no responsivas en dispositivos móviles                                                         | Mejora           | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/28 |
| BUG-012   | Botón “Cerrar sesión” no hace nada                                                                    | Bug              | Menor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/29 |
| DEF-013   | Alertas inconsistentes (no siguen un estándar)                                                        | Mejora           | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/30 |
| DEF-014   | Falta estándar visual de botones                                                                      | Mejora           | Menor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/31 |
| DEF-015   | Botones de Depósito/Retiros poco claros                                                               | Mejora           | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/32 |
| DEF-016   | Formulario debería permanecer visible después de operación exitosa                                    | Mejora           | Menor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/33 |
| DEF-017   | Etiquetas poco descriptivas en “Operar” y “Mi dinero”                                                 | Mejora           | Menor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/34 |
| BUG-018   | Validación inconsistente de fechas y cálculo con datos inválidos                                      | Bug              | Alta      | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/35 |
| DEF-019   | Lista desplegable sobresale del teléfono                                                               | Mejora           | Baja      | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/36 |
| DEF-020   | Menú mal ubicado (posición no estándar en la página)                                                  | Mejora           | Crítica   | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/37 |
| DEF-021   | Botón “Confirmar operación” debería renombrarse                                                       | Mejora           | Baja      | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/38 |
| DEF-022   | Sección de saldos demasiado grande                                                                    | Mejora           | Mayor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/39 |
| DEF-023   | Selección de moneda/tipo de operación poco eficiente (usar toggles en vez de dropdowns)               | Mejora           | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/40 |
| DEF-024   | Falta desglose de operación (subtotal, comisión, total)                                               | Mejora           | Menor     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/41 |
| DEF-025   | Información incorrecta/confusa en “Mis Inversiones”                                                   | Mejora           | Media     | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/42 |
| BUG-026   | Validación tardía: permite completar todo el flujo sin verificar saldo ni activos disponibles         | Bug              | Alta      | https://github.com/IngSoft-FIS-2025-2/proyecto-m4c-apoj-rener-szafran/issues/43 |


## EVALUACIÓN GLOBAL DE CALIDAD

La evaluación integral del sistema se realizó combinando múltiples sesiones de testing exploratorio, el diseño y ejecución de casos de prueba funcionales de caja negra y el análisis detallado de los 26 issues reportados.
Este enfoque permitió obtener una visión completa sobre el estado actual del software en términos de funcionalidad, usabilidad, accesibilidad y confiabilidad.

### Funcionalidad

A nivel general, la aplicación cumple con los flujos funcionales principales: 
- Compra y venta de activos 
- Administración de dinero 
- Consulta histórica y visualización del portfolio 
- Cálculo de valores y variaciones diarias 

Sin embargo, durante las pruebas surgieron problemas relevantes que afectan la estabilidad operativa.

#### Hallazgos destacados
- Las validaciones permiten operaciones **inválidas** (ej.: compras con precio 0, ventas en moneda incorrecta, caracteres no numéricos).
- Varias validaciones se realizan **demasiado tarde**, permitiendo completar flujos enteros que fallan al final.
- Los cálculos fallan con números extremadamente grandes, generando “Infinity” o datos interrumpidos.
- La sección **Mis Inversiones** muestra información incorrecta en fechas futuras o previas a la compra.
- El flujo “Confirmar operación” tiene un nombre engañoso que sugiere acciones que no ocurren.

#### Conclusión funcional
La funcionalidad está implementada de forma general, pero requiere **refuerzos importantes en validaciones, cálculos y consistencia temporal**. 
Las fallas detectadas afectan directamente la transparencia y confiabilidad de las operaciones financieras. Haciendo que no sea una buena aplicaccion web para los usuarios.

### Usabilidad y accesibilidad

Aunque la herramienta wave encargada de evaluar la accesibilidad de sitios web no detecte ningun error o alerta. El análisis de usabilidad reveló múltiples inconsistencias visuales, semánticas y de navegación que afectan la claridad del sistema.

#### Hallazgos destacados
- Etiquetas poco descriptivas (“Acción”, “Cantidad”, “Confirmar operación”).
- Botones con estilos mixtos (degradado, sólido) sin un estándar visual uniforme.
- Jerarquía visual mal distribuida: la sección de saldos es desproporcionadamente grande.
- Controles importantes (moneda, tipo de operación) requieren demasiados clics.
- Listas desplegables que sobresalen en móviles.
- Alertas con formatos distintos, sin un estilo unificado.
- Los formularios desaparecen luego de una operación, interrumpiendo el flujo del usuario.

#### Conclusión de usabilidad
La experiencia de usuario presenta obstáculos que dificultan la comprensión de la interfaz, especialmente para usuarios nuevos. 
Se requiere una **normalización general del diseño**, con mejoras fuertes en flujos, etiquetas, responsividad y claridad visual.

### Confiabilidad

La confiabilidad del sistema depende de su capacidad para comportarse de forma estable y predecible, incluso ante condiciones extremas.

#### Hallazgos destacados
- El sistema es estable bajo uso normal, pero no es robusto frente a valores extremos.
- Falta validación temprana de saldo o activos disponibles (BUG-026).
- Cálculos incorrectos con cantidades grandes o extremadamente pequeñas.
- La consulta histórica permite valores “fantasma”, afectando la precisión financiera.
- Formularios no se resetean correctamente tras errores.

#### Conclusión de confiabilidad
El sistema funciona correctamente en condiciones ideales, pero presenta vulnerabilidades importantes frente a entradas no controladas. 
Requiere mejoras en validaciones previas, cálculos y manejo de errores para garantizar confiabilidad real.


### Recomendaciones de mejora
A partir del análisis de los issues y resultados de las pruebas, se recomiendan las siguientes mejoras prioritarias:

#### 1. Validaciones financieras
- Evitar compras/ventas con monto/precio 0.
- Validar rango permitido de cantidades y montos.
- Rechazar caracteres inválidos (“+”, “-”, “e”).

#### 2. Coherencia de datos
- Bloquear fechas futuras y previas a la compra en Mis Inversiones.
- Mantener siempre la moneda original de compra para las ventas.
- Agregar desglose: subtotal + comisión + total.

#### 3. Mejoras de usabilidad
- Mantener formularios visibles después de operaciones exitosas.
- Reemplazar dropdowns por botones toggle (USD/UYU, Compra/Venta).
- Usar etiquetas descriptivas: 
 - “Cantidad de acciones” 
 - “Tipo de operación” 
 - “Precio por acción”

#### 4. Accesibilidad y responsividad
- Reposicionar el menú en la parte inferior (estándar mobile).
- Evitar que tablas y listas sobresalgan del viewport.
- Reducir el tamaño de la sección de saldos.

#### 5. Mensajes y alertas estandarizadas
- Unificar diseño, tono, contenido e iconografía de alertas.
- Incluir siempre la causa del error y el campo involucrado.



## Conclusión

La aplicación presenta una base funcional sólida y permite ejecutar sus flujos principales. 
Sin embargo, el testing evidencia **fallas relevantes** en validaciones, cálculos, coherencia temporal, claridad visual y usabilidad.
Para garantizar una experiencia estable, se requiere hacer una **refactorización puntual**, con mejoras en **validaciones tempranas**, **estandarización visual** y **manejo correcto de datos críticos**.
Es prioritario:
- **Corregir con urgencia los problemas críticos**, ya que comprometen la confiabilidad de las operaciones financieras. 
- **Atender también los defectos mayores**, que afectan la claridad y el uso fluido de la interfaz.
Implementar estas mejoras permitirá ofrecer una aplicación **más segura, consistente y fácil de usar**.

