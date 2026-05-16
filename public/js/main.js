// ─── MOBILE NAV ──────────────────────────────────────
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', links.classList.contains('open'));
  });
}

// Close nav when link clicked
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => links && links.classList.remove('open'));
});

// ─── SCROLL REVEAL ───────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// ─── NAVBAR SCROLL ───────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 2px 20px rgba(44,36,32,0.1)'
      : '';
  }, { passive: true });
}

// ─── AUTO-FILL PRODUCT IN CONTACT ────────────────────
// Already handled server-side via query param, but
// also handle client-side if arriving via JS redirect
const params = new URLSearchParams(window.location.search);
const productParam = params.get('product');
if (productParam) {
  const input = document.getElementById('productNameInput');
  if (input && !input.value) {
    input.value = decodeURIComponent(productParam);
  }
}

// ─── FLASH AUTO-DISMISS ──────────────────────────────
document.querySelectorAll('.flash').forEach(flash => {
  setTimeout(() => {
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.4s';
    setTimeout(() => flash.remove(), 400);
  }, 5000);
});
