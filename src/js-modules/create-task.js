export default class Task {
  constructor(title, description, deadline, priority, subtasks = []) {
    this.title = title;
    this.description = 'Empty' || description;
    this.deadline = deadline;
    this.priority = priority;
    this.subtasks = 'Empty' || subtasks;
  }
}
