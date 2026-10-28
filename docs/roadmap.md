# Tareas pendientes — antes de trabajar con una bodega real

Ordenadas por impacto en el portfolio. Cada tarea indica cómo saber que está terminada.

## P1 · Web pública del caso de estudio (GitHub Pages)
- Página nueva en la raíz con: el problema, cómo funcionan los 3 módulos (diagrama), el vídeo del generador, ejemplos con la bodega ficticia, la stack, resultados reales y honestos (prospectos encontrados, emails preparados) y contacto.
- El generador antiguo pasa a `legacy/` o se retira. Quitar las cifras inventadas.
- Reescribir el README para que cuente lo que hay de verdad y enlace a la web y al vídeo.
- **Terminado cuando:** un reclutador entiende el proyecto en 60 segundos desde el móvil, y nada de lo que lee es falso.

## P2 · Más personalización en el generador de carruseles
- Kit de marca: subir el logo, colores manuales y tipografías preferidas.
- Varias fotos (botella, viñedo, bodega) e imagen de referencia de estilo, que Claude ve.
- Formato 4:5, 1:1 o 9:16; idioma ES/EN; autor (bodega o comercial).
- Regenerar una sola slide ("otra versión").
- **Terminado cuando:** dos bodegas distintas dan resultados visualmente distintos y fieles a su marca.

## P3 · Prospección: email del restaurante y bodega configurable
- Hacerlo **en un escenario de prueba**, un paso cada vez (ver "Lecciones aprendidas" en `CLAUDE.md`):
  1. Leer `Config!B2:B4` (bodega, descripción, firma) con valores por defecto.
  2. HTTP GET a `websiteUri` con un gestor de errores.
  3. Extraer el email: el módulo `regexp:GetElementsFromText` con el patrón `##emails` puede valer, pero devuelve varios resultados por ejecución.
  4. Pasar a Groq un extracto del texto de la web.
- **Terminado cuando:** 10 ejecuciones seguidas sin errores, y al menos el 40% de las filas nuevas con email válido (es una estimación del objetivo).

## P4 · Flujo de aprobar y enviar en modo prueba
- Escenario nuevo: las filas con estado "Aprobado" se envían por Resend **al buzón de Pablo** (modo demo), y la fila se marca como "Enviado (prueba)".
- Más adelante, con una bodega piloto: dominio verificado o borradores en Gmail, y 2 seguimientos.

## P5 · Higiene
- Mover las claves de API a Keys de Make y renovarlas.
- Poner cabeceras a las columnas L y M.
- En el dashboard, ocultar la tasa de respuesta mientras los envíos sean 0.
