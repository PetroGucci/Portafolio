// ================== CONFIGURACIÓN RÁPIDA ==================
    // Cambia estos datos y súbelos con tus imágenes a /assets/
    const PROFILE = {
      nombre: "Carlos Angulo",
      ciudad: "Remoto",
      correo: "Krlossseduardo.92@gmail.com",
      social: {
        instagram: "https://www.instagram.com/soy.carlosdigital/",
        linkedin: "https://www.linkedin.com/in/carlos-angulo-94999421b/",
        behance: "https://www.behance.net/soycarlosdigital",
        whatsapp: "https://wa.me/584145450918", 
      }
    };

    // Proyectos de ejemplo: reemplaza 'cover' por rutas reales (p.ej. assets/branding-uno.jpg)
    const PROJECTS = [
      {
      title: "Publicaciones de Instagram",
      year: 2024,
      tags: ["Post"],
      cover: "./assets/Images/Post/1.webp",
      images: [
        { src: "./assets/Images/Post/1.webp", desc: "" },
        { src: "./assets/Images/Post/2.webp", desc: "" },
        { src: "./assets/Images/Post/3.webp", desc: "🌱 Tu mente también merece un respiro, no todo tienes que resolverlo hoy" },
        { src: "./assets/Images/Post/4.webp", desc: "🌱 Haz ejercicio: activa tu cuerpo y libera endorfinas.\n😴 Duerme bien: tu mente también necesita descansar.\n💜 Rodéate de relaciones positivas: conecta con quienes te suman.\n🎨 Haz algo que disfrutes: regalarte momentos de felicidad es autocuidado." },
        { src: "./assets/Images/Post/5.webp", desc: "💜 Sanar también es un acto de valentía: pedir ayuda cuando la necesitas." },
        { src: "./assets/Images/Post/6.webp", desc: "" },
        { src: "./assets/Images/Post/7.webp", desc: "" },
        { src: "./assets/Images/Post/8.webp", desc: "" },
      ],
      live: "#",
      repo: "#"
      },
      {
      title: "Flyers Instagram",
      year: 2024,
      tags: ["Flyer"],
      cover: "./assets/Images/Flyer/1.webp",
      images: [
        { src: "./assets/Images/Flyer/1.webp", desc: "Es el momento perfecto para dar ese primer paso hacia tu bienestar emocional.\n💜 Sesiones en línea y presenciales, adaptadas a ti." },
        { src: "./assets/Images/Flyer/2.webp", desc: "" },
        { src: "./assets/Images/Flyer/3.webp", desc: "" },
      ],
      live: "#",
      repo: "#"
      },
      {
      title: "Logo",
      year: 2024,
      tags: ["Logo"],
      cover: "./assets/Images/Logo/1.webp",
      images: [
        { src: "./assets/Images/Logo/1.webp", desc: "Logo Marca Personal" },
      ],
      live: "#",
      repo: "#"
      }
];

    // ================ LÓGICA DE RENDER / INTERACCIÓN ================
    const $ = (sel, ctx=document) => ctx.querySelector(sel);
    const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

    // Tema
const themeBtn = document.getElementById('theme');
const savedTheme = localStorage.getItem('theme');

// Si hay tema guardado, úsalo. Sino, toma el de sistema
if(savedTheme){
  document.documentElement.setAttribute("data-theme", savedTheme);
}else{
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
}

themeBtn.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});


    // Datos de perfil
    document.getElementById('hero-name').textContent = PROFILE.nombre;
    document.getElementById('foot-name').textContent = PROFILE.nombre;
    document.getElementById('hero-city').textContent = PROFILE.ciudad;
    document.getElementById('year').textContent = new Date().getFullYear();
    // Actualiza enlaces sociales/contacto
    const contactBtns = $$('#contacto a.btn');
    contactBtns.forEach(a => {
      if(a.textContent.includes('Escríbeme')) a.href = `mailto:${PROFILE.correo}?subject=Consulta%20sobre%20proyecto%20de%20Marketing%20Digital&body=Hola%20Carlos,%0D%0A%0D%0AEstoy%20interesado%20en%20tus%20servicios%20de%20Marketing%20Digital%20y%20me%20gustaría%20conversar%20sobre%20un%20proyecto.%20%0D%0A%0D%0AQuedo%20atento%20a%20tu%20respuesta.%0D%0A%0D%0ASaludos,`;
      if(a.textContent.includes('Instagram')) a.href = PROFILE.social.instagram;
      if(a.textContent.includes('LinkedIn')) a.href = PROFILE.social.linkedin;
      if(a.textContent.includes('Behance')) a.href = PROFILE.social.behance;
      if(a.textContent.includes('Whatapp')) a.href = PROFILE.social.whatapp + "?text=Hola%20Carlos,%20estoy%20interesado%20en%20tus%20servicios%20de%20Marketing%20Digital%20y%20me%20gustaría%20conversar%20sobre%20un%20proyecto.%20¿Podemos%20agendar%20una%20reunión?";
    });

    // Filtros
    const allTags = Array.from(new Set(PROJECTS.flatMap(p=>p.tags))).sort();
    const filters = ['Todos', ...allTags];
    const filtersWrap = document.getElementById('filters');
    let active = 'Todos';

    function renderFilters(){
      filtersWrap.innerHTML = '';
      filters.forEach(tag => {
        const b = document.createElement('button');
        b.className='chip'; b.textContent=tag; b.setAttribute('aria-pressed', tag===active);
        b.addEventListener('click', ()=>{ active = tag; renderGallery(); renderFilters(); });
        filtersWrap.appendChild(b);
      });
    }

    // Galería
    const gallery = document.getElementById('gallery');
    function renderGallery(){
      const list = PROJECTS
        .filter(p => active==='Todos' || p.tags.includes(active))
        .sort((a,b)=> b.year - a.year);
      gallery.innerHTML = '';
      list.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card'; card.tabIndex = 0; card.role = 'button'; card.ariaLabel = `Abrir ${p.title}`;
        card.innerHTML = `
          <div class="thumb">
            <img src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,${encodeURIComponent(placeholder(p.title))}'">
          </div>
          <div class="meta">
            <div>
              <div class="title">${p.title}</div>
              <div class="muted" style="font-size:12px">${p.year}</div>
            </div>
            <div class="tags">${p.tags.map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
          </div>`;
        card.addEventListener('click', ()=> openLightbox(p));
        card.addEventListener('keypress', (e)=>{ if(e.key==='Enter') openLightbox(p); });
        gallery.appendChild(card);
      });
    }

    function placeholder(text){
      const bg = encodeURIComponent('#1f2937');
      const fg = encodeURIComponent('#9ca3af');
      return `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
        <rect width='100%' height='100%' fill='${bg}'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter,system-ui' font-size='28' fill='${fg}'>${text}</text>
      </svg>`;
    }

    // Lightbox
    const modal = document.getElementById('modal');
    function openLightbox(p){
      document.getElementById('lb-img').src = p.cover;
      document.getElementById('lb-title').textContent = p.title;
      document.getElementById('lb-desc').textContent = p.description || '';
      const tags = document.getElementById('lb-tags');
      tags.innerHTML = p.tags.map(t=>`<span class='tag'>${t}</span>`).join('');
      const live = document.getElementById('lb-live');
      const repo = document.getElementById('lb-repo');
      if(p.live && p.live !== '#'){ live.href = p.live; live.style.display='inline-flex'; }
      else { live.style.display='none'; }
      if(p.repo){ repo.href = p.repo; repo.style.display='inline-flex'; }
      else { repo.style.display='none'; }
      modal.showModal();
    }
    modal.addEventListener('click', (e)=>{ const r = modal.getBoundingClientRect(); if(!(e.clientX>r.left && e.clientX<r.right && e.clientY>r.top && e.clientY<r.bottom)){ modal.close(); }});

    modal.addEventListener('close', () => {
    document.body.classList.remove("no-scroll");
    });

    modal.addEventListener("wheel", (e) => {
    e.preventDefault();
    }, { passive: false });

    // Init
    renderFilters();
    renderGallery();

    // Respeta reduce motion
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      $$('img').forEach(img=> img.style.transition='none');
    }

let currentProject = null;
let currentIndex = 0;

// ------------------ Lightbox dots (insertar justo después de currentProject/currentIndex) ------------------
(function(){
  const dotsContainer = () => document.getElementById('lb-dots');
  const imgEl = () => document.getElementById('lb-img');
  const prevBtn = () => document.getElementById('prev');
  const nextBtn = () => document.getElementById('next');
  const ensureEl = el => !!el;

  // Crea/actualiza los dots para el proyecto actual
  function createDotsForCurrentProject(){
    const container = dotsContainer();
    if(!container || !currentProject) return;
    const imgs = (currentProject.images && currentProject.images.length) ? currentProject.images : [{ src: currentProject.cover }];

    // limpiar y crear
    container.innerHTML = '';
    if(imgs.length <= 1){
      container.style.display = 'none';
    } else {
      container.style.display = 'flex';
      imgs.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('role','button');
        dot.setAttribute('aria-label', `Ir a imagen ${i+1}`);
        dot.style.userSelect = 'none';
        dot.addEventListener('click', (ev) => {
          ev.stopPropagation();
          // Llamamos a showImage para mantener la lógica existente
          try { showImage(i); } catch(err){ console.warn('showImage no disponible', err); }
        });
        container.appendChild(dot);
      });
    }

    // mostrar/ocultar flechas (si existen)
    if(ensureEl(prevBtn()) && ensureEl(nextBtn())){
      const display = imgs.length > 1 ? 'flex' : 'none';
      prevBtn().style.display = display;
      nextBtn().style.display = display;
    }
  }

  // Marca el dot activo (llamado cuando cambia la imagen)
  function updateActiveDot(){
    const container = dotsContainer();
    if(!container) return;
    const dots = [...container.children];
    dots.forEach((d, i) => {
      if(i === currentIndex) d.classList.add('active');
      else d.classList.remove('active');
    });
  }

  // Observador: cuando cambie el src del img actualizamos el dot activo
  function initImageObserver(){
    const img = imgEl();
    if(!img) return;
    // si ya existe un observer lo limpiamos (defensivo)
    if(img._dotObserver) img._dotObserver.disconnect();

    const obs = new MutationObserver(muts => {
      for(const m of muts){
        if(m.type === 'attributes' && m.attributeName === 'src'){
          // Pequeño timeout para permitir que currentIndex ya haya sido actualizado por showImage
          setTimeout(updateActiveDot, 10);
        }
      }
    });
    obs.observe(img, { attributes: true });
    img._dotObserver = obs;
  }

  // Observador del modal: cuando se abra, generamos los dots para el proyecto actual
  (function initModalObserver(){
    const modalEl = document.getElementById('modal');
    if(!modalEl) return;
    // si ya existe un observer lo limpiamos
    if(modalEl._openObserver) modalEl._openObserver.disconnect();
    const obs = new MutationObserver(muts => {
      for(const m of muts){
        if(m.type === 'attributes' && m.attributeName === 'open'){
          if(modalEl.hasAttribute('open')){
            // modal abierto -> crear dots para el proyecto actual y asegurar observador de imagen
            try { createDotsForCurrentProject(); } catch(e){ console.warn(e); }
            initImageObserver();
            // marcar el dot activo justo ahora
            setTimeout(updateActiveDot, 10);
          }
        }
      }
    });
    obs.observe(modalEl, { attributes: true });
    modalEl._openObserver = obs;
  })();

  // También exponemos una función pública (opcional) para forzar la creación si quieres llamarla desde openLightbox:
  window.__lightboxCreateDots = function(){
    createDotsForCurrentProject();
    initImageObserver();
    updateActiveDot();
  };

  // Por seguridad: si el modal ya está abierto (rare), inicializamos ahora
  try {
    const modalNow = document.getElementById('modal');
    if(modalNow && modalNow.hasAttribute && modalNow.hasAttribute('open')){
      createDotsForCurrentProject();
      initImageObserver();
      updateActiveDot();
    }
  } catch(e){ /* noop */ }
})();

function openLightbox(p){
  currentProject = p;
  currentIndex = 0;
  showImage(currentIndex);

  document.getElementById('lb-title').textContent = p.title;
  const tags = document.getElementById('lb-tags');
  tags.innerHTML = p.tags.map(t=>`<span class='tag'>${t}</span>`).join('');

  const live = document.getElementById('lb-live');
  const repo = document.getElementById('lb-repo');
  if(p.live && p.live !== '#'){ live.href = p.live; live.style.display='inline-flex'; }
  else { live.style.display='none'; }
  if(p.repo){ repo.href = p.repo; repo.style.display='inline-flex'; }
  else { repo.style.display='none'; }

  modal.showModal();
  document.body.classList.add("no-scroll");
}

function showImage(index){
  if(!currentProject) return;
  const imgs = currentProject.images || [{ src: currentProject.cover, desc: currentProject.description }];
  if(index < 0) index = imgs.length - 1;
  if(index >= imgs.length) index = 0;
  currentIndex = index;

  document.getElementById('lb-img').src = imgs[currentIndex].src;
  document.getElementById('lb-desc').textContent = imgs[currentIndex].desc || '';
}

// Botones
document.getElementById('prev').addEventListener('click', ()=> showImage(currentIndex - 1));
document.getElementById('next').addEventListener('click', ()=> showImage(currentIndex + 1));

// Teclado (← →)
document.addEventListener('keydown', (e) => {
  if(e.key === "ArrowLeft") showImage(currentIndex - 1);
  if(e.key === "ArrowRight") showImage(currentIndex + 1);
});

// Scroll lateral (ej: Magic Mouse o touchpad)
// document.querySelector(".lb-media").addEventListener("wheel", (e) => {
//   if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { 
//     if (e.deltaX > 0) showImage(currentIndex + 1); // scroll derecha
//     else showImage(currentIndex - 1); // scroll izquierda
//   }
// });

// Gestos táctiles (swipe en móviles)
let touchStartX = 0;
let touchEndX = 0;

document.getElementById("lb-img").addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.getElementById("lb-img").addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) showImage(currentIndex + 1); // swipe izquierda
  if (touchEndX > touchStartX + 50) showImage(currentIndex - 1); // swipe derecha
});

// ================== MENÚ HAMBURGUESA ==================
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".links");

if (toggle) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("show");
  });
}    