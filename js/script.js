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
      cover: "./assets/Images/Post/Post_para_Instagram_para_contenido_psicologia_centrado_y_llamativo_rosa.png",
      images: [
        { src: "./assets/Images/Post/Post_para_Instagram_para_contenido_psicologia_centrado_y_llamativo_rosa.png", desc: "Publicación para Instagram sobre psicología" },
        { src: "./assets/Images/Post/524815345_1666383154066387_4804356597192189977_n.jpg", desc: "Publicación para Instagram sobre psicología" },
        { src: "./assets/Images/Post/524960760_18053864462528539_5597198048789890410_n.webp", desc: "Rifa" }
      ],
      live: "#",
      repo: "#"
      },
      {
      title: "Publicaciones de Instagram",
      year: 2024,
      tags: ["Flyer"],
      cover: "./assets/Images/Flyer/Post.jpg",
      images: [
        { src: "./assets/Images/Flyer/Post.jpg", desc: "Publicación para Instagram sobre psicología" },
        { src: "./assets/Images/Flyer/2025-08-20_a_las_6.58.14_p.m..png", desc: "Publicación para Instagram sobre psicología" },
        { src: "./assets/Images/Flyer/522648116_18053122223528539_3963680367250242931_n.jpg", desc: "Publicación para Instagram sobre psicología" },
      ],
      live: "#",
      repo: "#"
      },
      {
      title: "Publicaciones de Instagram",
      year: 2024,
      tags: ["Logo"],
      cover: "./assets/Images/Logo/Logo_Marca_Personal_Letra_K_Minimalista_Tipografico_Negro_y_Rosado1.png",
      images: [
        { src: "./assets/Images/Logo/Logo_Marca_Personal_Letra_K_Minimalista_Tipografico_Negro_y_Rosado1.png", desc: "Logo Marca Personal" },
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

    // Init
    renderFilters();
    renderGallery();

    // Respeta reduce motion
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      $$('img').forEach(img=> img.style.transition='none');
    }

let currentProject = null;
let currentIndex = 0;

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

// ================== MENÚ HAMBURGUESA ==================
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".links");

if (toggle) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("show");
  });
}    