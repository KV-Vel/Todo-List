import { createDomElement } from '../UI/UI';

export default class TaskUI {
  static createLitagsFromSubtasks(subtasks, elementToAppend) {
    for (let subtaskNumber = 0; subtaskNumber < subtasks.length; subtaskNumber += 1) {
      const li = createDomElement('li');
      const liInput = createDomElement('input', {
        type: 'checkbox',
        id: `subtask${subtaskNumber}`,
      });
      const liLabel = createDomElement('label', {
        textContent: subtasks[subtaskNumber],
        for: `subtask${subtaskNumber}`,
      });
      li.append(liInput, liLabel);
      elementToAppend.append(li);
    }
  }

//   static deleteTask();
}
