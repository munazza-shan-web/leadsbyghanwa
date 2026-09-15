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

document.querySelector('.copy-brief').addEventListener('click', async () => {
  const brief = 'Target market:\nIndustries:\nCompany size:\nDecision-maker roles:\nLocation:\nNumber of leads:\nRequired fields:\nPreferred format:';
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(brief);
    status.textContent = 'Project brief copied — paste it into your message and complete the fields.';
  } catch {
    status.textContent = 'Please include your target market, roles, location, lead quantity and required fields.';
  }
});
