# Paso de VineReach a los proyectos beta de Claude

La nueva experiencia de proyectos (beta, en Claude Code) no migra los proyectos antiguos de forma automática. Este documento recoge lo necesario para crear el proyecto nuevo sin perder contexto. El proyecto antiguo, "vinereach chat original", sigue funcionando y no hace falta borrarlo.

## 1 · Al crear el proyecto

- **Objetivo:** Conseguir entrevistas de trabajo con VineReach como portfolio y validarlo con una bodega piloto.
- **Repositorio:** `pablorii/sales-carousel-generator`. Hasta que `claude-code-setup` se fusione con `main`, trabaja en esa rama: ahí están `CLAUDE.md`, `docs/` y la web del caso de estudio.
- **Conectores:** Make, Google Drive, Gmail y Firecrawl (Google Calendar es opcional).
- **Modelo:** para el coordinador, el de más calidad. Para los hilos de documentación o web basta uno más ligero, porque cada hilo es una sesión completa y gasta uso.

## 2 · Instrucciones del proyecto (para pegar)

```
Eres mi socio estratégico en VineReach. Directo, sin relleno, sin paternalismo; me tratas como un empresario capaz.
- Respuesta directa primero; análisis después si hace falta.
- Separa siempre hechos, estimaciones y probabilidades.
- Prioriza el 80/20. Gastar lo mínimo: usa lo gratuito o lo que ya pago (Make Pro, mi cuenta de Claude, Groq, Resend, Google Places gratis).
- Si algo no es la mejor opción, dilo. Si me equivoco, corrígeme. Detecta riesgos y oportunidades aunque no los pida.
- Si falta información crítica, pregunta lo mínimo antes de seguir.
- Todo en español de España.

Contexto: soy Pablo Orihuela, 23 años, Valladolid. Grados superiores en Ventas y en Marketing y Publicidad, y Máster en IA aplicada a negocio (IEBS). Busco trabajo con este portfolio y quiero convertir VineReach en negocio para bodegas.

Antes de trabajar, lee CLAUDE.md, docs/roadmap.md y docs/estado.md del repositorio. Las reglas de contenido de CLAUDE.md no se negocian: no inventar datos, en lo público solo la bodega ficticia, nunca firmar como una bodega que no es cliente y nunca subir claves.
En Make, prueba cada cambio en un escenario aparte antes de tocar producción.
```

## 3 · Memoria inicial (hechos y decisiones a fijar)

- Hay tres módulos. **Contenido:** un generador de carruseles con agente, artefacto privado de Claude: https://claude.ai/artifact/KFwkFG5i6mMbwKeN6JBjqB. **Prospección:** escenario de Make `8472140`, lunes 8:00, que toma 8 búsquedas de la hoja "VineReach — Cola de búsquedas" y se para en 20 nuevos. **Reporting:** escenario de Make `6494967`, lunes 9:00, con el dashboard público.
- **Motor de los emails:** Groq con Llama 3.3, porque es gratis. Pablo descartó la API de Claude por coste; el generador usa su cuenta de Claude.
- **Filtros de prospección:** solo duplicados y nota ≥ 4★. Pablo quitó a propósito los filtros de reseñas y de bares.
- **Bodega demo pública:** "Viñas del Cierzo", D.O. Cigales. Cuatro Rayas solo se usa en privado: hay un carrusel en Claude Design, https://claude.ai/artifact/5442fmNkRcg6rV7gkmL5Qx, que se puede usar como propuesta para ofrecerles un piloto.
- **Todavía no se ha enviado ningún email a un restaurante.** No hay bodega cliente.
- **Pendiente de Pablo para publicar la web del portfolio:** su LinkedIn y su email en "Sobre mí", confirmar qué tipo de puesto busca y grabar el vídeo de demo. Después, fusionar `claude-code-setup` con `main`.

## 4 · Biblioteca (archivos a subir)

- `vinereach-pitch.md` del proyecto antiguo. Ojo: dice "Claude API como motor" y "Fase 2 en diseño", y las dos cosas están desfasadas.
- El PDF del carrusel de Cuatro Rayas, si lo exportas desde Claude Design. Es solo de uso privado.

## 5 · Primeros hilos sugeridos (en el orden del rumbo)

1. Publicar la web del portfolio, en cuanto estén los datos pendientes de Pablo.
2. Más personalización en el generador: kit de marca, varias fotos y regenerar una sola slide.
3. Cerrar el embudo en modo prueba: email del restaurante, aprobación y envío a tu propio buzón.

## Lo que no se migra

Los chats del proyecto antiguo y su memoria. Los artefactos sí se mantienen, porque sus enlaces siguen funcionando.
