export default class UI {
  static createDomElement(tag, properties) {
    const el = document.createElement(tag);
    for (const key in properties) {
      el[key] = properties[key];
    }
    return el;
  }

  static addEventListener(domEl, eventType, callBack) {
    domEl.addEventListener(eventType, callBack);
  }

  static getPriorityColor(priority) {
    switch (priority) {
      case '1':
        return 'red';
      case '2':
        return 'yellow';
      case '3':
        return 'green';
      default:
        return 'red';
    }
  }

  static createLitagsFromSubtasks(subtasks, elementToAppend) {
    for (let subtaskNumber = 0; subtaskNumber < subtasks.length; subtaskNumber += 1) {
      const li = this.createDomElement('li');
      const liInput = this.createDomElement('input', {
        type: 'checkbox',
        id: `subtask${subtaskNumber}`,
      });
      const liLabel = this.createDomElement('label', {
        textContent: subtasks[subtaskNumber],
        for: `subtask${subtaskNumber}`,
      });
      li.append(liInput, liLabel);
      elementToAppend.append(li);
    }
  }

  static createTask(title, description, deadline, priority, subtasks) {
    const taskWrapper = document.querySelector('.tasks-wrapper-main');

    const taskDiv = this.createDomElement('div', {
      className: 'task',
    });

    /* VISIBLE PART OF TASK */
    const taskVisibleDiv = this.createDomElement('div', {
      className: 'visible-part',
    });

    const taskInnerTaskWrapper = this.createDomElement('div', {
      className: 'task-wrapper',
    });

    const taskHeader = this.createDomElement('h3', {
      textContent: title,
    });
    const taskDueDate = this.createDomElement('span', {
      textContent: deadline,
    });
    const taskPriority = this.createDomElement('span', {
      textContent: 'Priority: ',
    });
    const taskPriorityMarker = this.createDomElement('i', {
      className: `fa-solid fa-circle ${this.getPriorityColor(priority)}`,
    });

    taskPriority.append(taskPriorityMarker);
    taskInnerTaskWrapper.append(taskHeader, taskDueDate, taskPriority);

    const taskWrapperButtons = this.createDomElement('div', {
      className: 'task-wrapper-buttons',
    });

    const taskCheckProjectBtn = this.createDomElement('button', {
      type: 'button',
      className: 'project-btn check-project-btn',
    });
    const checkProjectBtnIcon = this.createDomElement('i', {
      className: 'fa-solid fa-square-check',
    });
    taskCheckProjectBtn.append(checkProjectBtnIcon);

    const taskChangeProjectBtn = this.createDomElement('button', {
      type: 'button',
      className: 'project-btn change-project-btn',
    });
    const changeProjectBtnIcon = this.createDomElement('i', {
      className: 'fa-solid fa-square-pen',
    });
    taskChangeProjectBtn.append(changeProjectBtnIcon);

    const taskDeleteProjectBtn = this.createDomElement('button', {
      type: 'button',
      className: 'project-btn delete-project-btn',
    });
    const deleteProjectBtnIcon = this.createDomElement('i', {
      className: 'fa-solid fa-rectangle-xmark',
    });
    taskDeleteProjectBtn.append(deleteProjectBtnIcon);

    taskWrapperButtons.append(taskCheckProjectBtn, taskChangeProjectBtn, taskDeleteProjectBtn);

    taskVisibleDiv.append(taskInnerTaskWrapper, taskWrapperButtons);

    /* HIDDEN PART OF TASK */
    const taskHiddenDiv = this.createDomElement('div', {
      className: 'hidden-part',
    });

    const hiddenPartWrapper = this.createDomElement('div', {
      className: 'hidden-part-wrapper',
    });

    const hiddenParagraph = this.createDomElement('p', {
      textContent: description,
    });

    const hiddenForm = this.createDomElement('form');
    const hiddenUl = this.createDomElement('ul');
    this.createLitagsFromSubtasks(subtasks, hiddenUl);

    hiddenForm.append(hiddenUl);

    hiddenPartWrapper.append(hiddenParagraph, hiddenForm);

    taskHiddenDiv.append(hiddenPartWrapper);

    /* EXPAND BUTTON */
    const taskExpandBtnWrapper = this.createDomElement('div', {
      className: 'expand-btn-wrapper',
    });

    const expandBtn = this.createDomElement('button', {
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

  static createProject(projectData) {
    const projectsList = document.querySelector('.projects-list');

    const newProject = this.createDomElement('li', {
      textContent: `#${projectData}`,
    });

    projectsList.append(newProject);
  }

  static renderActiveLi(e) {
    const sectionHeader = document.querySelector('.section-header');
    sectionHeader.textContent = e.target.getAttribute('data-name');
  }
}

/** Передалть в баттоны
 * сделать функцию чтобы задать активный раздел по загрузке старницы
 * при создании проекта или таска также должен передаваться тэг
 * активной страницы, т.к. на нем будут создаваться задачи */
