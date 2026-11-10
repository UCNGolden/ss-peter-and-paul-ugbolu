/**
 * js/gallery.js
 * Image Gallery and Lightbox Modal Viewer
 * SS Peter and Paul Catholic Church, Ugbolu
 */

let galleryItems = [];
let activeCategory = 'all';
let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
  await loadGallery();
  initGalleryControls();
  renderGallery();
});

async function loadGallery() {
  try {
    const res = await fetch('data/gallery.json');
    if (!res.ok) throw new Error('Failed to load gallery');
    galleryItems = await res.json();
  } catch (err) {
    console.error('Error loading gallery items:', err);
  }
}

function initGalleryControls() {
  const pills = document.querySelectorAll('.gallery-filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category || 'all';
      renderGallery();
    });
  });

  const modal = document.getElementById('galleryLightbox');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateLightbox(1));
  }

  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.open) return;
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function renderGallery() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  let filtered = galleryItems;
  if (activeCategory !== 'all') {
    filtered = galleryItems.filter(item => item.category === activeCategory);
  }

  container.innerHTML = filtered.map((item, idx) => `
    <div class="gallery-card" onclick="openLightbox(${galleryItems.indexOf(item)})" role="button" tabindex="0" aria-label="View ${item.title}">
      <div class="gallery-thumb-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy" width="400" height="300">
      </div>
      <div class="gallery-info">
        <h4 class="gallery-title">${item.title}</h4>
        <p class="gallery-desc">${item.caption}</p>
        <div style="margin-top:0.5rem; display:flex; justify-content:space-between; align-items:center;">
          <span class="badge badge-gold" style="font-size:0.7rem;">${item.category}</span>
          <span style="font-size:0.75rem; color:var(--text-light);">Photo ${item.date}</span>
        </div>
      </div>
    </div>
  `).join('');
}

window.openLightbox = function(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  const modal = document.getElementById('galleryLightbox');
  if (modal) modal.showModal();
};

function navigateLightbox(delta) {
  currentLightboxIndex = (currentLightboxIndex + delta + galleryItems.length) % galleryItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = galleryItems[currentLightboxIndex];
  if (!item) return;

  const imgElem = document.getElementById('lightboxImg');
  const captionElem = document.getElementById('lightboxCaptionText');
  const counterElem = document.getElementById('lightboxCounter');

  if (imgElem) {
    imgElem.src = item.image;
    imgElem.alt = item.title;
  }
  if (captionElem) {
    captionElem.innerHTML = `<strong>${item.title}</strong> — ${item.caption} <br><small style="color:var(--gold-400);">SS Peter and Paul Catholic Church, Ugbolu</small>`;
  }
  if (counterElem) {
    counterElem.textContent = `${currentLightboxIndex + 1} of ${galleryItems.length}`;
  }
}
