# CLAUDE.md — VineReach

## Quién y para qué

- **Pablo Orihuela** (Valladolid). Perfil de ventas y marketing, con un máster en IA aplicada a negocio.
- **Objetivos:** (1) conseguir trabajo con este proyecto como portfolio; (2) convertirlo en un negocio para bodegas.
- **Presupuesto:** el mínimo. Herramientas gratuitas o que ya se pagan.
- **Forma de trabajar:** directa, en español de España. Separa hechos, estimaciones y probabilidades. Si algo no es buena idea, dilo.

## Qué es VineReach

Un sistema de ventas con IA para bodegas que venden a hostelería. Rumbo y prioridades: `docs/roadmap.md`. Estado actual: `docs/estado.md`.

| Módulo | Qué hace | Dónde vive |
|---|---|---|
| Contenido | Un agente investiga la web de la bodega y diseña carruseles de LinkedIn | `apps/carruseles-agente/index.html` (artefacto de Claude) |
| Prospección | Busca 20 restaurantes nuevos por semana y redacta el primer email de cada uno | Make `8472140` + hoja "VineReach — Cola de búsquedas" (`docs/make/README.md`) |
| Reporting | Informe semanal por email y dashboard público | Make `6494967` + `dashboard/index.html` |

## Repositorio

```
index.html                         Web del caso de estudio (portfolio). Cifras en vivo del CSV de Metricas.
assets/                            Imágenes de la web.
apps/carruseles-agente/index.html  Generador con agente.
dashboard/index.html               Dashboard público.
docs/                              Rumbo, estado y Make.
```

HTML/CSS/JS sin compilación. Para probar en local: `python -m http.server 8080`.

## Generador con agente

- Es un **artefacto privado de Claude**: https://claude.ai/artifact/KFwkFG5i6mMbwKeN6JBjqB. Usa la cuenta de Claude de quien lo abre; no lleva API key. Fuera de Claude (`window.claude` no existe) solo muestra el ejemplo.
- Al volver a publicarlo, hay que declarar estas capacidades: `{"sample":{"images":true},"mcp":{"servers":[{"server":"Firecrawl","tools":["firecrawl_search","firecrawl_scrape"]}]},"downloads":true}`.
- El flujo es: investigar (Firecrawl, en `TOOLS`) → dossier → 3 enfoques → slides en HTML libre de 1080×1350 → autorrevisión (hoja de contactos + `problems()`) → cambios por chat → PDF (html2canvas + jsPDF).
- El HTML de Claude pasa por DOMPurify (`clean()`): no se permite `<style>`, `<script>` ni `url()`. La foto va como `<img data-foto>` y se convierte en un div con imagen de fondo.

## Reglas (no negociables)

1. **No inventar datos:** ni cifras, ni premios, ni precios, ni contactos. Lo que falte va como `[PLACEHOLDER]`.
2. **Lo público usa la bodega ficticia** "Viñas del Cierzo" (D.O. Cigales). Las bodegas reales solo en material privado o con su permiso.
3. **Nunca firmar emails como una bodega que no es cliente** cuando el destinatario sea real.
4. **Nunca subir claves al repositorio** (es público). Las de Places, Groq y Resend están escritas a mano dentro de Make.

## Herramientas

- **Make** por MCP: organización `7668948`, equipo `1708480`. `scenarios_update` **sustituye el blueprint entero**: léelo y guárdalo antes de tocar nada.
- Firecrawl, Gmail y Google Drive por MCP. Claude Design para piezas visuales.

## Lecciones de Make

- Prueba cada cambio en un escenario aparte, nunca en producción. Varios módulos nuevos a la vez dieron `Cannot initialize the scenario … reading ''` y Make desactivó el escenario.
- El filtro de duplicados va justo después de la búsqueda en la hoja y antes del LLM.
- Buscar «tipo de local + ciudad» en Places devuelve siempre los mismos locales famosos. Funciona buscar «tipo + distrito» desde la cola.
- `executions_get-detail` no da el detalle por módulo en este plan: cuenta las operaciones. Las ejecuciones de más de 1 minuto devuelven *Bad Gateway* en `scenarios_run`; compruébalas con `executions_list`.
