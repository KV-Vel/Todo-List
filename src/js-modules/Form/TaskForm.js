import Form from './Form';

export default class TaskForm {
  static deleteSubtaskManually(e) {
    const subtask = e.target.parentNode.parentNode;
    if (e.target.classList.contains('fa-xmark')) {
      subtask.remove();
    }
  }

  static deleteAllSubtasksAutomatically() {
    // removing subtasks
    const subtasks = document.querySelectorAll('.subtask');
    subtasks.forEach((subtask) => subtask.remove());
  }
}
