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
    this.view.bindHandleTabs(this.handleTabs);
  }

  initDefault() {
    this.view.initializeListeners();
    this.view.displayProjects(this.projectLogic.getProjects());
    this.view.displayTasks(this.taskLogic.getTasks());
  }

  handleTabs = (ProjectId) => {
    this.view.displayTasks(this.taskLogic.getTasksById(ProjectId));
  };

  handleAddProject = (formData) => {
    this.projectLogic.createProject(formData);
    this.view.displayProjects(this.projectLogic.getProjects());
  };

  handleDeleteProject = (id) => {
    this.projectLogic.deleteProject(id);
    this.view.updateOptionList(this.projectLogic.getProjects());
    // Change deleted project to default project Home
  };

  handleAddTask = (formData, activeTab) => {
    this.taskLogic.createTask(formData);
    if (activeTab.getAttribute('data-id')) {
      this.view.displayTasks(this.taskLogic.getTasksById(activeTab.getAttribute('data-id')));
    } else {
      console.log('error'); // add in future logic to parse text data attr
    }
  };

  handleTask = (id, className) => {
    switch (className) {
      case 'delete-task-btn':
        this.taskLogic.deleteTask(id);
        break;
      case 'check-task-btn':
        this.taskLogic.completeTask(id);
        break;
      case 'change-task-btn':
        this.view.fillTaskForm(this.taskLogic.getTaskInformation(id));
        break;
      default:
        throw new Error('Error');
    }
  };

  handleEditTask = (id, data) => {
    this.taskLogic.editTask(id, data);
    this.view.displayTasks(this.taskLogic.getTasks());
  };

  handleCompleteTask = (id) => {
    this.taskLogic.completeTask(id);
  };

  handleEditProject = (id, newName) => {
    console.log(newName);
    this.projectLogic.editProject(id, newName);
    this.view.displayProjects(this.projectLogic.getProjects());
  };
}

// Deleted project should set all its tasks to Home
// Home project cant be deleted
// Delete any project should then set focus to All projects
