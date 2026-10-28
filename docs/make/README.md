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

## 5789249 · VineReach — Prospección automática (lunes 8:00)

`getCell Config!B1` → `SetVariable consulta` (rotación semanal entre 24 búsquedas con `switch(W mod 24)`) → `HTTP POST places:searchText` (20 resultados, `minRating 4.0`) → `Iterator places` → `Search Rows` (busca el nombre en la columna A) → **filtro "Solo nuevos"** → `HTTP POST Groq` (llama-3.3-70b, salida `resumen|||asunto|||cuerpo`, firma "Viñas del Cierzo") → `Add Row` (A–L).

Consumo: unas 24 operaciones fijas + 2 por cada prospecto nuevo.

## 6494967 · VineReach — Reporting semanal (lunes 9:00)

Lee todas las filas → agrega estados y mercados con `TextAggregator` y cuenta con `split` → calcula la tasa de respuesta → Groq redacta un resumen ejecutivo → envía el email por Resend (`onboarding@resend.dev`, que solo puede enviar al dueño de la cuenta) → actualiza `Config!D1` → añade una fila a `Metricas`.

## 7380115 · DISCOVER — descubrimiento de ofertas

Inactivo y sin ejecuciones. **No es de VineReach**: usa Supabase. No tocar sin preguntar a Pablo.
