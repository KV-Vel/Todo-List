export default class Project {
  static #projects = [{ name: 'Home', id: '123' }];

  static addProjectInstance(project) {
    Project.#projects.push(project);
  }

  constructor(name) {
    this.name = name;
    this.id = String(Date.now());
  }

  getProjects() {
    return Project.#projects;
  }

  createProject(formData) {
    const newProject = new Project(formData);
    Project.#projects.push(newProject);
  }

  deleteProject(id) {
    Project.#projects = Project.#projects.filter((proj) => proj.id !== id);
  }

  editProject(id, newName) {
    const matchedProject = Project.#projects.find((proj) => proj.id === id);
    matchedProject.name = newName;
  }
}
