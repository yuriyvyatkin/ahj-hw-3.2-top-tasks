export default class TasksRenderer {
  constructor(allTasks, pinnedTasks) {
    this.allTasks = allTasks;
    this.pinnedTasks = pinnedTasks;
  }

  render(todosHTML) {
    this.allTasks.textContent = '';
    this.allTasks.insertAdjacentHTML('beforeend', todosHTML.all);

    this.pinnedTasks.textContent = '';
    this.pinnedTasks.insertAdjacentHTML('beforeend', todosHTML.pinned);
  }
}
