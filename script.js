// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');

ham.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  // Animate hamburger lines
  const spans = ham.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMob() {
  mobileNav.classList.remove('open');
  const spans = ham.querySelectorAll('span');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ===== NAVBAR LINK HOVER: Change color while scrolled =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (navbar.classList.contains('scrolled')) {
      link.style.color = 'var(--accent)';
    }
  });
  link.addEventListener('mouseleave', () => {
    link.style.color = '';
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .service-item, .stat, .cta-box').forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

// ===== SMOOTH SCROLL for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== STAT NUMBER COUNT-UP ANIMATION =====
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el));

function animateCount(el) {
  const raw = el.textContent.trim();
  const num = parseFloat(raw);
  const suffix = raw.replace(/[\d.]/g, '');
  if (isNaN(num)) return;
  let start = 0;
  const duration = 1500;
  const step = 16;
  const increment = num / (duration / step);
  const timer = setInterval(() => {
    start += increment;
    if (start >= num) {
      el.textContent = raw;
      clearInterval(timer);
    } else {
      el.textContent = (Number.isInteger(num) ? Math.floor(start) : start.toFixed(1)) + suffix;
    }
  }, step);
}
