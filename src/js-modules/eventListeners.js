import { className } from 'postcss-selector-parser';
import createEl from './createElement';

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

/* Add subtask to form */
const subTaskButton = document.querySelector('.subtask-add-btn');

/* Clear subtask after adding */
function clearSubTaskInput(input) {
  input = '';
  return input;
}

function createSubTask() {
  const subTaskGroup = document.querySelector('.subtask-group');
  const subtaskTextArea = document.querySelector('.subtask-textarea');

  const subtaskDiv = createEl('div', {
    className: 'subtask',
  });

  const subtaskPara = createEl('p', {
    textContent: `${subtaskTextArea.value}`,
  });

  const deleteSubtaskBtn = createEl('button', {
    type: 'button',
  });

  const crossIcon = createEl('i', {
    className: 'fa-solid fa-xmark',
  });

  deleteSubtaskBtn.append(crossIcon);

  subtaskDiv.append(subtaskPara, deleteSubtaskBtn);

  subTaskGroup.append(subtaskDiv);

  subtaskTextArea.value = clearSubTaskInput(subtaskTextArea.value);
}

subTaskButton.addEventListener('click', createSubTask);

/* Delete subtask btn */
const subtaskGroup = document.querySelector('.subtask-group');

function deleteSubtask(e) {
  const subtask = e.target.parentNode.parentNode;
  if (e.target.classList.contains('fa-xmark')) {
    subtask.remove();
  }
}

subtaskGroup.addEventListener('click', deleteSubtask);
