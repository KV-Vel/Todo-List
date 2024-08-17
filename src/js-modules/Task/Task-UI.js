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

  static createTaskUI(title, description, deadline, priority, subtasks) {
    const taskWrapper = document.querySelector('.tasks-wrapper-main');

    const taskDiv = createDomElement('div', {
      className: 'task',
    });

    /* VISIBLE PART OF TASK */
    const taskVisibleDiv = createDomElement('div', {
      className: 'visible-part',
    });

    const taskInnerTaskWrapper = createDomElement('div', {
      className: 'task-wrapper',
    });

    const taskHeader = createDomElement('h3', {
      textContent: title,
    });
    const taskDueDate = createDomElement('span', {
      textContent: deadline,
    });
    const taskPriority = createDomElement('span', {
      textContent: 'Priority: ',
    });
    const taskPriorityMarker = createDomElement('i', {
      className: `fa-solid fa-circle ${priority}`,
    });

    taskPriority.append(taskPriorityMarker);
    taskInnerTaskWrapper.append(taskHeader, taskDueDate, taskPriority);

    const taskWrapperButtons = createDomElement('div', {
      className: 'task-wrapper-buttons',
    });

    const taskCheckProjectBtn = createDomElement('button', {
      type: 'button',
      className: 'project-btn check-project-btn',
    });
    const checkProjectBtnIcon = createDomElement('i', {
      className: 'fa-solid fa-square-check',
    });
    taskCheckProjectBtn.append(checkProjectBtnIcon);

    const taskChangeProjectBtn = createDomElement('button', {
      type: 'button',
      className: 'project-btn change-project-btn',
    });
    const changeProjectBtnIcon = createDomElement('i', {
      className: 'fa-solid fa-square-pen',
    });
    taskChangeProjectBtn.append(changeProjectBtnIcon);

    const taskDeleteProjectBtn = createDomElement('button', {
      type: 'button',
      className: 'project-btn delete-task-btn',
    });
    const deleteProjectBtnIcon = createDomElement('i', {
      className: 'fa-solid fa-rectangle-xmark',
    });
    taskDeleteProjectBtn.append(deleteProjectBtnIcon);

    taskWrapperButtons.append(taskCheckProjectBtn, taskChangeProjectBtn, taskDeleteProjectBtn);

    taskVisibleDiv.append(taskInnerTaskWrapper, taskWrapperButtons);

    /* HIDDEN PART OF TASK */
    const taskHiddenDiv = createDomElement('div', {
      className: 'hidden-part',
    });

    const hiddenPartWrapper = createDomElement('div', {
      className: 'hidden-part-wrapper',
    });

    const hiddenParagraph = createDomElement('p', {
      textContent: description,
    });

    const hiddenForm = createDomElement('form');
    const hiddenUl = createDomElement('ul');
    TaskUI.createLitagsFromSubtasks(subtasks, hiddenUl);

    hiddenForm.append(hiddenUl);

    hiddenPartWrapper.append(hiddenParagraph, hiddenForm);

    taskHiddenDiv.append(hiddenPartWrapper);

    /* EXPAND BUTTON */
    const taskExpandBtnWrapper = createDomElement('div', {
      className: 'expand-btn-wrapper',
    });

    const expandBtn = createDomElement('button', {
      textContent: 'Show more...',
      type: 'button',
      className: 'task-show-more-btn',
      onclick() {
        taskHiddenDiv.classList.toggle('active');
      },
    });

    taskExpandBtnWrapper.append(expandBtn);

    taskDiv.append(taskVisibleDiv, taskHiddenDiv, taskExpandBtnWrapper);

    taskWrapper.append(taskDiv);
  }

//   static deleteTask();
}
