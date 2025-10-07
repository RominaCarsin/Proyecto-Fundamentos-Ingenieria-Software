# Informe Académico 1

## Repositorio Git

### Organización del repositorio

El repositorio del proyecto se encuentra alojado en GitHub, bajo el nombre **`proyecto-m4c-carsin-costa`**.  
La estructura está organizada de forma modular, siguiendo una distribución de  documentación, código fuente y materiales de investigación.  
Las carpetas principales son:

- **`docs/`**: contiene toda la documentación académica y técnica del proyecto, incluyendo los informes, análisis de aplicaciones y bibliografía.  
  Dentro de esta carpeta se encuentran archivos como **informe_1.md**, **informe_2.md**,**informe_testing.md** y **investigacion.md**.

- **`interviews/`**: incluye los resúmenes de entrevistas realizadas a usuarios de otras aplicaciones de trading y a posibles futuros usuarios, fundamentales para la etapa de investigación de requisitos (analisis de mercado).

- **`reverseEngineering/`**: contiene los análisis comparativos y de ingeniería inversa de plataformas de inversión existentes (tales como, IQ Option, eToro y Prex Uruguay).

- **`src/`**: aloja el código fuente de la aplicación, dividido en subcarpetas por dominio (**domain/**), interfaz (**interface/**) y demás componentes lógicos.

- Archivos adicionales como `.gitignore`, `README.md`, `package.json`, `package-lock.json` y `eslint.config.js` se incluyen en la raíz para manejo de dependencias, configuración del entorno y control de estilo del código.





### Estructura de Ramas del Repositorio

El repositorio sigue una estructura de ramas pensada para mantener un flujo de trabajo ordenado y colaborativo.  

Desde la rama principal **`main`** se desprende **`develop`**, que funciona como el espacio donde se concentran todas las modificaciones, pruebas y mejoras que se van realizando a lo largo del proyecto. Es, en otras palabras, la versión en desarrollo que va evolucionando hasta llegar al resultado final. Una vez que el proyecto alcanza una versión estable y completa, los cambios de **develop** se integran nuevamente en **main**.  

A partir de **`develop`** se crean dos ramas secundarias:  

- **`interview`**: utilizada para cargar y documentar todo lo relacionado con las entrevistas realizadas, ya sea con potenciales usuarios o con personas que utilizan otras aplicaciones similares del mercado.  
- **`application-analysis`**: enfocada en recopilar y registrar los análisis e investigaciones de ingeniería reversa sobre plataformas existentes, permitiendo entender sus funcionalidades y usabilidad para tomar referencias en el desarrollo propio.  

Esta estructura permite mantener separadas las distintas líneas de trabajo —desarrollo, análisis e investigación de usuarios— evitando conflictos entre ramas y asegurando que cada aporte se integre de forma controlada y clara en el flujo general del proyecto.

<img src="image.png" alt="alt text" width="400"/>

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

Por este formato, el historial del proyecto mantiene coherencia y trazabilidad, facilitando tanto la revisión como la evaluación académica del trabajo.
![alt text](image-2.png)
<img src="image-1.png" alt="alt text" width="400"/>

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

# Métodos de investigación

Los métodos de investigación que utilizamos fueron: **entrevistas**, **análisis de documentos** e **ingeniería reversa**.

## Análisis de documentos

Los aspectos más importantes del análisis de documentos son que:  
En Uruguay es ilegal operar sin un Broker, los cuales ejecutan transacciones rápidas cobrando comisiones, ofreciendo cuentas demo, apalancamiento y diversas plataformas. La rentabilidad se calcula comparando valores iniciales y finales, mientras el riesgo se gestiona mediante drawdown (caídas máximas), volatilidad y ratios riesgo/beneficio recomendables de 1:2 o superior.  
Métricas a tener en cuenta incluyen el Ratio de Sharpe (>1 es bueno) que mide rentabilidad ajustada al riesgo, y el Ratio de Calmar que relaciona ganancias con pérdidas máximas. Uruguay ofrece beneficios fiscales con carga total del 0,96% sobre utilidades, requiriendo que los bienes no ingresen físicamente al país.  
También que a la hora de no solo invertir sino también diseñar una aplicación la psicología del trading es fundamental, pues controlando emociones como miedo, avaricia y euforia, junto a sesgos cognitivos como exceso de confianza, se puede lograr un apalancamiento controlado, diversificación y stops loss que limitan pérdidas.  

Capital.com propone un modelo FinTech transparente usando IA para reducir sesgos emocionales, aunque su implementación local requiere adaptación regulatoria y tecnológica progresiva, manteniendo educación financiera y transparencia como pilares esenciales. Si bien es muy interesante este concepto, no es tan simple de implementar; por esta razón entendemos que lo mejor que podemos hacer es en todo momento dejar claros los riesgos.  

Un desarrollo más profundo de esta información se encuentra en **`investigacion.md`** dentro de la carpeta **docs**.

## Entrevistas

Aplicando el método de las entrevistas obtuvimos información valiosa, pues de esta manera conocimos cara a cara las dificultades y beneficios que tienen los traders al operar en este mercado.  
Las entrevistas se realizaron basándonos en una base de preguntas que se encuentran en **`Preguntas de entrevista.md`** dentro de la carpeta **interviews**.  

Se lograron concretar 3 entrevistas, dos con un experto y una con alguien fuera del ámbito.  
De las tres entrevistas realizadas, identificó varios puntos en común entre los participantes, más allá de su nivel de experiencia:

### Elementos compartidos por todos

Los tres coinciden en que la confianza y seguridad son fundamentales. Tanto el experto como el inversor que tuvo malas experiencias enfatizan la necesidad de regulación clara, preferentemente del Banco Central del Uruguay, y transparencia total en las operaciones. Los tres valoran que la plataforma sea rápida y fácil de usar, con una interfaz amigable e intuitiva que facilite la experiencia del usuario. Además, todos mencionan la importancia de la educación e información clara, ya sea mediante guías paso a paso, explicación de gráficos o alertas de noticias relevantes.

Un aspecto clave que surge es la flexibilidad en los métodos de verificación de seguridad. El usuario inexperto menciona específicamente la inconveniencia de las contraseñas largas y la doble autenticación constante, sugiriendo que sería ideal que la aplicación permita al usuario elegir entre diferentes métodos como huella digital, reconocimiento facial u otras opciones, según su preferencia personal.

### Aspecto destacado de la entrevista con el inversor experimentado

Un punto muy valioso que surge de la entrevista con el inversor que tuvo malas experiencias es su propuesta de garantizar al menos el capital inicial invertido, aunque se puedan perder las utilidades. Esta idea responde directamente al miedo generalizado a las estafas y podría ser un diferenciador clave para generar confianza en nuevos inversores. También sugiere enfocarse en inversiones locales tangibles -como construcción, ganado o forestación- y presentarse como "la plataforma de inversión de los uruguayos", aprovechando el sentido de identidad local como ventaja competitiva frente a plataformas internacionales.

Para conocer más sobre las entrevistas realizadas estas se encuentran en **entrevistas.md** dentro de la carpeta **interviews**. 

## Ingeniería reversa

Para complementar toda esta información obtenida también usamos el método de ingeniería reversa; para esto analizamos tres aplicaciones existentes en el mercado: **eToro**, **IQ Option** y **Prex**.  
Considerando un análisis comparativo de estas aplicaciones se sabe que:

### Puntos fuertes por plataforma

**Prex Uruguay:**  
- Fácil acceso con pesos uruguayos (sin necesidad de cuentas internacionales)  
- Respaldo del Banco Central de Uruguay - genera mayor confianza local  
- Mínimos de inversión bajos (desde USD 10) ideal para principiantes  
- Interfaz simple y educativa para quienes comienzan  

**IQ Option:**  
- Cuenta demo con USD 10,000 virtuales - excelente para practicar sin riesgo  
- Herramientas de análisis técnico completas (RSI, MACD, medias móviles)  
- Gráficos personalizables con múltiples indicadores y herramientas de dibujo  
- Múltiples instrumentos en una sola app (forex, criptos, acciones, commodities)  

**eToro:**  
- CopyTrading - permite copiar operaciones de traders exitosos  
- Interfaz moderna e intuitiva - muy amigable para principiantes  
- Comunidad activa y componente social del trading  
- eToro Academy - mejor contenido educativo integrado  
- Regulación sólida (FCA, CySEC, ASIC) - mayor seguridad  

Sin embargo no todo es bueno también hay **problemas comunes**:  
Demoras en retiros (especialmente IQ Option y eToro)  
Comisiones ocultas o poco claras (todas tienen este problema en algún aspecto)  
Falta de soporte personalizado - atención al cliente deficiente  
Curva de aprendizaje pronunciada para funciones avanzadas  

#### **Sacar lo mejor de todo**
Ante esto un buen inició de partida para el desarrollo de una nueva aplicación de trading para Uruguay sería:  
Implementar el CopyTrading de eToro combinado con la simplicidad de Prex  
Incluir cuenta demo robusta como IQ Option pero más realista  
Ofrecer herramientas técnicas avanzadas pero con interfaz gradual según experiencia  
Garantizar transparencia total en comisiones y procesos de retiro ágiles  
Mantener identidad local y regulación uruguaya como Prex pero con funcionalidad internacional  

La plataforma ideal tomaría la confianza institucional de Prex, las herramientas técnicas de IQ Option y la innovación social de eToro, adaptado al mercado uruguayo. *(estos no son los requisitos pero está bueno poner los pies en la tierra)*

El analisi de las aplicaciones se encuentra dentro de la carpeta reverseEngineering y dentro de esta encontrara los archivos:  **`analisis etoro.md`**,  **`analisis-IQ-Option.md`**, **`analisi-prex.md`**.


## Bibliografias
Berciano, E. (Director). (2025, March 16). Cómo Configurar STOPLOSS y TAKE PROFIT en ETORO para hacer SWING TRADING. https://www.youtube.com/watch?v=-yjKzscGeTs

como abrir una operacion en iq option - Google Search. (n.d.). Google.com. Retrieved October 7, 2025, from https://www.google.com/search?sca_esv=1ecdb2dd816d191e&sxsrf=AE3TifPrqGOsMXvwPyBrzQ3nc6FTMr6arw:1759775002243&udm=7&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQf-5E2B2fzLEKeWLyFzQTKceRtMrXpsj_Na9j6JAyaRgCOELN0KG6HnZhsi4unsbpAtNpApXWFglPZsYR2xlYT903z17GoYQKxVnswTo3-MxbeihWbVXmxKywR0qFfoOpc5vLMpbfgn2120mq8xn_c0-dUoEzg4z6aZEKEXCGtHPgIk0WY8NlM0gg5s-jZuxgDocmvA&q=como+abrir+una+operacion+en+iq+option&sa=X&ved=2ahUKEwiKwZLfmJCQAxUaP7kGHasiLg4QtKgLegQIFBAB&biw=1536&bih=730&dpr=1.25

Invierta con eToroTM. (n.d.). Etoro.com. Retrieved October 7, 2025, from https://www.etoro.com/es/

IQOption: Es un bróker confiable? (2023, November 19). Sololosmejores.net. https://sololosmejores.net/iqoption-libertex-latam/?gcam=586-820-9117&utm_source=solosmejores&utm_medium=cpc&utm_campaign=22470028496&campaignid=stocks&kw=account_000_solosmejores-586-820-9117_campaign_22470028496keywordiq%20optiondevicec&gad_source=1&gad_campaignid=22470028496&gbraid=0AAAAAo0A5n2qVwPrYeyIrCkbcVKXkrPt7&gclid=Cj0KCQjw0Y3HBhCxARIsAN7931WPYNLLHQStOxdKUQUPizNKrdXBHznCl0ylw3JGLRg1bhMin6nAOAoaAgVKEALw_wcB

Landing Presencial Curso Trading AW » 🎓 MVDtrading Academia de Inversiones. (2024, November 7). 🎓 MVDtrading Academia de Inversiones; MVDtrading 🎓. https://www.mvdtrading.com/curso-trading-presencial-aw/?campaignid=11435171645&adgroupid=111060982079&adid=474492905653&gad_source=1&gad_campaignid=11435171645&gbraid=0AAAAADh2uNLI6ocVlkKm-fXcGJtCOTnsZ&gclid=Cj0KCQjw0Y3HBhCxARIsAN7931VXiQkWu1q-xgiCKqALn0JApKtUvQ5WE-dANCKK8hPp3q_mC94Ma5caAkUTEALw_wcB

Ley N� 16906. (n.d.). Com.uy. Retrieved October 7, 2025, from https://www.impo.com.uy/bases/leyes/16906-1998

RÉGIMEN DE TRADING EN URUGUAY. (2023, August 2). Borche & Asuaga - Estudio Contable - BAC. https://bac.com.uy/trading-en-uruguay/

Torres, F. (2023, May 24). Las 7 emociones a controlar en el trading. IG. https://www.ig.com/es/estrategias-de-trading/las-7-emociones-a-controlar-en-el-trading-230518

---
# Requerimientos

## Requerimientos Funcionales (Lo que el sistema debe hacer)
- Que el sistema permite visualizar una **lista actualizada de instrumentos financieros** (acciones, divisas, criptomonedas, commodities) con precios en tiempo real.  
- Que los usuarios puedan ejecutar operaciones de compra y venta en el mercado, eligiendo entre órdenes a mercado o con límites de precio.  
- Que se ofrezca una **cuenta demo** con saldo virtual para practicar operaciones sin  riesgo, simulando condiciones reales.  
- Que el sistema muestre de forma clara y organizada el **historial de operaciones** de cada usuario, incluyendo datos de fecha, tipo, monto y resultado.  
- Que los usuarios puedan **consultar métricas de rentabilidad y riesgo** (Ej: drawdown, ratio Sharpe, ratio riesgo/beneficio).  
- Que la aplicación incluya una **sección educativa con guías**, artículos o videos sobre inversión responsable y psicología del trading.  
- Que el sistema envía **notificaciones al usuario sobre ejecuciones de órdenes, movimientos importantes del mercado o actualizaciones relevantes**.  
- Que el sistema cumpla con los **requisitos legales y de seguridad** exigidos por el **Banco Central del Uruguay y la Ley Nº 16.906**.  
- Que el sistema permita a los usuarios **editar su perfil**, incluyendo preferencias de idioma, métodos de pago y configuración de seguridad.
- Que el sistema permita las **operaciones con múltiples monedas**..
- Que el sistema **muestre todas las comisiones aplicables** a cada operación y no oculte cargos adicionales.
- Que se incorporen **advertencias visibles y recurrentes** sobre los riesgos del trading.



## Requerimientos No Funcionales (Como el sistema debe hacerlo)

- Que la **interfaz sea intuitiva, clara y fácil de usar desde cualquier dispositivo **(computadora o móvil).
- Que las páginas o vistas principales **se acceden en menos de 5 clicks**. 
- Que las **operaciones** se hagan de **manera instantánea**. 
- Que el sistema funcione correctamente en los principales sistemas **Android/iOS y windows**.  
- Que el **código fuente** se mantenga modular, documentado y versionado en **GitHub**, facilitando su mantenibilidad.  
- Que el sistema **muestre las comisiones o costos antes de ejecutar cualquier transacción**.  
- Que el sistema pueda **soportar múltiples idiomas** y desarrollarse en principio en español e inglés   
- El sistema debe presentar colores verdes y rojos tanto en los botones (subir y bajar y/o compra y venta) como en las gráficas, para indicar si sube o baja una acción.

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
* Mantener un tono crítico y constructivo, no sólo descriptivo


# Aca empieza





