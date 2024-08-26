export default class View {
  static #resetForm(form) {
    form.reset();
    if (form.classList.contains('new-task-form')) {
      View.#deleteAllSubtasks();

      // selecting disabled option by default, otherwise doesn't work
      // choosing first option
      document.querySelector('option').selected = true;
    }
  }

  static #deleteAllSubtasks() {
    // removing subtasks
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
    const [...navigation] = document.querySelectorAll('.navigation'); // This method should be private
    return navigation.find((elem) => elem.classList.contains('active'));
  }

  static #removeFoundActiveStyle() {
    const activeStyle = View.#findActiveStyle();
    activeStyle.classList.remove('active');
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

    // this.allTab = document.querySelector('li[]')
  }

  /* Header slide left and right  */
  eventToggleBurgerMenu() {
    this.header.classList.toggle('shrink-menu');
  }

  /* Add task form expand */
  eventExpandForm() {
    this.formWrapper.classList.toggle('expand-form');
  }

  /* Project list show/hide */
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

  initializeListeners() {
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
  }

  /* Create Project */
  bindCreateProjectUI(handler) {
    this.projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(this.projectForm);
      handler(...data.getAll('project-name'));

      this.dialog.close();
      View.#resetForm(this.projectForm);
    });
  }

  /* Delete Project */
  bindDeleteProjectUI(handler) {
    this.projectsList.addEventListener('click', (e) => {
      const projectID = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
      const projectEl = e.target.parentNode.parentNode.parentNode;

      if (e.target.classList.contains('fa-trash-can')) {
        handler(projectID);
        projectEl.remove();
      }
    });
  }

  bindHandleTask(handler) {
    this.taskWrapper.addEventListener('click', (e) => {
      const taskID = e.target.parentNode.parentNode.parentNode.getAttribute('data-taskid');
      const taskEl = e.target.parentNode.parentNode.parentNode;
      if (e.target.classList.contains('delete-task-btn')) {
        handler(taskID, 'delete-task-btn');
        taskEl.remove();
      } else if (e.target.classList.contains('check-task-btn')) {
        handler(taskID, 'check-task-btn');
      } else if (e.target.classList.contains('change-task-btn')) {
        this.#setForChangeTask();
        handler(taskID, 'change-task-btn');
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

      // View.#resetForm(this.taskForm);
    });
  }

  bindEditTask(handler) {
    this.editTaskBtn.addEventListener('click', () => {
      const data = new FormData(this.taskForm);
      handler(this.#updatingTaskId, data);

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
        View.#resetForm(this.projectForm);
        this.editProjectSubmitBtn.textContent = 'Confirm';
      }
    });
  }

  bindHandleTabs(handler) {
    this.projectsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('navigation-li-proj')) {
        console.log('ok');
        handler(e.target.getAttribute('data-id'));
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
    this.subtaskTextArea.value = ''; // Make private function!!!!!
  }

  /* UI of Task */
  createTaskUI(title, description, deadline, project, priority, subtasks, id) {
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
      textContent: deadline,
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
        const taskID = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
        handler(taskID);
      },
    });
    const checkProjectBtnIcon = View.createDomElement('i', {
      className: 'fa-solid fa-square-check',
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
      });
      const liLabel = View.createDomElement('label', {
        textContent: subtasks[subtaskNumber],
        for: `subtask${subtaskNumber}`,
      });
      li.append(liInput, liLabel);
      elementToAppend.append(li);
    }
  }

  /* Delete subtask UI */
  deleteSubtaskUI(e) {
    const clickedSubtask = e.target.parentNode.parentNode;
    if (e.target.classList.contains('fa-xmark')) {
      clickedSubtask.remove();
    }
  }

  displayTasks(tasks) {
    View.#deleteAllTaskUI();
    tasks.forEach((task) => this.createTaskUI(
      task.title,
      task.description,
      task.deadline,
      task.projectID,
      task.priority,
      task.subtasks,
      task.id,
    ));
    View.#resetForm(this.taskForm);
    // View.#resetForm(this.taskForm);
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
    subtaskList.forEach((subtask) => this.createSubTaskUI(subtask));

    this.#updatingTaskId = task.id;
  }
}
// https://vk.com/wall-105439414_352
