export default class Task {
  static #tasks = [{
    title: 'Demo', description: "Hello, i'm demo task", deadline: '2024-08-31', projectID: '123', priority: 'red', subtasks: ['Demo subtask 1', 'Demo subtask 2'], id: '987', isCompleted: false,
  }];

  static #allTasks() {
    return this.#tasks;
  }

  static #findTask(id) {
    return Task.#tasks.find((task) => task.id === id);
  }

  static addTaskInstance(task) {
    Task.#tasks.push(task);
  }

  constructor(title, description, deadline, projectID, priority, subtasks = []) {
    this.title = title;
    this.description = description || 'Empty';
    this.deadline = deadline;
    this.projectID = projectID;
    this.priority = priority;
    this.subtasks = subtasks || 'Empty';
    this.id = String(Date.now());
    this.isCompleted = false;
  }

  createTask(formData) {
    const newTask = new Task(
      ...formData.getAll('title'),
      ...formData.getAll('description'),
      ...formData.getAll('deadline'),
      ...formData.getAll('project'),
      ...formData.getAll('priority'),
      formData.getAll('subtask'),
    );
    Task.addTaskInstance(newTask);
    console.log(newTask);
  }

  deleteTask(id) {
    Task.#tasks = Task.#tasks.filter((projectID) => projectID.id !== id);
  }

  completeTask(id) {
    const matchedTask = Task.#findTask(id);
    matchedTask.isCompleted = true;
  }

  getTasks() {
    return Task.#allTasks();
  }

  getTasksById(id) {
    return Task.#tasks.filter((task) => task.projectID === id);
  }

  getTaskInformation(id) {
    return Task.#findTask(id);
  }

  editTaskParams(
    foundTask,
    newTitle,
    newDescription,
    newDeadline,
    newProject,
    newPriority,
    newSubtasks,
  ) {
    foundTask.title = newTitle;
    foundTask.description = newDescription;
    foundTask.deadline = newDeadline;
    foundTask.project = newProject;
    foundTask.priority = newPriority;
    foundTask.subtasks = newSubtasks;
  }

  editTask(id, formData) {
    const matchedTask = Task.#tasks.find((task) => task.id === id);
    this.editTaskParams(
      matchedTask,
      ...formData.getAll('title'),
      ...formData.getAll('description'),
      ...formData.getAll('deadline'),
      ...formData.getAll('project'),
      ...formData.getAll('priority'),
      formData.getAll('subtask'),
    );
  }
}

// Когда добавляется проект в нажатый на таб элемент, то сначала он начинает отображаться в текущей вкладке хоть и не соответствует текущему проекту
