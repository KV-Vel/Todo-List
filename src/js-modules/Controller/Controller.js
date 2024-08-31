export default class Controller {
  constructor(taskLogic, projectLogic, view) {
    this.taskLogic = taskLogic;
    this.projectLogic = projectLogic;
    this.view = view;

    this.view.bindCreateProjectUI(this.handleAddProject);
    this.view.bindDeleteProjectUI(this.handleDeleteProject);
    this.view.bindCreateTaskUI(this.handleAddTask);
    this.view.bindHandleTask(this.handleTask);
    this.view.bindEditTask(this.handleEditTask);
    this.view.bindEditProject(this.handleEditProject);
    this.view.bindProjTabs(this.handleProjectTabs);
    this.view.bindStaticTabs(this.handleStaticTabs);
  }

  initDefault() {
    this.view.initializeListeners();
    this.view.displayProjects(this.projectLogic.getProjects());
    this.view.displayTasks(this.taskLogic.getTasks());
  }

  handleProjectTabs = (projectId) => {
    this.view.displayTasks(this.taskLogic.getTasksById(projectId));
    this.view.handleActiveStyle('id', projectId);
  };

  handleStaticTabs = (tabName) => {
    switch (tabName) {
      case 'All':
        this.view.displayTasks(this.taskLogic.getTasks());
        this.view.handleActiveStyle('name', tabName);
        break;
      case 'Today':
        this.view.displayTasks(this.taskLogic.getTodayTasks());
        this.view.handleActiveStyle('name', tabName);
        break;
      case 'Next 7 days':
        this.view.displayTasks(this.taskLogic.getNext7DaysTasks());
        this.view.handleActiveStyle('name', tabName);
        break;
      case 'Next 30 days':
        this.view.displayTasks(this.taskLogic.getNext30DaysTasks());
        this.view.handleActiveStyle('name', tabName);
        break;
      case 'Completed':
        this.view.displayTasks(this.taskLogic.getCompletedTasks());
        this.view.handleActiveStyle('name', tabName);
        break;
      default:
        throw new Error('No such filter');
    }
  };

  handleAddProject = (formData) => {
    this.projectLogic.createProject(formData);
    this.view.displayProjects(this.projectLogic.getProjects());
    this.handleProjectTabs(this.projectLogic.getProjects().at(-1).id);
  };

  handleDeleteProject = (id) => {
    this.projectLogic.deleteProject(id);
    this.view.updateOptionList(this.projectLogic.getProjects());
    this.handleStaticTabs('All');
  };

  handleAddTask = (formData, tabName) => {
    this.taskLogic.createTask(formData);
    this.handleActiveTab(tabName);
  };

  handleTask = (id, className, tabName) => {
    switch (className) {
      case 'delete-task-btn':
        this.taskLogic.deleteTask(id);
        this.handleActiveTab(tabName);
        break;
      case 'check-task-btn':
        this.taskLogic.completeTask(id);
        this.handleActiveTab(tabName);
        break;
      case 'change-task-btn':
        this.view.fillTaskForm(this.taskLogic.getTaskInformation(id));
        break;
      default:
        throw new Error('Error');
    }
  };

  handleEditTask = (id, data, tabName) => {
    this.taskLogic.editTask(id, data);
    this.handleActiveTab(tabName);
  };

  handleCompleteTask = (id) => {
    this.taskLogic.completeTask(id);
  };

  handleEditProject = (id, newName) => {
    this.projectLogic.editProject(id, newName);
    this.handleProjectTabs(id);
    this.view.displayProjects(this.projectLogic.getProjects());
    this.view.addActiveStyle('id', id);
  };

  handleActiveTab(activeTab) {
    if (activeTab.getAttribute('data-id')) {
      this.handleProjectTabs(activeTab.getAttribute('data-id'));
    } else if (activeTab.getAttribute('data-name')) {
      this.handleStaticTabs(activeTab.getAttribute('data-name'));
    }
  }
}

// Home project cant be deleted
// Shom more add setTimeout like css style shrink
