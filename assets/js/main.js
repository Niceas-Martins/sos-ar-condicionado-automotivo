/**
 * S.O.S Ar Condicionado Automotivo
 * JavaScript sem dependências externas.
 * Responsabilidades: WhatsApp, formulário, menu, cabeçalho e animações.
 */

// 1. Configuração do negócio
const CONFIG = window.SITE_CONFIG || {};
const whatsappNumber = String(CONFIG.whatsapp || '').replace(/\D/g, '');
const validPhone = /^55\d{10,11}$/.test(whatsappNumber) && !/^550+$/.test(whatsappNumber);

// 2. Comunicação com WhatsApp
function openWhatsApp(message) {
  if (!validPhone) {
    alert('WhatsApp em demonstração. Configure o número em assets/js/config.js.');
    return;
  }

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// 3. Formulário: não envia dados a um servidor.
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#nome').value.trim();
  const service = document.querySelector('#servico').value;
  const details = document.querySelector('#mensagem').value.trim();

  if (!name || !service) {
    return;
  }

  const message = [
    `Olá! Meu nome é ${name}.`,
    `Gostaria de informações sobre: ${service}.`,
    details ? `Detalhes: ${details}` : '',
    'Aguardo seu retorno!'
  ].filter(Boolean).join('\n\n');

  openWhatsApp(message);
});

// 4. Atalho flutuante para conversar
const whatsappButton = document.querySelector('#whatsapp-float');

whatsappButton.addEventListener('click', (event) => {
  event.preventDefault();
  openWhatsApp('Olá! Vi o site da S.O.S e gostaria de conversar sobre o ar-condicionado do meu carro.');
});

// 5. Navegação móvel
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// 6. Sombra no cabeçalho ao rolar
const header = document.querySelector('#header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
}, { passive: true });

// 7. Dados variáveis exibidos na página
const city = CONFIG.cidade || 'Cidade a confirmar';
document.querySelector('#city-label').textContent = city;
document.querySelector('#footer-city').textContent = city;
document.querySelector('#year').textContent = new Date().getFullYear();

// 8. Animações quando o conteúdo aparece na tela
const revealElements = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}
