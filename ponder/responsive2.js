// Target the menu button and navigation
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

// When the menu button is clicked:
menuBtn.addEventListener('click', () => {
  // Toggle "show" class to show/hide nav
  nav.classList.toggle('show');

  // Toggle "change" class to animate button
  menuBtn.classList.toggle('change');
});
