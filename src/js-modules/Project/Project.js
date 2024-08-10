export default class Project {
  static projectInstances = [];

  static addProjectInstace(instance) {
    Project.projectInstances.push(instance);
  }

  constructor(name) {
    this.name = name;
  }
}
