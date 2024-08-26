import './css/reset-css.css';
import './css/style.css';
// import './js-modules/UI/UI';
// import './js-modules/UI/domManipulation';
// import './js-modules/Form/Form-UI';
// import Task from './js-modules/create-task';s

import Controller from './js-modules/Controller/Controller';
import Project from './js-modules/Logic/projectLogic';
import Task from './js-modules/Logic/taskLogic';
import View from './js-modules/View/View';

const controller = new Controller(new Task(), new Project(), new View());
controller.initDefault();
