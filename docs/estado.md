# Estado de VineReach — 28/10/2026

## Funciona (comprobado)

- **Prospección** (Make `5789249`, lunes 8:00, activa). Rota entre 24 búsquedas por mercado; el mercado se toma de `Config!B1`. Solo filtra duplicados y nota mínima de 4★. Groq (Llama 3.3 70B) escribe el resumen, el asunto y el email, firmados por la bodega demo "Viñas del Cierzo". En la prueba del 28/10 entraron unos 15 prospectos nuevos.
- **Reporting** (Make `6494967`, lunes 9:00, activo). Envía un email semanal vía Resend a Pablo, añade una fila a la pestaña `Metricas` y alimenta el dashboard público.
- **Generador de carruseles con agente**: artefacto de Claude. Ver `CLAUDE.md`.
- **Carrusel de Cuatro Rayas** en Claude Design: 8 slides con datos reales. Es una propuesta privada y le falta el contacto en la slide 8.

## No funciona o falta

- **Embudo**: unos 80 prospectos, **0 emails enviados y 0 respuestas**. No se consigue el email de los restaurantes y no existe un paso de aprobar y enviar.
- **GitHub Pages** sirve el generador antiguo, que usa plantillas y tiene cifras inventadas. El README dice que usa la API de Claude, y no es cierto.
- **No hay web del caso de estudio** para el portfolio.
- **Las claves de API están a la vista** en los escenarios de Make.
- **El dashboard público** muestra "Tasa de respuesta 0%", lo que da mala imagen mientras no haya envíos.
- **Las columnas L (Place ID) y M (Email)** de la hoja no tienen cabecera.

## Datos de contexto

- Google Places (Text Search) devuelve como mucho 20 resultados por página. Paginando, hasta 60.
- Cupos gratuitos aproximados (hay que comprobarlos en cada consola): Google Places Enterprise ≈ 1.000 llamadas al mes; Groq tiene un límite diario en el plan gratuito; Make Pro va por créditos.
