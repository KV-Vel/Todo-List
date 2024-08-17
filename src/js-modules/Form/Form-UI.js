import { createDomElement } from '../UI/UI';

export default class FormUI {
  static clearInput(input) {
    input = '';
    return input;
  }

  static #createNewOption(listOfProjects) {
    for (let projNumber = 0; projNumber < listOfProjects.length; projNumber += 1) {
      const select = document.querySelector('select');
      const option = createDomElement('option', {
        textContent: `${listOfProjects[projNumber].name}`,
      });
      select.append(option);
    }
  }

  static #deleteAllOptions() {
    const allOptions = document.querySelectorAll('option');
    allOptions.forEach((option) => option.remove());
  }

  static #createDefaultOptionList() {
    const select = document.querySelector('select');
    const placeHolderOption = createDomElement('option', {
      value: '',
      disabled: true,
      selected: true,
      textContent: 'Select project',
    });
    const home = createDomElement('option', { // Carefull with this one if you want to be able to delete it in the future
      textContent: 'Home',
    });

    select.append(placeHolderOption, home);
  }

  static updateOptionList(listOfProjects) {
    this.#deleteAllOptions();
    this.#createDefaultOptionList();
    this.#createNewOption(listOfProjects);
  }

  static createSubTaskUI() {
    const subTaskGroup = document.querySelector('.subtask-group');
    const subtaskTextArea = document.querySelector('.subtask-textarea');

    const subtaskDiv = createDomElement('div', {
      className: 'subtask',
    });

    const subtaskPara = createDomElement('input', {
      value: `${subtaskTextArea.value}`,
      type: 'text',
      name: 'subtask',
    });

    const deleteSubtaskBtn = createDomElement('button', {
      type: 'button',
    });

    const crossIcon = createDomElement('i', {
      className: 'fa-solid fa-xmark',
    });

    deleteSubtaskBtn.append(crossIcon);

    subtaskDiv.append(subtaskPara, deleteSubtaskBtn);

    subTaskGroup.append(subtaskDiv);

    /* Clear subtask input field after adding */
    subtaskTextArea.value = FormUI.clearInput(subtaskTextArea); // remove to diff place
  }

  static deleteSubtaskUI(e) {
    const clickedSubtask = e.target.parentNode.parentNode;
    if (e.target.classList.contains('fa-xmark')) {
      clickedSubtask.remove();
    }
  }
}
