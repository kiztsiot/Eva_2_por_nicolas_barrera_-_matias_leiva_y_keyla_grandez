/* DATOS DE SERVICIOS MUNICIPALES*/
const SERVICES = [
  {
    icon: 'bi-car-front-fill',
    name: 'Permiso de Circulación',
    desc: 'Renueva tu permiso de circulación de manera rápida y segura.',
    url: 'https://cholcholpagos.insico.cl/PermisoCirculacion',
    detail: 'Realiza el pago de tu permiso de circulación en línea. Disponible durante todo el año. Necesitas tener tu RUT y patente a mano.'
  },
  {
    icon: 'bi-eye-fill',
    name: 'Transparencia Activa',
    desc: 'Accede a la información pública y presupuestos del municipio.',
    url: 'https://www.portaltransparencia.cl/PortalPdT/directorio-de-organismos-regulados/?org=MU045',
    detail: 'Consulta la información pública del municipio: presupuestos, contratos, dotación de personal y más, según la Ley 20.285.'
  },
  {
    icon: 'bi-file-earmark-text-fill',
    name: 'Solicitud de Información',
    desc: 'Presenta tu solicitud de acceso a la información pública.',
    url: 'https://www.portaltransparencia.cl/PortalPdT/ingreso-sai-v2?idOrg=498',
    detail: 'Puedes solicitar información sobre actos y documentos municipales. El plazo de respuesta es de 20 días hábiles.'
  },
  {
    icon: 'bi-broadcast',
    name: 'Sesiones en Vivo',
    desc: 'Sigue las sesiones del Concejo Municipal en tiempo real.',
    url: 'https://www.youtube.com/@MunicipalidaddeCholcholOficial/streams',
    detail: 'Transmisiones en vivo de las sesiones del Concejo Municipal a través del canal oficial de YouTube.'
  },
  {
    icon: 'bi-clipboard-check-fill',
    name: 'Encuesta Ciudadana',
    desc: 'Tu opinión es importante. Participa en las consultas vecinales.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScBBsnUVPRz9K-SMc7p-sMfZ_s3tTOPvUYjnOr_viCpk6u3TQ/viewform',
    detail: 'Participa en las encuestas ciudadanas y ayuda a mejorar los servicios municipales de Cholchol.'
  },
  {
    icon: 'bi-building-fill',
    name: 'Ley Lobby',
    desc: 'Consulta las audiencias y reuniones de las autoridades municipales.',
    url: 'https://www.leylobby.gob.cl/instituciones/MU045',
    detail: 'Accede al registro de audiencias, viajes y donativos de las autoridades sujetas a la Ley de Lobby N°20.730.'
  }
];

/* RENDERIZAR SERVICIOS */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = '';

  SERVICES.forEach((svc, index) => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-4 animate-in';
    col.innerHTML = `
      <div class="service-card" role="button" tabindex="0"
           aria-label="Ver detalles de: ${svc.name}"
           data-index="${index}">
        <div class="service-icon" aria-hidden="true">
          <i class="bi ${svc.icon}"></i>
        </div>
        <div class="service-name">${svc.name}</div>
        <p class="service-desc">${svc.desc}</p>
      </div>
    `;
    grid.appendChild(col);
  });

  // Evento click en tarjetas de servicio 
  grid.addEventListener('click', handleServiceClick);


  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleServiceClick(e);
    }
  });

  // Observar los nuevos elementos para animaciones
  observeAnimations();
}

/* ACTUALIZAR EL DOM*/
function handleServiceClick(e) {
  const card = e.target.closest('[data-index]');
  if (!card) return;

  const svc = SERVICES[parseInt(card.dataset.index)];

  //  Modificar el título y cuerpo del modal en el DOM
  document.getElementById('serviceModalLabel').textContent = svc.name;
  document.getElementById('serviceModalBody').innerHTML = `
    <div class="d-flex align-items-center gap-3 mb-3">
      <div style="width:52px;height:52px;border-radius:50%;background:var(--color-light);
                  display:flex;align-items:center;justify-content:center;
                  font-size:1.5rem;color:var(--color-secondary)">
        <i class="bi ${svc.icon}"></i>
      </div>
      <strong style="font-family:var(--font-display);color:var(--color-primary)">${svc.name}</strong>
    </div>
    <p style="font-size:0.92rem;line-height:1.7;color:var(--color-text)">${svc.detail}</p>
  `;
  document.getElementById('serviceModalLink').href = svc.url;

  const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
  modal.show();
}

/* Cambia el fondo de la navbar al hacer scroll*/
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    //  También controla el botón "volver arriba"
    toggleBackToTop();
  });
}

/*Muestra/oculta el botón y hace scroll al inicio*/
function toggleBackToTop() {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

function initBackToTop() {
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Muestra/oculta elementos del DOM según categoría */
function initNewsFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {

      // Actualizar clases de los botones en el DOM
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      const filter = this.dataset.filter;
      const items = document.querySelectorAll('.news-item');
      let visible = 0;

      // Modificar la visibilidad de los elementos en el DOM
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      // Actualizar el mensaje "sin resultados" en el DOM
      const noResults = document.getElementById('noResults');
      noResults.style.display = visible === 0 ? 'block' : 'none';
    });
  });
}

/* VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO*/

/**
 * Marca un campo como válido en el DOM
 * @param {string} inputId - ID del campo
 * @param {string} errId   - ID del mensaje de error
 * @param {string|null} okId - ID del mensaje de éxito
 */
function setValid(inputId, errId, okId) {
  const input = document.getElementById(inputId);
  const err = document.getElementById(errId);
  const ok = okId ? document.getElementById(okId) : null;
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  err.classList.remove('visible');
  if (ok) ok.classList.add('visible');
}

/**
 * Marca un campo como inválido en el DOM
 * @param {string} inputId - ID del campo
 * @param {string} errId   - ID del mensaje de error
 * @param {string|null} okId - ID del mensaje de éxito
 */
function setInvalid(inputId, errId, okId) {
  const input = document.getElementById(inputId);
  const err = document.getElementById(errId);
  const ok = okId ? document.getElementById(okId) : null;
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  err.classList.add('visible');
  if (ok) ok.classList.remove('visible');
}

/**
 * Limpia el estado de validación de un campo
 */
function clearState(inputId, errId, okId) {
  const input = document.getElementById(inputId);
  const err = document.getElementById(errId);
  const ok = okId ? document.getElementById(okId) : null;
  input.classList.remove('is-invalid', 'is-valid');
  err.classList.remove('visible');
  if (ok) ok.classList.remove('visible');
}

/* VALIDACIÓN EN TIEMPO REAL blur Valida formato de nombre, correo, teléfono y mensaje*/
function initFormValidation() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex = /^(\+?56)?(\s?)(\d{8,9})$/;

  // Validar nombre al salir del campo
  document.getElementById('nombre').addEventListener('blur', function () {
    if (this.value.trim().length >= 2) {
      setValid('nombre', 'nombreError', 'nombreOk');
    } else if (this.value.trim().length > 0) {
      setInvalid('nombre', 'nombreError', 'nombreOk');
    } else {
      clearState('nombre', 'nombreError', 'nombreOk');
    }
  });

  // Validar correo al salir del campo
  document.getElementById('correo').addEventListener('blur', function () {
    if (emailRegex.test(this.value.trim())) {
      setValid('correo', 'correoError', 'correoOk');
    } else if (this.value.trim().length > 0) {
      setInvalid('correo', 'correoError', 'correoOk');
    } else {
      clearState('correo', 'correoError', 'correoOk');
    }
  });
          if (valor.length === 0) {
            esValido = false;
            mensajeError.innerText = " El correo es obligatorio";
        } else if (!valor.endsWith("@gmail.com") || valor === "@gmail.com" || valor.includes(" ")) {
            esValido = false;
            mensajeError.innerText = " Solo se permiten correos Gmail (usuario@gmail.com)";
        }
    }

  // Validar teléfono (opcional) al salir del campo
  document.getElementById('telefono').addEventListener('blur', function () {
    if (this.value.trim() === '' || telRegex.test(this.value.trim())) {
      clearState('telefono', 'telefonoError', null);
    } else {
      setInvalid('telefono', 'telefonoError', null);
    }
  });

  // Contador de caracteres en tiempo real
  const mensajeInput = document.getElementById('mensaje');
  const charCount = document.getElementById('charCount');

  mensajeInput.addEventListener('input', function () {
    const len = this.value.length;

    // Modificar el texto del contador en el DOM
    charCount.textContent = `${len} / 500`;
    charCount.style.color = len > 450 ? '#dc3545' : 'var(--color-muted)';

    if (len >= 20) {
      setValid('mensaje', 'mensajeError', 'mensajeOk');
    } else if (len > 0) {
      document.getElementById('mensaje').classList.add('is-invalid');
      document.getElementById('mensajeError').classList.add('visible');
      document.getElementById('mensajeOk').classList.remove('visible');
    } else {
      clearState('mensaje', 'mensajeError', 'mensajeOk');
    }
  });

  //Validación completa al enviar el formulario
  document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
}

/* MANEJO DEL ENVÍO DEL FORMULARIO */
function handleFormSubmit(e) {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const asunto = document.getElementById('asunto').value;
  const privacidad = document.getElementById('privacidad').checked;

  // Validar nombre
  if (nombre.length < 2) { setInvalid('nombre', 'nombreError', 'nombreOk'); isValid = false; }
  else { setValid('nombre', 'nombreError', 'nombreOk'); }

  // Validar correo
  if (!emailRegex.test(correo)) { setInvalid('correo', 'correoError', 'correoOk'); isValid = false; }
  else { setValid('correo', 'correoError', 'correoOk'); }

  // Validar asunto
  if (!asunto) {
    document.getElementById('asunto').classList.add('is-invalid');
    document.getElementById('asuntoError').classList.add('visible');
    isValid = false;
  } else {
    document.getElementById('asunto').classList.remove('is-invalid');
    document.getElementById('asuntoError').classList.remove('visible');
  }

  // Validar mensaje
  if (mensaje.length < 20) { setInvalid('mensaje', 'mensajeError', 'mensajeOk'); isValid = false; }
  else { setValid('mensaje', 'mensajeError', 'mensajeOk'); }

  // Validar privacidad
  if (!privacidad) {
    document.getElementById('privacidadError').classList.add('visible');
    isValid = false;
  } else {
    document.getElementById('privacidadError').classList.remove('visible');
  }

  // Ocultar alertas previas
  document.getElementById('formSuccess').classList.remove('show');
  document.getElementById('formError').classList.remove('show');

  if (isValid) {
    simulateFormSubmit();
  } else {
    //Mostrar alerta de error en el DOM
    document.getElementById('formError').classList.add('show');
  }
}

/**
 * Simula el envío y modifica el DOM con feedback visual
 */
function simulateFormSubmit() {
  const btn = document.getElementById('submitBtn');

  // Cambiar el contenido del botón en el DOM (estado: cargando...)
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

  setTimeout(() => {
    //Restaurar el botón y mostrar mensaje de éxito en el DOM
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Mensaje';
    document.getElementById('formSuccess').classList.add('show');

    // Limpiar el formulario y los estados de validación
    document.getElementById('contactForm').reset();
    document.getElementById('charCount').textContent = '0 / 500';
    document.querySelectorAll('.form-control-main').forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
    });
    document.querySelectorAll('.success-msg, .error-msg').forEach(el => {
      el.classList.remove('visible');
    });
  }, 1500);
}

/* CONTROLES DE ACCESIBILIDAD*/
function initAccessibilityControls() {
  const btnContraste = document.getElementById('btnContraste');
  const btnFuente = document.getElementById('btnFuente');
  const btnReset = document.getElementById('btnReset');

  //  Evento click para activar alto contraste/night mode
  btnContraste.addEventListener('click', function () {
    // Agregar/quitar clase al body en el DOM
    const active = document.body.classList.toggle('high-contrast');
    this.setAttribute('aria-pressed', String(active));
  });

  // Evento click para activar texto grande
  btnFuente.addEventListener('click', function () {
    const active = document.body.classList.toggle('large-text');
    this.setAttribute('aria-pressed', String(active));
  });

  //Evento click para restablecer accesibilidad
  btnReset.addEventListener('click', () => {
    //Eliminar clases de accesibilidad del DOM
    document.body.classList.remove('high-contrast', 'large-text');
    btnContraste.setAttribute('aria-pressed', 'false');
    btnFuente.setAttribute('aria-pressed', 'false');
  });
}

/* INTERSECTION OBSERVER — ANIMACIONES DE ENTRADA*/
function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          //Agregar clase al elemento en el DOM para activar la animación
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-in:not(.visible)').forEach(el => observer.observe(el));
}

/* INICIALIZACIÓN — Se ejecuta cuando el DOM está listo*/
document.addEventListener('DOMContentLoaded', () => {
  renderServices();       // Genera tarjetas de servicios en el DOM
  initNavbarScroll();     // Evento scroll navbar
  initBackToTop();        //Botón volver arriba
  initNewsFilter();       //Filtro de noticias
  initFormValidation();   // Validaciones del formulario
  initAccessibilityControls(); //Controles de accesibilidad
  observeAnimations();    //Animaciones de entrada
});
