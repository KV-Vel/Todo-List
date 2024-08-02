import './css/reset-css.css';
import './css/style.css';

/* Header slide left and right  */
const burgerMenuInput = document.querySelector('input');
const header = document.querySelector('header');

burgerMenuInput.addEventListener('change', () => {
  header.classList.toggle('shrink-menu');
});

/* Add task form expand */
const addTaskBtn = document.querySelector('.add-task-btn');
const formWrapper = document.querySelector('.form-wrapper');

function expandForm() {
  formWrapper.classList.toggle('expand-form');
}

addTaskBtn.addEventListener('click', expandForm);

/* Dialog add project, close and open */
const addProjectBtn = document.querySelector('.add-project-btn');
const dialog = document.querySelector('dialog');

function showDialog() {
  dialog.showModal();
}

const modalCloseBtn = document.querySelector('.close-modal');

function closeModal() {
  dialog.close();
}

modalCloseBtn.addEventListener('click', closeModal);
addProjectBtn.addEventListener('click', showDialog);

/* Project list show/hide */
const showProjectsBtn = document.querySelector('.show-projects-list');
const projectsList = document.querySelector('.projects-list');

function hideProjects() {
  projectsList.classList.toggle('hidden');
}

showProjectsBtn.addEventListener('click', hideProjects);

/* Task expand/shrink */
const hiddenPartOfTask = document.querySelector('.hidden-part');
const showMoreBtn = document.querySelector('.task-show-more-btn');

function toggleTaskDetails() {
  hiddenPartOfTask.classList.toggle('active');
}

showMoreBtn.addEventListener('click', toggleTaskDetails);
