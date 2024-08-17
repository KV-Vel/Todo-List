import Form from '../Form/Form';
// import Project from '../Project/Project';

export function createDomElement(tag, properties) {
  const el = document.createElement(tag);
  for (const key in properties) {
    el[key] = properties[key];
  }
  return el;
}

export default class UI {
  static setSectionHeaderFromAttribute(elem, dataAttributeName) {
    const sectionHeader = document.querySelector('.section-header');
    sectionHeader.textContent = elem.getAttribute(`${dataAttributeName}`);
  }

  // NAV
  static selectTabByAttribute(dataAttributeName, dataValue) {
    const tab = document.querySelector(`[${dataAttributeName}="${dataValue}"]`);
    tab.classList.add('active');
    UI.setSectionHeaderFromAttribute(tab, dataAttributeName);
  }

  static deleteAllSubtasksAutomatically() {
    // removing subtasks
    const subtasks = document.querySelectorAll('.subtask');
    subtasks.forEach((subtask) => subtask.remove());
  }

  // static updateUI() {
  //   UI.#addNewOption();
  // }

  static removeFoundActiveStyle() {
    const [...navigation] = document.querySelectorAll('.navigation'); // This method should be private
    navigation.find((elem) => elem.classList.contains('active')).classList.remove('active');
  }
}
