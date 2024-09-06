import date from '../utility/utility';

export default class Task {
  static #tasks = JSON.parse(localStorage.getItem('tasks')) || [{
    title: 'Demo', description: "Hello, i'm demo task", deadline: '2024-08-30', projectID: '123', priority: 'red', subtasks: [{ subtaskName: 'Demo subtask 1', isChecked: false }, { subtaskName: 'Demo subtask 2', isChecked: false }], id: '987', isCompleted: false,
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

  static createSubTaskObj(subtasksArr) {
    const res = [];
    for (const key of subtasksArr) {
      res.push({ subtaskName: key, isChecked: false });
    }
    return res;
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
      Task.createSubTaskObj(formData.getAll('subtask')),
    );
    Task.addTaskInstance(newTask);
    localStorage.setItem('tasks', JSON.stringify(Task.#allTasks()));
  }

  deleteTask(id) {
    Task.#tasks = Task.#tasks.filter((projectID) => projectID.id !== id);
    localStorage.setItem('tasks', JSON.stringify(Task.#allTasks()));
  }

  completeTask(id) {
    const matchedTask = Task.#findTask(id);
    if (!matchedTask.isCompleted) {
      matchedTask.isCompleted = true;
    } else {
      matchedTask.isCompleted = false;
    }
    localStorage.setItem('tasks', JSON.stringify(Task.#allTasks()));
  }

  toggleSubtask(taskID, subtaskID) {
    const matchedTask = Task.#findTask(taskID);
    if (!matchedTask.subtasks[subtaskID.at(-1)].isChecked) {
      matchedTask.subtasks[subtaskID.at(-1)].isChecked = true;
    } else {
      matchedTask.subtasks[subtaskID.at(-1)].isChecked = false;
    }

    localStorage.setItem('tasks', JSON.stringify(Task.#allTasks()));
  }

  getTasks() {
    return Task.#allTasks().filter((task) => !task.isCompleted);
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

  redifineTasks(id) {
    const matchedTasks = this.getTasks().filter((task) => task.projectID === id);
    // If project deleted set it's tasks to default undelitable project
    matchedTasks.forEach((task) => task.projectID = '123');
  }

  editTask(id, formData) {
    const matchedTask = Task.#findTask(id);
    const editedTask = {
      title: formData.getAll('title')[0],
      description: formData.getAll('description')[0],
      deadline: formData.getAll('deadline')[0],
      projectID: formData.getAll('project')[0],
      priority: formData.getAll('priority')[0],
      subtasks: Task.createSubTaskObj(formData.getAll('subtask')),
    };
    Object.assign(matchedTask, editedTask);
    localStorage.setItem('tasks', JSON.stringify(Task.#allTasks()));
  }
}
