import UI from './UI';
import Form from '../Form/Form';
import Task from '../Task/Task';
import TaskForm from '../Form/TaskForm';

/* Header slide left and right  */
const burgerMenuInput = document.querySelector('input');
const header = document.querySelector('header');

function toggleBurgerMenu() {
  header.classList.toggle('shrink-menu');
}

UI.addEventListener(burgerMenuInput, 'change', toggleBurgerMenu);

/* Add task form expand */
const addTaskBtn = document.querySelector('.add-task-btn');
const formWrapper = document.querySelector('.form-wrapper');

function expandForm() {
  formWrapper.classList.toggle('expand-form');
}

UI.addEventListener(addTaskBtn, 'click', expandForm);

/* Dialog add project, close and open */
const addProjectBtn = document.querySelector('.add-project-btn');
const dialog = document.querySelector('dialog');

function showDialog() {
  dialog.showModal();
}

UI.addEventListener(addProjectBtn, 'click', showDialog);

const modalCloseBtn = document.querySelector('.close-modal');

function closeModal() {
  dialog.close();
}

UI.addEventListener(modalCloseBtn, 'click', closeModal);

/* Project list show/hide */
const showProjectsBtn = document.querySelector('.show-projects-list');
const projectsList = document.querySelector('.projects-list');

function hideProjects() {
  projectsList.classList.toggle('hidden');
}
UI.addEventListener(showProjectsBtn, 'click', hideProjects);

/* Task expand/shrink */
const hiddenPartOfTask = document.querySelector('.hidden-part');
const showMoreBtn = document.querySelector('.task-show-more-btn');

function toggleTaskDetails() {
  hiddenPartOfTask.classList.toggle('active');
}

UI.addEventListener(showMoreBtn, 'click', toggleTaskDetails);

/* Add subtask to form */
const subTaskButton = document.querySelector('.subtask-add-btn');

function createSubTask() {
  const subTaskGroup = document.querySelector('.subtask-group');
  const subtaskTextArea = document.querySelector('.subtask-textarea');

  const subtaskDiv = UI.createDomElement('div', {
    className: 'subtask',
  });

  const subtaskPara = UI.createDomElement('input', {
    value: `${subtaskTextArea.value}`,
    type: 'text',
    name: 'subtask',
  });

  const deleteSubtaskBtn = UI.createDomElement('button', {
    type: 'button',
  });

  const crossIcon = UI.createDomElement('i', {
    className: 'fa-solid fa-xmark',
  });

  deleteSubtaskBtn.append(crossIcon);

  subtaskDiv.append(subtaskPara, deleteSubtaskBtn);

  subTaskGroup.append(subtaskDiv);

  /* Clear subtask input field after adding */
  subtaskTextArea.value = Form.clearInput(subtaskTextArea); // remove to diff place
}

UI.addEventListener(subTaskButton, 'click', createSubTask);

/* Delete subtask btn */
const subtaskGroup = document.querySelector('.subtask-group');

UI.addEventListener(subtaskGroup, 'click', TaskForm.deleteSubtaskManually);

/* Event listeners for creating task and project */
const [taskForm, projectForm] = document.querySelectorAll('form');

UI.addEventListener(taskForm, 'submit', (e) => {
  e.preventDefault();
  const formData = Form.collectData(taskForm);
  const newTask = new Task(
    ...formData.getAll('title'),
    ...formData.getAll('description'),
    ...formData.getAll('deadline'),
    ...formData.getAll('priority'),
    formData.getAll('subtask'),
  );

  TaskForm.deleteAllSubtasksAutomatically(taskForm);
  Form.resetFormFields(taskForm);
});

UI.addEventListener(projectForm, 'submit', (e) => {
  e.preventDefault();
  const formData = Form.collectData(projectForm);

  UI.createProject(...formData.getAll('project-name'));
  Form.resetFormFields(projectForm);
  dialog.close();
});
