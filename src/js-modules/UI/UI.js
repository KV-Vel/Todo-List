import Task from '../Task/Task';

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

  static createTask(taskData) {

  }
}
