import './css/reset-css.css';
import './css/style.css';

const burgerMenuInput = document.querySelector('input');
const header = document.querySelector('header');

burgerMenuInput.addEventListener('change', () => {
  header.classList.toggle('shrink-menu');
});
