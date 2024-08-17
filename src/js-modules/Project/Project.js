import ProjectUI from './Project-UI';

export default class Project {
  static #projectInstances = [];

  static getAllProjects() {
    return Project.#projectInstances;
  }

  static addProjectInstance(instance) {
    this.#projectInstances.push(instance);
  }

  static createProject(formData) {
    const newProject = new Project(...formData.getAll('project-name'));
    Project.addProjectInstance(newProject);
    ProjectUI.createProjectUI(newProject.name);
  }

  static deleteProject(deletingProjectName) {
    this.#projectInstances.forEach((project, projectIndex) => {
      if (project.name === deletingProjectName) {
        this.#projectInstances.splice(projectIndex, 1);
      }
      console.log(Project.getAllProjects());
    });
  }

  constructor(name) {
    this.name = name;
  }
}
