const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navigation.classList.toggle('open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.navigation a[href^="#"]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-28% 0px -62% 0px' });

  sections.forEach((section) => observer.observe(section));
}
