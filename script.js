const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const modal = document.querySelector('#sample-request');
const form = document.querySelector('#lead-request-form');
const formStatus = document.querySelector('#form-status');
let previousFocus;

function openModal(event) {
  event.preventDefault();
  previousFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('body-modal-open');
  setTimeout(() => form.querySelector('input').focus(), 50);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('body-modal-open');
  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll('.request-trigger').forEach((button) => button.addEventListener('click', openModal));
document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const selectedFields = data.getAll('fields').join(', ') || 'Not specified';
  const subject = `Custom Lead Sample Request — ${data.get('industry')}`;
  const message = [
    'Hello Munazza,',
    '',
    'I would like to request a custom prospect-list sample.',
    '',
    `Name: ${data.get('name')}`,
    `Company: ${data.get('company') || 'Not provided'}`,
    `Email: ${data.get('email')}`,
    `Target industry: ${data.get('industry')}`,
    `Number of leads: ${data.get('leadCount')}`,
    `Target location: ${data.get('location')}`,
    `Company size: ${data.get('companySize')}`,
    `Decision-maker roles: ${data.get('roles') || 'Not specified'}`,
    `Required fields: ${selectedFields}`,
    `Additional instructions: ${data.get('notes') || 'None'}`
  ].join('\n');

  try {
    await navigator.clipboard.writeText(message);
    formStatus.textContent = 'Your request has been copied. Your email app will open next.';
  } catch {
    formStatus.textContent = 'Opening your email app with the completed request.';
  }

  window.location.href = `mailto:munazzawebdeveloperr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});
