export default class Form {
  static clearInput(input) {
    input = '';
    return input;
  }

  static resetFormFields = (formName) => formName.reset();

  static collectData = (form) => new FormData(form);
}
