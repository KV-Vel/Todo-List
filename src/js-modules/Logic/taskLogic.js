import date from '../utility/utility';

export default class Task {
  static #tasks = [
    new Task('Demo', "Hello, i'm demo task", '2024-08-30', '123', 'red', ['Demo subtask 1', 'Demo subtask 2'], '987', false),
  ];

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
    this.description = description || '';
    this.deadline = deadline;
    this.projectID = projectID;
    this.priority = priority;
    this.subtasks = subtasks || '';
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
    if (!matchedTask.isCompleted) {
      matchedTask.isCompleted = true;
    } else {
      matchedTask.isCompleted = false;
    }
  }

  getTasks() {
    return Task.#allTasks().filter((task) => task.isCompleted === false);
  }

  getTodayTasks() {
    return Task.#allTasks().filter((task) => date.isToday(task.deadline) && task.isCompleted === false);
  }

  getNext7DaysTasks() {
    return Task.#allTasks().filter((task) => date.isWithinInterval(task.deadline, {
      start: date.TODAY,
      end: date.getNext7Days,
    }) && task.isCompleted === false);
  }

  getNext30DaysTasks() {
    return Task.#allTasks().filter((task) => date.isWithinInterval(task.deadline, {
      start: date.TODAY,
      end: date.getNext30Days,
    }) && task.isCompleted === false);
  }

  getCompletedTasks() {
    return Task.#allTasks().filter((task) => task.isCompleted);
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
    newProjectID,
    newPriority,
    newSubtasks,
  ) {
    foundTask.title = newTitle;
    foundTask.description = newDescription;
    foundTask.deadline = newDeadline;
    foundTask.projectID = newProjectID;
    foundTask.priority = newPriority;
    foundTask.subtasks = newSubtasks;
  }

  editTask(id, formData) {
    const matchedTask = Task.#tasks.find((task) => task.id === id);
    console.log(...formData);
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
