// import { createDomElement } from '../UI/UI';

// export default class ProjectUI {
//   static createProjectUI(projectData) {
//     const projectsList = document.querySelector('.projects-list');

//     const newProjectLi = createDomElement('li', {
//       textContent: `#${projectData}`,
//       className: 'navigation navigation-li-proj',
//     });
//     newProjectLi.setAttribute('data-name', `${projectData}`);

//     const deleteProjectButton = createDomElement('button', {
//       className: 'delete-project-btn',
//     });

//     const deleteProjectIcon = createDomElement('i', {
//       className: 'fa-solid fa-trash-can',
//     });

//     deleteProjectButton.append(deleteProjectIcon);

//     newProjectLi.append(deleteProjectButton);

//     projectsList.append(newProjectLi);
//   }
// }
