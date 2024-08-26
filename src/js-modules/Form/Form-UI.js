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

    select.append(placeHolderOption);
  }

  static updateOptionList(listOfProjects) {
    this.#deleteAllOptions();
    this.#createDefaultOptionList();
    this.#createNewOption(listOfProjects);
  }

  // static deleteSubtaskUI(e) {
  //   const clickedSubtask = e.target.parentNode.parentNode;
  //   if (e.target.classList.contains('fa-xmark')) {
  //     clickedSubtask.remove();
  //   }
  // }
}
