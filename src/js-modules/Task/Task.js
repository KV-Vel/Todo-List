export default class Task {
  static taskInstances = [];

  static addTaskInstances(instance) {
    Task.taskInstances.push(instance);
  }

  constructor(title, description, deadline, priority, subtasks = []) {
    this.title = title;
    this.description = description || 'Empty';
    this.deadline = deadline;
    this.priority = priority;
    this.subtasks = subtasks || 'Empty';
  }
}
