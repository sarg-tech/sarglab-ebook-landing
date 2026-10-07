const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');
const menuItems = document.querySelectorAll('.nav-links a');
const currentYear = document.querySelector('#current-year');

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  navLinks.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

function toggleMenu() {
  if (!menuToggle || !navLinks) return;

  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navLinks.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
}

menuToggle?.addEventListener('click', toggleMenu);

menuItems.forEach((item) => {
  item.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 780) closeMenu();
});

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 8);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
