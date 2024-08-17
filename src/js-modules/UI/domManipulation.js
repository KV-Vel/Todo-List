import UI from './UI';
import FormUI from '../Form/Form-UI';
import Form from '../Form/Form';
import Task from '../Task/Task';
import Project from '../Project/Project';
// import TaskUI from '../Task/Task-UI';
// import ProjectUI from '../Project/Project-UI';

/* Header slide left and right  */
const burgerMenuInput = document.querySelector('input');
const header = document.querySelector('header');

function toggleBurgerMenu() {
  header.classList.toggle('shrink-menu');
}

burgerMenuInput.addEventListener('change', toggleBurgerMenu);

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

addProjectBtn.addEventListener('click', showDialog);

const modalCloseBtn = document.querySelector('.close-modal');

function closeModal() {
  dialog.close();
}

modalCloseBtn.addEventListener('click', closeModal);

/* Project list show/hide */
const showProjectsBtn = document.querySelector('.show-projects-list');
const projectsList = document.querySelector('.projects-list');

function hideProjects() {
  projectsList.classList.toggle('hidden');
}

showProjectsBtn.addEventListener('click', hideProjects);

/* Toggling active class for navbar lists */
const navLi = document.querySelector('nav');

navLi.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    UI.removeFoundActiveStyle();
    e.target.classList.add('active');
    UI.setSectionHeaderFromAttribute(e.target, 'data-name');
  }
});

function deleteProject(e) {
  if (e.target.classList.contains('fa-trash-can')) {
    const dataNameAttributeOfProject = e.target.parentNode.parentNode.getAttribute('data-name');
    const projectElement = e.target.parentNode.parentNode;
    UI.removeFoundActiveStyle();
    // UI delete Project
    projectElement.remove();
    // Inner delete from array
    Project.deleteProject(dataNameAttributeOfProject);

    UI.selectTabByAttribute('data-name', 'All');
    FormUI.updateOptionList(Project.getAllProjects());
  }
}

// delete project event
projectsList.addEventListener('click', deleteProject);
/* Add subtask to form */
const subTaskButton = document.querySelector('.subtask-add-btn');
subTaskButton.addEventListener('click', FormUI.createSubTaskUI);

/* Delete subtask btn */
const subtaskGroup = document.querySelector('.subtask-group');

subtaskGroup.addEventListener('click', FormUI.deleteSubtaskUI);

/* Event listeners for creating task and project */
const [taskForm, projectForm] = document.querySelectorAll('form');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const collectedData = Form.getCollectedData(taskForm);
  Task.createTask(collectedData);
  Form.resetForm(taskForm, UI.deleteAllSubtasksAutomatically());
});

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const collectedData = Form.getCollectedData(projectForm);

  Project.createProject(collectedData);
  FormUI.updateOptionList(Project.getAllProjects());
  Form.resetForm(projectForm);
  dialog.close();
});

/**
 *  Пределать названия функций на более понятные\
 * сделать функции более реюзабельными? И затем еще раз проверить функционал deleteProject. В идеал с помощью одной функции
 * нужно удалять и тудушники, и проджекты и остальнео
 * 2) change task
 * 3) delete task
 * 4) set task as done
 * 5) switch between projects
 * 6) render all project in create task form
 * 7) Make possible to delete Home project/ Either save it with
 * localStorage or apply default project function on window load
 */
