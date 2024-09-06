export default (function Storage() {
  const initLocalStorage = () => {
    if (!localStorage.getItem('tasks') || !localStorage.getItem('projects')) {
      localStorage.setItem('tasks', JSON.stringify([{
        title: 'Demo', description: "Hello, i'm demo task", deadline: '2024-08-30', projectID: '123', priority: 'red', subtasks: [{ subtaskName: 'Demo subtask 1', isChecked: false }, { subtaskName: 'Demo subtask 2', isChecked: false }], id: '987', isCompleted: false,
      }]));
      localStorage.setItem('projects', JSON.stringify([{ name: 'Home', id: '123' }]));
    }
  };

  return {
    initLocalStorage,
  };
}());
