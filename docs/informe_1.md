# Informe Académico 1

## Repositorio Git

* Explicar cómo organizaron el repositorio.
* Describir la estrategia de branches usada (ej: `main`, `dev`, `feature/...`).
* Incluir pautas de commits (ej: conventional commits).
* Referenciar el README: qué contiene (objetivos, instrucciones de instalación, etc.).
* Evidencia (capturas o enlaces) de la estructura.

---

## Investigación

* Métodos de investigación utilizados: entrevistas, encuestas, análisis documental, ingeniería reversa, personas de usuario, etc.
* Presentar los hallazgos clave que fundamentan el proyecto.
* Justificar por qué la investigación respalda las decisiones de requisitos.
* Mostrar que fue exhaustiva (varias fuentes, más de un método).

---


## RF & RNF (Requisitos Funcionales y No Funcionales)

* Listar claramente los **Requisitos Funcionales (RF)**: qué debe hacer el sistema.
* Listar los **Requisitos No Funcionales (RNF)**: calidad, seguridad, rendimiento, usabilidad, restricciones de dominio, etc.
* Priorizar los requisitos (ej: MoSCoW, numeración).
* Asegurarse de que estén completos y sin ambigüedad.

---

## User Stories & Use Cases

* **User Stories (US):** Definidas con el formato *Como \[actor] quiero \[acción] para \[beneficio]*.
* Incluir criterios **INVEST** (independientes, negociables, valiosos, estimables, pequeños, testeables).
* Priorizar las US.
* **Use Cases (UC):** Diagramas o descripciones con actores, escenarios principales y alternativos.

---

## Modelo de Dominio

* Presentar un **Modelo Entidad-Relación (MER)** o **diagrama UML de clases**.
* Definir los conceptos principales y sus relaciones.
* Explicar brevemente cada entidad/concepto.

---

## Verificación y Validación

* **Verificación:** describir cómo comprobaron que los RF/RNF cumplen con lo especificado (revisiones, checklist, trazabilidad).
* **Validación:** actividades con usuarios (feedback de encuestas, entrevistas, prototipos).
* Mostrar resultados obtenidos y cómo influyeron en futuras mejoras al proyecto.

---

## Descripción del Trabajo Individual

* Detallar el trabajo de cada integrante:

  * Fechas
  * Actividades realizadas
  * Participantes
  * Cantidad de horas invertidas
* Incluir un cuadro o tabla con el resumen por persona (horas totales, tareas clave).

---

## Reflexión

* Reflexionar como equipo sobre:

  * Dinámica de trabajo y comunicación.
  * Dificultades y desafíos encontrados.
  * Qué funcionó bien y qué no.
  * Lecciones aprendidas hasta ahora.
* Mantener un tono crítico y constructivo, no sólo descriptivo.

### Organización del repositorio

El repositorio del proyecto se encuentra alojado en GitHub, bajo el nombre **`proyecto-m4c-carsin-costa`**.  
La estructura está organizada de forma modular, siguiendo una distribución clara entre documentación, código fuente y materiales de investigación.  
Las carpetas principales son:

- **`docs/`**: contiene toda la documentación académica y técnica del proyecto, incluyendo los informes, análisis de aplicaciones y bibliografía.  
  Dentro de esta carpeta se encuentran archivos como `informe_1.md`, `informe_2.md`, `informe_testing.md` y `investigacion.md`.

- **`interviews/`**: incluye los resúmenes de entrevistas realizadas a potenciales usuarios o inversionistas, fundamentales para la etapa de investigación de requisitos.

- **`reverseEngineering/`**: contiene los análisis comparativos y de ingeniería inversa de plataformas de inversión existentes (por ejemplo, IQ Option, eToro y Prex Uruguay).

- **`src/`**: aloja el código fuente de la aplicación, dividido en subcarpetas por dominio (`domain/`), interfaz (`interface/`) y demás componentes lógicos.

- Archivos adicionales como `.gitignore`, `README.md`, `package.json`, `package-lock.json` y `eslint.config.js` se incluyen en la raíz para manejo de dependencias, configuración del entorno y control de estilo del código.

Esta estructura busca mantener una **clara separación entre desarrollo y documentación**, lo que facilita tanto el trabajo colaborativo como la trazabilidad entre los entregables académicos y el código fuente.

---

### Estrategia de ramas (branches)

El repositorio adopta una estrategia de ramas basada en buenas prácticas de desarrollo colaborativo:

- **`main`**: rama principal del proyecto. Contiene las versiones estables y aprobadas, listas para la entrega o integración final.  
- **`develop`**: rama de desarrollo, donde se integran las funcionalidades nuevas antes de ser revisadas y fusionadas a `main`.  
- **`application-analysis`**: rama dedicada al análisis de aplicaciones de referencia y documentación asociada. Aquí se han incorporado los commits de investigación y los archivos `.md` de análisis comparativo.  
- **`interview`**: rama utilizada para la carga, edición y versionado de las entrevistas realizadas a usuarios e inversionistas.

Esta segmentación por ramas permite **aislar las tareas** de documentación, desarrollo y análisis, reduciendo conflictos y asegurando un flujo de trabajo más controlado. Cada rama tiene un propósito bien definido y se fusiona a `develop` o `main` sólo cuando su contenido está validado.

---

### Pautas de commits

Se utiliza la convención **Conventional Commits**, lo que permite mantener un historial de cambios claro y legible.  
El formato adoptado es:


Ejemplos de commits realizados:

- `docs(entrevistas): agregar entrevista 2 en entrevistas.md`  
- `docs(investigacion): agregar análisis del Whitepaper de Capital.com`  
- `docs(referencias): agregar bibliografía del análisis del Whitepaper`  
- `analysis: agregar análisis de la aplicación eToro`

Los tipos más utilizados son:
- **`docs`**: cambios en documentación o archivos de análisis.  
- **`feat`**: incorporación de nuevas funcionalidades.  
- **`fix`**: correcciones o ajustes.  
- **`analysis`**: commits asociados al trabajo de investigación y análisis de mercado.  

Gracias a este formato, el historial del proyecto mantiene coherencia y trazabilidad, facilitando tanto la revisión como la evaluación académica del trabajo.

---

### README del proyecto

El archivo **`README.md`** se encuentra en la raíz del repositorio y cumple una función informativa y organizativa.  
Incluye:

- **Título del proyecto:** *Proyecto 2025 S2*.  
- **Objetivo general:** desarrollar una aplicación de inversión enfocada en usuarios uruguayos.  
- **Descripción estructurada del repositorio**, especificando el propósito de cada carpeta (`docs`, `src`, etc.).  
- **Guía de entregas** con los nombres de los informes (`informe_1`, `informe_2`, `informe_testing`).  
- **Recursos adicionales:** enlace al enunciado del proyecto, rúbrica de evaluación y pautas de entrega.  
- **Instrucciones de instalación y uso del entorno**, así como la configuración de ESLint y dependencias npm.

El README sirve como **punto de entrada** tanto para el equipo como para los evaluadores, centralizando la información clave del repositorio y su documentación técnica.

---

### Evidencia visual

A lo largo del desarrollo se capturaron distintas evidencias del repositorio que demuestran su correcta organización, las ramas activas y la aplicación de commits convencionales:

- Estructura de carpetas (`docs`, `interviews`, `reverseEngineering`, `src`).  
- Historial de commits con descripciones formateadas según la convención.  
- Vista del archivo `README.md` con la estructura del proyecto y tablas descriptivas.  
- Ejemplos de los commits recientes en la rama `application-analysis`, donde se integran los archivos `analisis-prex.md`, `analisis-IQ-Option.md` y `analisis-etoro.md`.

Estas evidencias respaldan que el repositorio sigue una organización profesional, coherente con las buenas prácticas de control de versiones y documentación académica.


