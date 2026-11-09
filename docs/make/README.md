# Escenarios de Make

Organización `7668948` · equipo `1708480` · zona `eu1.make.com`. Para ver el blueprint en vivo: `scenarios_get(<id>)` por MCP.
Las claves están escritas en los headers de los módulos HTTP: **no las copies a este repositorio.**

## Hoja de Google "VineReach — Clientes potenciales"

- **Pestaña `Config`:** `B1` = mercado (ciudad que se añade a cada búsqueda). `D1` = último informe (lo escribe el reporting). `B2`–`B4` están reservadas para bodega, descripción y firma (tarea P3, aún sin usar).
- **Pestaña `Hoja 1`** (una fila por prospecto):

| Col | Contenido |
|---|---|
| A | Nombre (se usa para detectar duplicados) |
| B | Dirección (el reporting saca el mercado del código postal y la ciudad) |
| C | Teléfono |
| D | Puntuación |
| E | Nº de reseñas |
| F | Web |
| G | Resumen (LLM) |
| H | Asunto (LLM) |
| I | Cuerpo del email (LLM) |
| J | Fecha de alta (`now`, ISO) |
| K | Estado: `Pendiente revisión` · `Enviado` · `Respondió` · `Descartado` |
| L | Place ID de Google (desde el 28/10, sin cabecera) |
| M | Email (reservada para la tarea P3) |

- **Pestaña `Metricas`:** fecha, nuevos, total, pendientes, enviados, respondieron, descartados, tasa, desglose. Está publicada como CSV, que es lo que lee `dashboard/index.html`.

## Hoja de Google "VineReach — Cola de búsquedas" (desde 09/11/2026)

Pestaña `Untitled`: columna A = consulta («marisquerías en Chamberí, Madrid»), columna B = `usada` (fecha · nº de resultados, la rellena Make). Hay 504 búsquedas (24 tipos de local × 21 distritos de Madrid), intercaladas para que cada semana mezcle tipos y distritos. Con 8 por semana dan para unas 63 semanas. Para otro mercado basta con añadir filas al final.

## 8472140 · VineReach — Prospección (cola, 20/semana) · lunes 8:00 · ACTIVO

`Search Rows` en la cola (B vacía, límite 8) → `HTTP POST places:searchText` (20 resultados, `minRating 4.0`) → `Update Cell` (marca la búsqueda como usada) → `Iterator places` → `Search Rows` en Hoja 1 (nombre en A) → **filtro "Solo nuevos"** → `Increment` (contador por ejecución) → **filtro "Tope: 20"** → `HTTP POST Groq` → `Add Row` (A–L).

- **Por qué este diseño:** buscar en una ciudad entera devuelve siempre los locales más famosos, y por eso daba casi todo duplicados (1 nuevo por semana en noviembre). Buscando por distrito salen locales distintos.
- **Prueba del 09/11/2026:** 8 búsquedas, 144 resultados y +20 filas exactas (84 → 104). 350 operaciones en 1 min 40 s.
- **Consumo estimado:** unas 350 operaciones por semana, unas 1.500 al mes. Son 8 llamadas a Places por semana.

## 5789249 · VineReach — Prospección automática · DESACTIVADO (09/11/2026)

Versión anterior: una búsqueda por semana en todo Madrid, que rotaba con `switch(W mod 24)`. Se guarda como copia de seguridad.

## 6494967 · VineReach — Reporting semanal (lunes 9:00)

Lee todas las filas → agrega estados y mercados con `TextAggregator` y cuenta con `split` → calcula la tasa de respuesta → Groq redacta un resumen ejecutivo → envía el email por Resend (`onboarding@resend.dev`, que solo puede enviar al dueño de la cuenta) → actualiza `Config!D1` → añade una fila a `Metricas`.

## 7380115 · DISCOVER — descubrimiento de ofertas

Inactivo y sin ejecuciones. **No es de VineReach**: usa Supabase. No tocar sin preguntar a Pablo.
