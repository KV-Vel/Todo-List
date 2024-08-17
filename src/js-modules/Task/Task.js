import TaskUI from './Task-UI';

export default class Task {
  static #taskInstances = [];

  static addTaskInstances(instance) {
    Task.#taskInstances.push(instance);
  }

  static createTask(formData) {
    const newTask = new Task(
      ...formData.getAll('title'),
      ...formData.getAll('description'),
      ...formData.getAll('deadline'),
      ...formData.getAll('project'),
      ...formData.getAll('priority'),
      formData.getAll('subtask'),
    );

    Task.addTaskInstances(newTask);

    TaskUI.createTaskUI(
      newTask.title,
      newTask.description,
      newTask.deadline,
      newTask.priority,
      newTask.subtasks,
    );
  }

  static get allInstances() {
    return Task.#taskInstances;
  }

  // static get AllTagsTasks() {
  //   return this.taskInstances;
  // }

  constructor(title, description, deadline, project, priority, subtasks = []) {
    this.title = title;
    this.description = description || 'Empty';
    this.deadline = deadline;
    this.project = project;
    this.priority = priority;
    this.subtasks = subtasks || 'Empty';
  }

  // get property(property) {
  //   return this.property;
  // }
}
