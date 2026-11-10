/**
 * js/app.js
 * Core application logic: navigation drawer, accessible dialog helpers, toast, back-to-top
 * SS Peter and Paul Catholic Church, Ugbolu
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initBackToTop();
  initDialogLightDismiss();
  highlightActiveNav();
});

/* Mobile Drawer */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');
  const navLinks = document.querySelectorAll('.drawer-nav-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* Back to Top */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Accessible Light Dismiss for Native <dialog> Elements */
function initDialogLightDismiss() {
  // Test click position against bounding rect so clicks on dialog body don't close
  const isClickOutside = (e, dialog) => {
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  document.querySelectorAll('dialog[closedby="any"]').forEach(dialog => {
    let pressedOutside = false;
    dialog.addEventListener('pointerdown', (e) => {
      pressedOutside = isClickOutside(e, dialog);
    });
    dialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && isClickOutside(e, dialog)) {
        dialog.close();
      }
    });
  });
}

/* Highlight Active Navigation Link based on Current URL */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* Reusable Toast Notification System */
window.showToast = function(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '⚠';

  toast.innerHTML = `
    <span style="font-weight:bold; color:var(--gold-400); font-size:1.1rem;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add('is-show');
  });

  setTimeout(() => {
    toast.classList.remove('is-show');
    setTimeout(() => toast.remove(), 350);
  }, 4000);
};
