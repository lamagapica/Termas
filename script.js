let viewer360 = null;

// Inicializa Pannellum asegurando la renderización en dispositivos móviles
function initPannellum() {
  if (!viewer360) {
    viewer360 = pannellum.viewer('panorama', {
      type: 'equirectangular',
      panorama: 'termas.png', // Ruta de la imagen panorámica 360°
      autoLoad: true,
      autoRotate: -2,
      compass: false,
      showZoomCtrl: false,
      mouseZoom: false,
      touchPan: true
    });
  } else {
    // Fuerza el re-cálculo del tamaño en pantalla móvil tras cambiar de pestaña
    setTimeout(() => {
      viewer360.resize();
    }, 100);
  }
}

// Cambio entre pestañas (Antes/Después vs Visor 360°)
function switchTab(idx) {
  const tabsContainer = document.querySelector('.tabs');
  const tab0 = document.getElementById('tab0');
  const tab1 = document.getElementById('tab1');
  const view0 = document.getElementById('view0');
  const view1 = document.getElementById('view1');

  if (!tabsContainer || !tab0 || !tab1 || !view0 || !view1) return;

  tabsContainer.setAttribute('data-t', idx);

  if (idx === 0) {
    tab0.setAttribute('aria-selected', 'true');
    tab1.setAttribute('aria-selected', 'false');
    view0.classList.add('on');
    view1.classList.remove('on');
  } else {
    tab0.setAttribute('aria-selected', 'false');
    tab1.setAttribute('aria-selected', 'true');
    view0.classList.remove('on');
    view1.classList.add('on');

    // Cargar o ajustar visor 360 al activar pestaña
    initPannellum();
  }
}

// Control del Slider de comparación y validación de la misión
document.addEventListener('DOMContentLoaded', () => {
  const rng = document.getElementById('rng');
  const afterLayer = document.getElementById('after');
  const knob = document.getElementById('knob');

  if (rng && afterLayer && knob) {
    rng.addEventListener('input', (e) => {
      const val = e.target.value;
      afterLayer.style.clipPath = `inset(0 0 0 ${val}%)`;
      knob.style.left = `${val}%`;
    });
  }

  // Validación de la respuesta
  const goBtn = document.getElementById('go');
  const ansInput = document.getElementById('ans');
  const msgP = document.getElementById('msg');
  const winCard = document.getElementById('winCard');

  if (goBtn && ansInput && msgP && winCard) {
    goBtn.addEventListener('click', () => {
      const val = ansInput.value.trim();
      if (val === '3') {
        msgP.textContent = '';
        winCard.classList.add('on');
        winCard.scrollIntoView({ behavior: 'smooth' });
      } else {
        msgP.textContent = 'Respuesta incorrecta. Revise la documentación.';
      }
    });
  }
});
