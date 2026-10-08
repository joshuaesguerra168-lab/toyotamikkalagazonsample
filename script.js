/* =========================================================
   EDIT CONTACT DETAILS HERE
   Update this object to change the contact actions and labels.
   ========================================================= */
const CONTACT = {
  name: "Mikka Lagazon",
  phoneDisplay: "0955-077-1709",
  phone: "+639557771709",
  email: "mikka.lagazon@toyotaangeles.com",
  company: "Toyota Angeles Pampanga",
  location: "Angeles - Magalang Rd, Angeles, 2009 Pampanga",
  mapQuery: "Toyota Angeles Pampanga",
  facebook: "https://www.facebook.com/MikkaBLagazonToyotaAngelesPampanga",
  messenger: "https://m.me/mikka.lagazon.5",
  emailSubject: "Toyota Inquiry"
};

const encode = (value) => encodeURIComponent(value);
const mailto = `mailto:${CONTACT.email}?subject=${encode(CONTACT.emailSubject)}`;
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encode(CONTACT.mapQuery)}`;

document.querySelectorAll('[data-action="call"]').forEach((link) => {
  link.href = `tel:${CONTACT.phone}`;
});
document.querySelectorAll('[data-action="email"]').forEach((link) => {
  link.href = mailto;
});
document.querySelectorAll('[data-action="map"]').forEach((link) => {
  link.href = mapUrl;
});
document.querySelectorAll('[data-action="facebook"]').forEach((link) => {
  link.href = CONTACT.facebook;
});
document.querySelectorAll('[data-action="messenger"]').forEach((link) => {
  link.href = CONTACT.messenger;
});
document.querySelectorAll('[data-field="name"]').forEach((el) => { el.textContent = CONTACT.name; });
document.querySelectorAll('[data-field="phoneDisplay"]').forEach((el) => { el.textContent = CONTACT.phoneDisplay; });
document.querySelectorAll('[data-field="email"]').forEach((el) => { el.textContent = CONTACT.email; });

document.getElementById('save-contact').addEventListener('click', (event) => {
  event.preventDefault();
  const escapeVCard = (value) => String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const [firstName, ...rest] = CONTACT.name.split(' ');
  const lastName = rest.join(' ');
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
    `FN:${escapeVCard(CONTACT.name)}`,
    `ORG:${escapeVCard(CONTACT.company)}`,
    `TEL;TYPE=CELL,VOICE:${CONTACT.phone}`,
    `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
    `ADR;TYPE=WORK:;;${escapeVCard(CONTACT.location)};;;;`,
    'END:VCARD'
  ].join('\r\n');
  const file = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const download = document.createElement('a');
  download.href = url;
  download.download = `${CONTACT.name.toLowerCase().replace(/\s+/g, '-')}.vcf`;
  document.body.appendChild(download);
  download.click();
  download.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
