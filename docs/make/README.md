# Make

Organización `7668948` · equipo `1708480`. Blueprint en vivo: `scenarios_get(<id>)`. Las claves están en los headers de los módulos HTTP: **no las copies aquí.**

## Hojas de Google

**"VineReach — Prospects"**
- `Hoja 1`, una fila por prospecto: A nombre (sirve para detectar duplicados) · B dirección · C teléfono · D puntuación · E reseñas · F web · G resumen · H asunto · I cuerpo del email · J fecha de alta · K estado (`Pendiente revisión` / `Enviado` / `Respondió` / `Descartado`) · L Place ID.
- `Metricas`: una fila por semana. Está publicada como CSV y la leen el dashboard y la web.
- `Config!D1`: último informe enviado.

**"VineReach — Cola de búsquedas"** (pestaña `Untitled`): A = consulta («marisquerías en Chamberí, Madrid») y B = usada (fecha · nº de resultados). Son 504 búsquedas de Madrid. Para otro mercado, se añaden filas.

## 8472140 · Prospección · lunes 8:00

Cola (8 búsquedas sin usar) → Places `searchText` (20 resultados, ≥ 4★) → marca la búsqueda como usada → por cada local: busca duplicado en `Hoja 1` → filtro de nuevos → contador → filtro ≤ 20 → Groq (Llama 3.3, `resumen|||asunto|||cuerpo`) → añade la fila.
Consumo: unas 350–380 operaciones por ejecución.

## 6494967 · Reporting · lunes 9:00

Cuenta estados y mercados → Groq redacta un resumen ejecutivo → email por Resend a Pablo → fila en `Metricas`.

## Otros escenarios del equipo

`5789249` es la versión antigua de la prospección (desactivada). `7380115` (DISCOVER) no es de VineReach: no tocar.
