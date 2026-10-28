# CLAUDE.md — VineReach

Guía para Claude Code. Léela entera antes de tocar nada.

## Quién y para qué

- **Pablo Orihuela** (Valladolid, 23 años). Perfil de ventas y marketing, con un máster en IA aplicada a negocio.
- **Objetivos:** (1) conseguir trabajo usando este proyecto como portfolio; (2) convertirlo en un negocio para bodegas.
- **Presupuesto:** gastar lo mínimo posible. Usar lo gratuito o lo que ya se paga: Make Pro, cuenta de Claude, Groq gratis, Resend gratis, Google Places dentro del cupo gratuito.
- **Idioma:** todo en español de España: código, comentarios, textos y commits.
- **Forma de trabajar:** directa. Separa siempre hechos, estimaciones y probabilidades. Si algo no es buena idea, dilo.

## Qué es VineReach

Un sistema de ventas con IA para bodegas, sobre todo de Castilla y León, que venden a hostelería. Tiene tres módulos:

| Módulo | Qué hace | Dónde vive | Estado (28/10/2026) |
|---|---|---|---|
| 1 · Contenido | Carruseles de LinkedIn sobre los vinos de una bodega | `apps/carruseles-agente/` (nuevo) · `index.html` + `script.js` (antiguo) | Nuevo: funciona como artefacto de Claude. Antiguo: publicado en GitHub Pages, **usa plantillas y no IA** |
| 2 · Prospección | Busca restaurantes y escribe un email de primer contacto para cada uno | Make, escenario `5789249` | Activo, cada lunes a las 8:00 |
| 3 · Reporting | Email semanal con métricas y dashboard público | Make, escenario `6494967` + `dashboard/index.html` | Activo, cada lunes a las 9:00 |

Estado detallado: `docs/estado.md`. Tareas pendientes, por prioridad: `docs/roadmap.md`. Escenarios de Make: `docs/make/README.md`.

## Estructura del repositorio

```
index.html, script.js, style.css   Generador ANTIGUO (plantillas fijas, sin IA). Es lo que sirve GitHub Pages en la raíz.
apps/carruseles-agente/index.html  Generador NUEVO con agente. No funciona fuera de Claude (ver más abajo).
dashboard/index.html               Dashboard público. Lee el CSV publicado de la pestaña "Metricas" de Google Sheets.
docs/                              Estado, tareas pendientes y documentación de Make.
```

No hay paso de compilación: son HTML/CSS/JS sueltos. Para probar en local, `npx serve .` o `python -m http.server 8080`.

## Generador con agente (`apps/carruseles-agente/index.html`)

- Está publicado como **artefacto privado de Claude**: https://claude.ai/artifact/KFwkFG5i6mMbwKeN6JBjqB. Usa la **cuenta de Claude de quien lo abre**; no lleva API key.
- Al volver a publicarlo con la herramienta Artifact, hay que declarar estas capacidades:
  `{"sample":{"images":true},"mcp":{"servers":[{"server":"Firecrawl","tools":["firecrawl_search","firecrawl_scrape"]}]},"downloads":true}`.
- El flujo es: investigar (Firecrawl, en el array `TOOLS`) → dossier editable → 3 enfoques → diseño de las slides en HTML libre de 1080×1350 → autorrevisión con una hoja de contactos en imagen y avisos automáticos de texto que se sale (`problems()`) → cambios por chat → PDF (html2canvas + jsPDF).
- El HTML que escribe Claude pasa por DOMPurify (`clean()`). No se permite `<style>`, `<script>` ni `url()`. La foto de la botella se mete como `<img data-foto>` y se convierte en un div con la imagen de fondo, porque html2canvas no soporta `object-fit`.
- **Fuera de un visor de Claude, `window.claude` no existe** y la página se queda en modo de solo ejemplo. Si se publica en GitHub Pages, no puede generar nada; para el portfolio se enseña en vídeo.
- Es una sola página: el marcado, el CSS y el JS van en un único archivo. Las librerías se cargan de cdnjs con versión fija.

## Reglas de contenido (no negociables)

1. **No inventar datos:** ni cifras, ni premios, ni precios, ni contactos. Lo que falte se marca como `[PLACEHOLDER]`. El generador antiguo tiene estadísticas inventadas ("80% de bodegas", "35%"), y hay que quitarlas o retirar ese generador.
2. **Lo público usa una bodega ficticia:** "Viñas del Cierzo", D.O. Cigales. Las bodegas reales, como Cuatro Rayas, solo se usan en material privado (vídeo, entrevistas) o con su permiso.
3. **Nunca firmar emails como una bodega que no es cliente** cuando el destinatario sea real.
4. **Nunca subir claves ni IDs privados al repositorio:** el repo es público. Las claves de Google Places, Groq y Resend están escritas a mano en los escenarios de Make; hay que moverlas a Keys de Make y renovarlas.

## Herramientas disponibles (conectores de Pablo)

- **Make**, por MCP. Organización `7668948`, equipo `1708480`, zona `eu1.make.com`. Antes de editar un escenario, lee y guarda su blueprint actual: `scenarios_update` **sustituye el blueprint entero**.
- **Firecrawl**, Gmail, Google Drive y Google Calendar, por MCP.
- **Claude Design** (tipo de artefacto Design) para piezas visuales. El carrusel de Cuatro Rayas está en https://claude.ai/artifact/5442fmNkRcg6rV7gkmL5Qx. Es privado y no se publica.

## Lecciones aprendidas en Make (28/10/2026)

- Al añadir de golpe un HTTP GET a la web del restaurante, un `SetVariables` con expresiones regulares y un gestor de errores `onerror`, el escenario dio `Cannot initialize the scenario … reading ''` y Make lo desactivó tras 3 fallos. **No se sabe cuál de los tres lo causó.** Hay que probar cada paso por separado en un escenario de prueba, nunca en el de producción.
- Para rotar valores, `switch(formatDate(now; "W") mod N; …)` funciona. `get(split(...); (parseNumber(...)+4) mod 24 + 1)` devolvió una cadena vacía.
- El filtro de duplicados tiene que ir en el primer módulo **después** de `filterRows`, antes de llamar al LLM, para no gastar llamadas en vano.
- `executions_get-detail` no devuelve el detalle de cada módulo en este plan. Para saber cuántos módulos se ejecutaron, cuenta las operaciones (`executions_get`).
