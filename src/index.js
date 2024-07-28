import './css/reset-css.css';
import './css/style.css';

const burgerMenuInput = document.querySelector('input');
const header = document.querySelector('header');

burgerMenuInput.addEventListener('change', () => {
  header.classList.toggle('shrink-menu');
});

const addTaskBtn = document.querySelector('.add-task-btn');
const formWrapper = document.querySelector('.form-wrapper');

function expandForm() {
  formWrapper.classList.toggle('expand-form');
}

addTaskBtn.addEventListener('click', expandForm);
