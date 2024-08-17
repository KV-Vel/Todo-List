export default class Form {
  static resetForm(formName, additionalResets) {
    formName.reset();
    if (additionalResets) {
      additionalResets();
    }
  }

  static #collectData = (form) => new FormData(form);

  static getCollectedData(form) {
    return Form.#collectData(form);
  }
}
