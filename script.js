// ── State ──────────────────────────────────────────────────────────────────
let currentSlide = 0;
let totalSlides  = 0;
let lastGeneratedHTML = '';
let slideVisuals = [];
let allSlides    = [];
let lastCaption  = '';

// ── DOM refs ───────────────────────────────────────────────────────────────
const generateBtn       = document.getElementById('generate-btn');
const errorMsg          = document.getElementById('error-msg');
const carouselWrapper   = document.getElementById('carousel-wrapper');
const previewActions    = document.getElementById('preview-actions');
const copyTextBtn       = document.getElementById('copy-text-btn');
const downloadBtn       = document.getElementById('download-btn');
const visualDescSection = document.getElementById('visual-desc-section');
const visualDescText    = document.getElementById('visual-desc-text');
const captionSection    = document.getElementById('caption-section');
const captionText       = document.getElementById('caption-text');
const copyCaptionBtn    = document.getElementById('copy-caption-btn');

// ── Init ───────────────────────────────────────────────────────────────────
(function init() {
  const temaInput    = document.getElementById('tema');
  const productoInput = document.getElementById('producto');

  function checkReady() {
    generateBtn.disabled = !(temaInput.value.trim() && productoInput.value.trim());
  }

  temaInput.addEventListener('input', checkReady);
  productoInput.addEventListener('input', checkReady);

  generateBtn.addEventListener('click', generate);
  copyTextBtn.addEventListener('click', copyAllText);
  downloadBtn.addEventListener('click', downloadHTML);
  copyCaptionBtn.addEventListener('click', copyCaption);
})();

// ── Generate ───────────────────────────────────────────────────────────────
function generate() {
  hideError();

  const tema     = document.getElementById('tema').value.trim();
  const perfil   = document.getElementById('perfil').value;
  const producto = document.getElementById('producto').value.trim();
  const publico  = document.getElementById('publico').value.trim();
  const b1       = document.getElementById('b1').value.trim();
  const b2       = document.getElementById('b2').value.trim();
  const b3       = document.getElementById('b3').value.trim();

  if (!tema)     return showError('Ingresa el tema del carrusel.');
  if (!producto) return showError('Ingresa el nombre del producto.');

  const slides  = buildSlides({ tema, perfil, producto, publico, b1, b2, b3 });
  const caption = buildCaption({ tema, perfil, producto, publico, b1, b2, b3 });

  allSlides   = slides;
  lastCaption = caption;

  renderCarousel(slides, caption);
}

// ── Slide Templates ────────────────────────────────────────────────────────
function buildSlides({ tema, perfil, producto, publico, b1, b2, b3 }) {
  const profiles = {
    'SDR':      { role: 'comercial de bodega',  action: 'agendar más reuniones con hostelería y distribuidores' },
    'AE':       { role: 'comercial de bodega',  action: 'cerrar más contratos B2B de forma consistente'         },
    'VP Sales': { role: 'director comercial',   action: 'escalar las ventas B2B de la bodega'                   },
  };

  const p        = profiles[perfil] || profiles['AE'];
  const audiencia = publico || 'bodegas que venden B2B';
  const ben1     = b1 || 'Identifica los 20 restaurantes con más probabilidad de compra en tu zona en menos de 10 minutos';
  const ben2     = b2 || 'Reduce el tiempo de seguimiento de 2 horas al día a menos de 20 minutos con alertas automáticas';
  const ben3     = b3 || 'Aumenta tu tasa de cierre un 35% con secuencias de contacto personalizadas por tipo de cliente';

  return [
    {
      theme: 'hook',
      tag: 'Hilo',
      headline: 'El 80% de bodegas españolas pierde clientes B2B antes de la segunda reunión. No es el vino. Es el seguimiento.',
      body: `Lo que los mejores ${esc(p.role)}es ya están haciendo diferente para ${esc(p.action)}.`,
      bullets: null,
      cta: null,
      visual: `Slide de apertura. Fondo degradado púrpura profundo. Titular impactante en blanco y negritas con dato estadístico. Subtítulo en blanco semi-transparente. Número "1/8" en esquina inferior derecha.`,
    },
    {
      theme: 'problem',
      tag: 'El problema',
      headline: '¿Por qué un buen vino no basta para cerrar ventas B2B?',
      body: null,
      bullets: [
        'Llamas tres veces. Nadie responde. La oportunidad se enfría sola.',
        'El restaurante "quedó en hablamos" hace dos semanas. Silencio total.',
        'Tu Excel de clientes tiene 4 versiones y ninguna es la actualizada.',
      ],
      cta: null,
      visual: `Slide problema. Fondo degradado rojo oscuro. Titular pregunta en blanco. Lista de 3 bullets con ícono ✦ en color acento. Ambiente de tensión y urgencia. Número "2/8" esquina inferior.`,
    },
    {
      theme: 'problem',
      tag: 'El costo',
      headline: 'Cada semana sin sistema es vino en la bodega, no en la carta.',
      body: `Un ${esc(p.role)} sin proceso pierde entre 3 y 5 oportunidades al mes sin saberlo. No es falta de producto — es falta de seguimiento estructurado.`,
      bullets: null,
      cta: null,
      visual: `Slide de agitación. Fondo degradado rojo intenso. Titular de impacto en grande. Cuerpo de texto en blanco semi-transparente con cifra concreta. Sensación de urgencia y consecuencias reales. Número "3/8" esquina inferior.`,
    },
    {
      theme: 'solution',
      tag: 'La solución',
      headline: `Presentamos <em>${esc(producto)}</em>`,
      body: `Diseñado para ${esc(audiencia)} que quieren ${esc(p.action)} de forma consistente — sin depender de la memoria ni del Excel.`,
      bullets: null,
      cta: null,
      visual: `Slide solución. Fondo degradado verde oscuro. Nombre del producto "${producto}" resaltado en color acento púrpura. Subtítulo descriptivo en blanco semi-transparente. Ambiente de alivio y posibilidad. Número "4/8" esquina inferior.`,
    },
    {
      theme: 'feature',
      tag: 'Beneficio #1',
      headline: esc(ben1),
      body: `Con ${esc(producto)}, dejas de adivinar y empiezas a priorizar. El tiempo de prospección se divide. Los resultados se multiplican.`,
      bullets: null,
      cta: null,
      visual: `Slide beneficio 1. Fondo degradado azul oscuro. Beneficio concreto con cifras como titular grande en blanco. Una línea de impacto como cuerpo. Número "5/8" esquina inferior.`,
    },
    {
      theme: 'feature',
      tag: 'Beneficio #2',
      headline: esc(ben2),
      body: `Sin ${esc(producto)}, el seguimiento te come el día. Con él, cada contacto llega en el momento exacto — y sabes cuándo volver a llamar antes de que el cliente te olvide.`,
      bullets: null,
      cta: null,
      visual: `Slide beneficio 2. Fondo degradado azul profundo. Segundo beneficio con cifra como titular principal. Cuerpo que pinta la diferencia antes/después. Número "6/8" esquina inferior.`,
    },
    {
      theme: 'feature',
      tag: 'Beneficio #3',
      headline: esc(ben3),
      body: 'Esto es lo que separa a las bodegas que crecen de las que repiten el mismo ciclo cada temporada. No es la añada — es el proceso.',
      bullets: null,
      cta: null,
      visual: `Slide beneficio 3. Fondo degradado índigo/púrpura. Tercer beneficio con cifra porcentual como titular. Mensaje de diferenciación bodega ganadora vs. perdedora. Número "7/8" esquina inferior.`,
    },
    {
      theme: 'cta',
      tag: 'Tu próximo paso',
      headline: '¿Tu bodega vende B2B pero pierdes oportunidades en el seguimiento?',
      body: 'VineReach es el agente de ventas que identifica restaurantes y hoteles con alto potencial, los enriquece con datos reales, y genera el outreach personalizado. Todo automático.<br><br>Esto es la Fase 1 (contenido). Las Fases 2 y 3 automatizan la prospección y el reporting.<br><br>¿Quieres verlo en acción? Escríbeme en comentarios o visita [GitHub link]',
      bullets: null,
      cta: null,
      visual: `Slide CTA. Fondo degradado púrpura intenso. Pregunta directa al lector como titular. Tres bloques de texto: propuesta de valor, roadmap de fases, llamada a acción. Número "8/8" esquina inferior.`,
    },
  ];
}

function buildCaption({ tema, perfil, producto, publico, b1, b2, b3 }) {
  const ben1    = b1 || 'Identifica los 20 restaurantes con más probabilidad de compra en tu zona';
  const ben2    = b2 || 'Reduce el tiempo de seguimiento de 2 horas a menos de 20 minutos';
  const ben3    = b3 || 'Aumenta tu tasa de cierre un 35% con secuencias personalizadas';
  const hashtag = producto.toLowerCase().replace(/\s+/g, '');

  return `📌 ${tema}

Si vendes vino B2B y el seguimiento te cuesta clientes, este carrusel es para ti.

8 slides con lo que los mejores comerciales de bodega ya están haciendo diferente usando ${producto}.

Lo que vas a ver:
✅ ${ben1}
✅ ${ben2}
✅ ${ben3}

¿Cuál es tu mayor reto vendiendo B2B? Cuéntame en los comentarios 👇

#ventas #bodega #vinoespañol #ventasB2B #hostelería #${hashtag} #salesstrategy`;
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderCarousel(slides, caption) {
  totalSlides  = slides.length;
  currentSlide = 0;
  slideVisuals = slides.map(s => s.visual || '');

  const slidesHTML = slides.map((s, i) => buildSlideHTML(s, i, totalSlides)).join('');

  carouselWrapper.innerHTML = `
<div class="carousel-container">
  <div class="carousel-track" id="track">${slidesHTML}</div>
</div>
<nav class="carousel-nav">
  <button class="nav-btn" id="prev-btn" disabled>&#8592;</button>
  <div class="dots" id="dots">${buildDots(totalSlides)}</div>
  <button class="nav-btn" id="next-btn">&#8594;</button>
</nav>`;

  previewActions.classList.remove('hidden');

  document.getElementById('prev-btn').addEventListener('click', () => goTo(currentSlide - 1));
  document.getElementById('next-btn').addEventListener('click', () => goTo(currentSlide + 1));
  document.querySelectorAll('.dot').forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  updateVisualDesc(0);
  visualDescSection.classList.remove('hidden');

  captionText.textContent = caption;
  captionSection.classList.remove('hidden');

  lastGeneratedHTML = buildExportHTML(slides);
}

function updateVisualDesc(index) {
  visualDescText.textContent = slideVisuals[index] || '';
}

function buildSlideHTML(s, index, total) {
  const tag      = s.tag      ? `<div class="slide-tag">${s.tag}</div>` : '';
  const headline = s.headline ? `<h2 class="slide-headline">${s.headline}</h2>` : '';
  let content    = '';

  if (Array.isArray(s.bullets) && s.bullets.length) {
    content = `<ul class="slide-bullets">${s.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
  } else if (s.body) {
    content = `<p class="slide-body">${s.body}</p>`;
  }

  const cta     = s.cta     ? `<div class="slide-cta-btn">${s.cta}</div>` : '';
  const counter = `<div class="slide-counter">${index + 1} / ${total}</div>`;

  return `<div class="slide" data-theme="${s.theme || 'default'}">${tag}${headline}${content}${cta}${counter}</div>`;
}

function buildDots(count) {
  return Array.from({ length: count }, (_, i) =>
    `<div class="dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`
  ).join('');
}

function goTo(index) {
  if (index < 0 || index >= totalSlides) return;
  currentSlide = index;
  document.getElementById('track').style.transform = `translateX(-${currentSlide * 100}%)`;
  document.getElementById('prev-btn').disabled = currentSlide === 0;
  document.getElementById('next-btn').disabled = currentSlide === totalSlides - 1;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  updateVisualDesc(currentSlide);
}

// ── Export ─────────────────────────────────────────────────────────────────
function buildExportHTML(slides) {
  const slidesHTML = slides.map((s, i) => buildSlideHTML(s, i, slides.length)).join('');
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Sales Carousel</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0f0f13;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:1rem}
.carousel-container{position:relative;overflow:hidden;border-radius:10px;background:#111;width:100%;max-width:580px}
.carousel-track{display:flex;transition:transform .4s cubic-bezier(.4,0,.2,1)}
.slide{min-width:100%;min-height:360px;display:flex;flex-direction:column;justify-content:center;padding:2.5rem 2.8rem;position:relative;overflow:hidden}
.slide::before{content:'';position:absolute;width:280px;height:280px;border-radius:50%;background:rgba(255,255,255,.03);top:-80px;right:-80px;pointer-events:none}
.slide[data-theme=hook]{background:linear-gradient(135deg,#1a0a2e,#2d1654)}
.slide[data-theme=problem]{background:linear-gradient(135deg,#1a0e0a,#2e1710)}
.slide[data-theme=solution]{background:linear-gradient(135deg,#0a1a14,#0e2e20)}
.slide[data-theme=feature]{background:linear-gradient(135deg,#0d0d2a,#141440)}
.slide[data-theme=proof]{background:linear-gradient(135deg,#0a1520,#102030)}
.slide[data-theme=cta]{background:linear-gradient(135deg,#1a0830,#3a0f6e)}
.slide[data-theme=default]{background:linear-gradient(135deg,#141420,#1c1c30)}
.slide-tag{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:.9rem}
.slide-headline{font-size:clamp(1.3rem,4vw,1.9rem);font-weight:800;line-height:1.2;color:#fff;margin-bottom:.9rem}
.slide-headline em{color:#a89af7;font-style:normal}
.slide-body{font-size:.97rem;color:rgba(255,255,255,.72);line-height:1.65}
.slide-bullets{list-style:none;display:flex;flex-direction:column;gap:.5rem}
.slide-bullets li{display:flex;align-items:flex-start;gap:.6rem;font-size:.93rem;color:rgba(255,255,255,.78)}
.slide-bullets li::before{content:'✦';color:#a89af7;font-size:.65rem;margin-top:.35rem;flex-shrink:0}
.slide-cta-btn{display:inline-block;margin-top:1.4rem;padding:.7rem 1.8rem;background:linear-gradient(135deg,#7c6af7,#a89af7);color:#fff;border-radius:50px;font-weight:700;font-size:.95rem}
.slide-counter{position:absolute;bottom:1.1rem;right:1.4rem;font-size:.72rem;color:rgba(255,255,255,.3);font-weight:600}
.carousel-nav{display:flex;justify-content:space-between;align-items:center;padding:.75rem .5rem 0;max-width:580px;margin:0 auto}
.nav-btn{background:#22222e;border:1px solid #2e2e3e;color:#e8e8f0;width:36px;height:36px;border-radius:50%;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center}
.nav-btn:hover{background:#7c6af7;border-color:#7c6af7}
.nav-btn:disabled{opacity:.3;cursor:default}
.dots{display:flex;gap:6px;align-items:center}
.dot{width:7px;height:7px;border-radius:50%;background:#2e2e3e;cursor:pointer;transition:background .2s,transform .2s}
.dot.active{background:#7c6af7;transform:scale(1.3)}
</style>
</head>
<body>
<div style="width:100%;max-width:580px">
  <div class="carousel-container">
    <div class="carousel-track" id="track">${slidesHTML}</div>
  </div>
  <nav class="carousel-nav">
    <button class="nav-btn" id="prev-btn" disabled>&#8592;</button>
    <div class="dots" id="dots">${buildDots(slides.length)}</div>
    <button class="nav-btn" id="next-btn">&#8594;</button>
  </nav>
</div>
<script>
let cur=0,tot=${slides.length};
function goTo(i){if(i<0||i>=tot)return;cur=i;document.getElementById('track').style.transform='translateX(-'+cur*100+'%)';document.getElementById('prev-btn').disabled=cur===0;document.getElementById('next-btn').disabled=cur===tot-1;document.querySelectorAll('.dot').forEach((d,j)=>d.classList.toggle('active',j===cur));}
document.getElementById('prev-btn').addEventListener('click',()=>goTo(cur-1));
document.getElementById('next-btn').addEventListener('click',()=>goTo(cur+1));
document.querySelectorAll('.dot').forEach((d,i)=>d.addEventListener('click',()=>goTo(i)));
<\/script>
</body>
</html>`;
}

// ── Copy / Download ────────────────────────────────────────────────────────
function copyAllText() {
  if (!allSlides.length) return;

  let text = '';
  allSlides.forEach((s, i) => {
    text += `=== SLIDE ${i + 1} ===\n`;
    if (s.tag)      text += `Tag: ${s.tag}\n`;
    if (s.headline) text += `Titular: ${s.headline.replace(/<[^>]+>/g, '')}\n`;
    if (s.body)     text += `Copy: ${s.body.replace(/<[^>]+>/g, '')}\n`;
    if (s.bullets)  text += `Bullets:\n${s.bullets.map(b => `  • ${b}`).join('\n')}\n`;
    if (s.cta)      text += `CTA: ${s.cta.replace(/<[^>]+>/g, '')}\n`;
    if (s.visual)   text += `Visual: ${s.visual}\n`;
    text += '\n';
  });

  if (lastCaption) {
    text += `=== CAPTION LINKEDIN ===\n${lastCaption}\n`;
  }

  navigator.clipboard.writeText(text).then(() => {
    copyTextBtn.textContent = 'Copiado ✓';
    setTimeout(() => { copyTextBtn.textContent = 'Copiar todo'; }, 2000);
  });
}

function copyCaption() {
  if (!lastCaption) return;
  navigator.clipboard.writeText(lastCaption).then(() => {
    copyCaptionBtn.textContent = 'Copiado ✓';
    setTimeout(() => { copyCaptionBtn.textContent = 'Copiar'; }, 2000);
  });
}

function downloadHTML() {
  if (!lastGeneratedHTML) return;
  const blob = new Blob([lastGeneratedHTML], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'sales-carousel.html';
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Helpers ────────────────────────────────────────────────────────────────
function esc(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showError(msg) { errorMsg.textContent = msg; errorMsg.classList.remove('hidden'); }
function hideError()    { errorMsg.classList.add('hidden'); }
