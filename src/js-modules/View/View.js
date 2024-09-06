import date from '../utility/utility';

export default class View {
  static #resetForm(form) {
    form.reset();
    if (form.classList.contains('new-task-form')) {
      View.#deleteAllSubtasks();

      // selecting disabled option by default
      document.querySelector('option').selected = true;
    }
  }

  static #deleteAllSubtasks() {
    const subtasks = document.querySelectorAll('.subtask');
    subtasks.forEach((subtask) => subtask.remove());
  }

  static #deleteAllTaskUI() {
    const tasks = document.querySelectorAll('.task');

    tasks.forEach((task) => task.remove());
  }

  static #deleteAllProjectsUI() {
    const projects = document.querySelectorAll('.navigation-li-proj');

    projects.forEach((proj) => proj.remove());
  }

  static #deleteAllOptions() {
    const allOptions = document.querySelectorAll('option');

    allOptions.forEach((option) => option.remove());
  }

  static #createNewOption(listOfProjects) {
    for (let projNumber = 0; projNumber < listOfProjects.length; projNumber += 1) {
      const select = document.querySelector('select');
      const option = View.createDomElement('option', {
        textContent: `${listOfProjects[projNumber].name}`,
      });
      option.setAttribute('data-id', `${listOfProjects[projNumber].id}`);
      select.append(option);
    }
  }

  static #createDefaultOptionList() {
    const select = document.querySelector('select');
    const placeHolderOption = View.createDomElement('option', {
      value: '',
      selected: true,
      disabled: true,
      textContent: 'Select project',
    });

    select.append(placeHolderOption);
  }

  static #findActiveStyle() {
    const [...navigation] = document.querySelectorAll('.navigation');

    return navigation.find((elem) => elem.classList.contains('active'));
  }

  static #removeFoundActiveStyle() {
    const activeStyle = View.#findActiveStyle();
    if (activeStyle) {
      activeStyle.classList.remove('active');
    }
  }

  static addCurrentDate() {
    const weekday = document.querySelector('.weekday');
    const dayNum = document.querySelector('.day-num');
    const month = document.querySelector('.month');
    [weekday.textContent, dayNum.textContent, month.textContent] = [date.textWeekDay, date.DAY, date.textMonth];
  }

  static getOptionFromOptionList(projID) {
    const [...optionList] = document.querySelectorAll('option');

    return optionList.find((option) => option.getAttribute('data-id') === projID);
  }

  static getPriority(priorityTask) {
    const [...priorityList] = document.querySelectorAll('input[name="priority"]');

    return priorityList.find((priority) => priority.value === priorityTask);
  }

  static createDomElement(tag, properties) {
    const el = document.createElement(tag);
    for (const key in properties) {
      el[key] = properties[key];
    }
    return el;
  }

  #setForChangeTask() {
    if (this.header.classList.contains('shrink-menu')) {
      // toggle menu back to show header
      this.header.classList.remove('shrink-menu');
      this.burgerMenuInput.checked = false;
    }
    if (!this.formWrapper.classList.contains('expand-form')) {
      // toggle form to make an update of task and pull user focus
      this.formWrapper.classList.add('expand-form');
    }
    View.#resetForm(this.taskForm);

    this.createTaskBtn.classList.add('hidden');
    this.updateWrapper.classList.remove('hidden');
  }

  #updatingTaskId;

  #updatingProjectId;

  constructor() {
    this.burgerMenuInput = document.querySelector('input');
    this.header = document.querySelector('header');

    this.addTaskBtn = document.querySelector('.add-task-btn');
    this.formWrapper = document.querySelector('.form-wrapper');

    this.addProjectBtn = document.querySelector('.add-project-btn');
    this.dialog = document.querySelector('.add-proj-dialog');
    this.modalCloseBtn = document.querySelector('.close-modal');

    this.showProjectsBtn = document.querySelector('.show-projects-list');
    this.projectsList = document.querySelector('.projects-list');

    this.subTaskButton = document.querySelector('.subtask-add-btn');
    this.subtaskGroup = document.querySelector('.subtask-group');

    this.projectForm = document.querySelector('.add-project-form');
    this.taskForm = document.querySelector('.new-task-form');

    this.taskWrapper = document.querySelector('.tasks-wrapper-main');

    this.subtaskTextArea = document.querySelector('.subtask-textarea');

    this.createTaskBtn = document.querySelector('.create-task-btn');
    this.updateWrapper = document.querySelector('.update-wrapper');
    this.editTaskBtn = document.querySelector('.edit-task-btn');
    this.cancelEditTaskBtn = document.querySelector('.cancel-edit-task-btn');

    this.editProjectSubmitBtn = document.querySelector('.add-project-submit');
    this.addProjectInput = document.querySelector('.add-project-input');

    this.navBar = document.querySelector('nav');

    this.defaultTabs = document.querySelector('.static-tabs');

    this.allTasksTab = document.querySelector('li[data-name = "All"]');
    this.taskCounter = document.querySelector('.task-counter');
    this.sectionHeader = document.querySelector('.section-header');

    this.appTitle = document.querySelector('title');
  }

  eventToggleBurgerMenu() {
    this.header.classList.toggle('shrink-menu');
  }

  /* Add task form expand */
  eventExpandForm() {
    this.formWrapper.classList.toggle('expand-form');
  }

  eventHideProjects() {
    this.projectsList.classList.toggle('hidden');
  }

  /* Change active tab style */
  eventChangeTabStyle(e) {
    if (e.target.tagName === 'LI') {
      View.#removeFoundActiveStyle();
      e.target.classList.add('active');
    }
  }

  initialize() {
    this.burgerMenuInput.addEventListener('change', () => { this.eventToggleBurgerMenu(); });
    this.addTaskBtn.addEventListener('click', () => { this.eventExpandForm(); });
    this.addProjectBtn.addEventListener('click', () => { this.dialog.showModal(); });
    this.modalCloseBtn.addEventListener('click', () => {
      this.dialog.close();
      this.addProjectInput.value = '';
      this.editProjectSubmitBtn.textContent = 'Confirm';
    });
    //
    this.dialog.addEventListener('cancel', (e) => {
      if (e.type === 'cancel') {
        this.addProjectInput.value = '';
        this.editProjectSubmitBtn.textContent = 'Confirm';
      }
    });
    this.showProjectsBtn.addEventListener('click', () => { this.eventHideProjects(); });
    this.subTaskButton.addEventListener('click', () => { this.createSubTaskUI(); });
    this.subtaskGroup.addEventListener('click', (e) => { this.deleteSubtaskUI(e); });
    this.cancelEditTaskBtn.addEventListener('click', () => {
      this.cancelEditTask();
      View.#resetForm(this.taskForm);
    });
    this.navBar.addEventListener('click', (e) => { this.eventChangeTabStyle(e); });
    window.addEventListener('DOMContentLoaded', () => { View.addCurrentDate(); });

    this.appTitle.textContent = 'Todo List — All';
  }

  bindCreateProjectUI(handler) {
    this.projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(this.projectForm);
      handler(...data.getAll('project-name'));

      this.dialog.close();
      View.#resetForm(this.projectForm);
    });
  }

  bindDeleteProjectUI(handler) {
    this.projectsList.addEventListener('click', (e) => {
      const projectEl = e.target.closest('li');
      const projectID = projectEl.getAttribute('data-id');

      if (e.target.classList.contains('delete-project-btn') && projectID !== '123') {
        handler(projectID);
        projectEl.remove();
        this.allTasksTab.classList.add('active');
      }
    });
  }

  bindHandleTask(handler) {
    this.taskWrapper.addEventListener('click', (e) => {
      const taskEl = e.target.closest('.task');
      const taskID = taskEl.getAttribute('data-taskid');
      if (e.target.classList.contains('delete-task-btn')) {
        handler(taskID, 'delete-task-btn', View.#findActiveStyle());
        taskEl.remove();
      } else if (e.target.classList.contains('check-task-btn')) {
        handler(taskID, 'check-task-btn', View.#findActiveStyle());
      } else if (e.target.classList.contains('change-task-btn')) {
        this.#setForChangeTask();
        handler(taskID, 'change-task-btn', View.#findActiveStyle());
      } else if (e.target.type === 'checkbox' && e.target.id) {
        handler(e.target.closest('.task').getAttribute('data-taskid'), 'checkbox', e.target.id);
      }
    });
  }

  bindCreateTaskUI(handler) {
    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(this.taskForm);
      const selectedOption = document.querySelector('option:checked');
      data.set('project', selectedOption.getAttribute('data-id'));

      handler(data, View.#findActiveStyle());

      View.#resetForm(this.taskForm);
    });
  }

  bindEditTask(handler) {
    this.editTaskBtn.addEventListener('click', () => {
      const data = new FormData(this.taskForm);
      const selectedOption = document.querySelector('option:checked');
      data.set('project', selectedOption.getAttribute('data-id'));
      handler(this.#updatingTaskId, data, View.#findActiveStyle());

      View.#resetForm(this.taskForm);
      this.createTaskBtn.classList.remove('hidden');
      this.updateWrapper.classList.add('hidden');
    });
  }

  bindEditProject(handler) {
    this.editProjectSubmitBtn.addEventListener('click', (e) => {
      if (this.editProjectSubmitBtn.textContent === 'Edit') {
        e.preventDefault();
        handler(this.#updatingProjectId, this.addProjectInput.value);
        this.dialog.close();
        this.sectionHeader.textContent = `#${this.addProjectInput.value}`;
        this.appTitle.textContent = `Todo List — #${this.addProjectInput.value}`;
        View.#resetForm(this.projectForm);
        this.editProjectSubmitBtn.textContent = 'Confirm';
      }
    });
  }

  bindProjTabs(handler) {
    this.projectsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('navigation-li-proj')) {
        handler(e.target.getAttribute('data-id'));
      }
    });
  }

  bindStaticTabs(handler) {
    this.defaultTabs.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-name')) {
        handler(e.target.getAttribute('data-name'));
      }
    });
  }

  /* Create Subtask UI */
  createSubTaskUI(subtask) {
    const subTaskGroup = document.querySelector('.subtask-group');

    const subtaskDiv = View.createDomElement('div', {
      className: 'subtask',
    });

    const subtaskPara = View.createDomElement('input', {
      value: `${subtask || this.subtaskTextArea.value}`,
      type: 'text',
      name: 'subtask',
    });

    const deleteSubtaskBtn = View.createDomElement('button', {
      type: 'button',
    });

    const crossIcon = View.createDomElement('i', {
      className: 'fa-solid fa-xmark',
    });

    deleteSubtaskBtn.append(crossIcon);

    subtaskDiv.append(subtaskPara, deleteSubtaskBtn);

    subTaskGroup.append(subtaskDiv);

    /* Clear subtask input field after adding */
    this.subtaskTextArea.value = '';
  }

  /* UI of Task */
  createTaskUI(title, description, deadline, project, priority, subtasks, id, isCompleted) {
    const taskWrapper = document.querySelector('.tasks-wrapper-main');
    const taskDiv = View.createDomElement('div', {
      className: 'task',
    });
    taskDiv.setAttribute('data-taskId', `${id}`);
    taskDiv.setAttribute('data-projectId', `${project}`);

    /* VISIBLE PART OF TASK */
    const taskVisibleDiv = View.createDomElement('div', {
      className: 'visible-part',
    });

    const taskInnerTaskWrapper = View.createDomElement('div', {
      className: 'task-wrapper',
    });

    const taskHeader = View.createDomElement('h3', {
      textContent: title,
    });
    const taskDueDate = View.createDomElement('span', {
      textContent: `Deadline: ${date.formatDate(deadline)}`,
    });
    const taskPriority = View.createDomElement('span', {
      textContent: 'Priority: ',
    });
    const taskPriorityMarker = View.createDomElement('i', {
      className: `fa-solid fa-circle ${priority}`,
    });

    taskPriority.append(taskPriorityMarker);
    taskInnerTaskWrapper.append(taskHeader, taskDueDate, taskPriority);

    const taskWrapperButtons = View.createDomElement('div', {
      className: 'task-wrapper-buttons',
    });

    const taskCheckProjectBtn = View.createDomElement('button', {
      type: 'button',
      className: 'project-btn check-task-btn',
      click(e, handler) {
        const taskEl = e.target.closest('.task');
        const taskID = taskEl.getAttribute('data-id');
        handler(taskID);
      },
    });
    const checkProjectBtnIcon = View.createDomElement('i', {
      className: isCompleted ? 'fa-solid fa-square-check completed' : 'fa-solid fa-square-check',
    });
    taskCheckProjectBtn.append(checkProjectBtnIcon);

    const taskChangeProjectBtn = View.createDomElement('button', {
      type: 'button',
      className: 'project-btn change-task-btn',
    });
    const changeProjectBtnIcon = View.createDomElement('i', {
      className: 'fa-solid fa-square-pen',
    });
    taskChangeProjectBtn.append(changeProjectBtnIcon);

    const taskDeleteProjectBtn = View.createDomElement('button', {
      type: 'button',
      className: 'project-btn delete-task-btn',
    });
    const deleteProjectBtnIcon = View.createDomElement('i', {
      className: 'fa-solid fa-rectangle-xmark',
    });
    taskDeleteProjectBtn.append(deleteProjectBtnIcon);

    taskWrapperButtons.append(taskCheckProjectBtn, taskChangeProjectBtn, taskDeleteProjectBtn);

    taskVisibleDiv.append(taskInnerTaskWrapper, taskWrapperButtons);

    /* HIDDEN PART OF TASK */
    const taskHiddenDiv = View.createDomElement('div', {
      className: 'hidden-part',
    });

    const hiddenPartWrapper = View.createDomElement('div', {
      className: 'hidden-part-wrapper',
    });

    const hiddenParagraph = View.createDomElement('p', {
      textContent: description,
    });

    const hiddenForm = View.createDomElement('form');
    const hiddenUl = View.createDomElement('ul');
    this.createLitagsFromSubtasks(subtasks, hiddenUl);

    hiddenForm.append(hiddenUl);

    hiddenPartWrapper.append(hiddenParagraph, hiddenForm);

    taskHiddenDiv.append(hiddenPartWrapper);

    /* EXPAND BUTTON */
    const taskExpandBtnWrapper = View.createDomElement('div', {
      className: 'expand-btn-wrapper',
    });

    const expandBtn = View.createDomElement('button', {
      textContent: 'Show more...',
      type: 'button',
      className: 'task-show-more-btn',
      onclick() {
        taskHiddenDiv.classList.toggle('active');
        if (taskHiddenDiv.classList.contains('active')) {
          expandBtn.textContent = 'Show less...';
        } else {
          expandBtn.textContent = 'Show more...';
        }
      },
    });

    taskExpandBtnWrapper.append(expandBtn);

    taskDiv.append(taskVisibleDiv, taskHiddenDiv, taskExpandBtnWrapper);

    taskWrapper.append(taskDiv);
  }

  /* UI of project */
  createProjectUI(projectName, id) {
    const projectsList = document.querySelector('.projects-list');

    const newProjectLi = View.createDomElement('li', {
      textContent: `#${projectName}`,
      className: 'navigation navigation-li-proj',
    });
    newProjectLi.setAttribute('data-id', `${id}`);

    const btnWrapper = View.createDomElement('div', {
      className: 'project-btn-wrapper',
    });

    const editBtn = View.createDomElement('button', {
      className: 'edit-project-btn',
    });

    const editIcon = View.createDomElement('i', {
      className: 'fa-solid fa-pen',
    });

    const deleteProjectButton = View.createDomElement('button', {
      className: 'delete-project-btn',
    });

    const deleteProjectIcon = View.createDomElement('i', {
      className: 'fa-solid fa-trash-can',
    });

    editBtn.append(editIcon);
    deleteProjectButton.append(deleteProjectIcon);
    btnWrapper.append(editBtn, deleteProjectButton);

    newProjectLi.append(btnWrapper);

    projectsList.append(newProjectLi);

    editBtn.addEventListener('click', () => {
      this.dialog.showModal();
      this.editProjectSubmitBtn.textContent = 'Edit';
      this.addProjectInput.value = projectName;
      this.#updatingProjectId = id;
    });
  }

  createLitagsFromSubtasks(subtasks, elementToAppend) {
    for (let subtaskNumber = 0; subtaskNumber < subtasks.length; subtaskNumber += 1) {
      const li = View.createDomElement('li');
      const liInput = View.createDomElement('input', {
        type: 'checkbox',
        id: `subtask${subtaskNumber}`,
        checked: subtasks[subtaskNumber].isChecked,
      });
      const liLabel = View.createDomElement('label', {
        textContent: subtasks[subtaskNumber].subtaskName,
        for: `subtask${subtaskNumber}`,
      });
      li.append(liInput, liLabel);
      elementToAppend.append(li);
    }
  }

  /* Delete subtask UI */
  deleteSubtaskUI(e) {
    const clickedSubtask = e.target.closest('.subtask');
    if (e.target.classList.contains('fa-xmark')) {
      clickedSubtask.remove();
    }
  }

  displayTasks(tasks) {
    View.#deleteAllTaskUI();
    if (tasks) {
      tasks.forEach((task) => this.createTaskUI(
        task.title,
        task.description,
        task.deadline,
        task.projectID,
        task.priority,
        task.subtasks,
        task.id,
        task.isCompleted,
      ));
    }
    this.displayTaskCounter(tasks);
  }

  displayProjects(projects) {
    View.#deleteAllProjectsUI();

    projects.forEach((project) => this.createProjectUI(project.name, project.id));
    this.updateOptionList(projects);
  }

  updateOptionList(listOfProjects) {
    View.#deleteAllOptions();
    View.#createDefaultOptionList();
    View.#createNewOption(listOfProjects);
  }

  cancelEditTask() {
    View.#resetForm(this.taskForm);
    this.createTaskBtn.classList.remove('hidden');
    this.updateWrapper.classList.add('hidden');
  }

  fillTaskForm(task) {
    const titleInput = document.querySelector('#task-title');
    const descriptionInput = document.querySelector('#description');
    const deadlineInput = document.querySelector('#task-deadline');
    const option = View.getOptionFromOptionList(task.projectID);

    const priority = View.getPriority(task.priority);
    const subtaskList = task.subtasks;

    titleInput.value = task.title;
    task.description === 'Empty' ? descriptionInput.value = '' : descriptionInput.value = task.description;
    deadlineInput.value = task.deadline;
    option.selected = true;
    priority.checked = true;
    subtaskList.forEach((subtask) => this.createSubTaskUI(subtask.subtaskName));

    this.#updatingTaskId = task.id;
  }

  addActiveStyle(attrName, attrValue) {
    const el = document.querySelector(`li[data-${attrName}="${attrValue}"]`);
    if (View.#findActiveStyle()) {
      View.#removeFoundActiveStyle();
      el.classList.add('active');
    } else {
      el.classList.add('active');
    }
    return el;
  }

  displayTaskCounter(tasksArr) {
    if (tasksArr.length === 1) {
      this.taskCounter.textContent = `${tasksArr.length} task`;
    } else {
      this.taskCounter.textContent = `${tasksArr.length} tasks`;
    }
  }

  handleActiveStyle(nameAttr, info) {
    const choosenEl = this.addActiveStyle(nameAttr, info);
    this.sectionHeader.textContent = choosenEl.textContent;
    this.appTitle.textContent = `Todo List — ${choosenEl.textContent}`;
  }
}
