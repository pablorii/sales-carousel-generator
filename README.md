# VineReach

Un sistema de ventas con IA para bodegas que venden a hostelería. Tiene tres módulos:

1. **Contenido:** un agente que investiga la web de la bodega, propone enfoques y diseña carruseles de LinkedIn listos para descargar en PDF (`apps/carruseles-agente/`). Funciona dentro de Claude con la cuenta de quien lo usa.
2. **Prospección:** cada lunes un escenario de Make busca restaurantes con Google Places, descarta los que ya estaban y escribe un email de primer contacto personalizado con un LLM. La bodega lo revisa antes de enviarlo.
3. **Reporting:** un informe semanal por email y un [dashboard público](https://pablorii.github.io/sales-carousel-generator/dashboard/) con los datos agregados.

**Caso de estudio:** https://pablorii.github.io/sales-carousel-generator/ · La primera versión del generador, con plantillas fijas, está en `legacy/`.

Los ejemplos públicos usan una bodega ficticia, *Viñas del Cierzo* (D.O. Cigales).

**Stack:** Claude · Make · Google Places API · Groq (Llama 3.3) · Resend · Google Sheets · HTML/CSS/JS

Construido por **Pablo Orihuela**, Valladolid.
