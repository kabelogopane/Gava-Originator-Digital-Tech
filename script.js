const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!menuButton || !nav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  nav.classList.remove('open');
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, {rootMargin: '-30% 0px -60% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}


const projectForm = document.getElementById('project-enquiry-form');
if (projectForm) {
  projectForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!projectForm.reportValidity()) return;

    const data = new FormData(projectForm);
    const message = [
      'Hello Gava Originator Digital Tech. I would like to make a project enquiry.',
      '',
      'Name: ' + data.get('name'),
      'Business: ' + (data.get('business') || 'Not provided'),
      'Email or phone: ' + data.get('contact'),
      'Help needed: ' + data.get('service'),
      'More about my project: ' + data.get('message'),
      'When I would like to start: ' + (data.get('timing') || 'Flexible'),
      '',
      'Please let me know the next steps. Thank you.'
    ].join('\n');

    const whatsappUrl = 'https://wa.me/27706797350?text=' + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}


// Make each service card open its dedicated information page.
document.querySelectorAll('.service-card[data-service-link]').forEach(card => {
  const destination = card.dataset.serviceLink;
  card.addEventListener('click', event => {
    if (event.target.closest('a,button,input,select,textarea')) return;
    window.location.href = destination;
  });
  card.addEventListener('keydown', event => {
    if (event.target !== card) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = destination;
    }
  });
});
