import Task from './Task';

export default class Handlers {
  constructor(
    todos,
    tasksForm,
    taskInput,
    tasks,
    templateEngine,
    tasksRenderer,
  ) {
    this.todos = todos;
    this.tasksForm = tasksForm;
    this.taskInput = taskInput;
    this.tasks = tasks;
    this.templateEngine = templateEngine;
    this.tasksRenderer = tasksRenderer;
    this.timerId = null;
  }

  handleInput() {
    this.todos.push(new Task(this.todos.length, this.taskInput.value));

    this.tasksRenderer.render(this.templateEngine.getTodosHTML());

    this.taskInput.value = '';
  }

  filterTasks() {
    const callback = (todo) => todo.content.toLowerCase().startsWith(
      this.taskInput.value.toLowerCase(),
    )
      && todo.pinned === false;
    const filteredTodos = this.todos.filter(callback);
    this.tasksRenderer.render(this.templateEngine.getTodosHTML(filteredTodos));
  }

  assign() {
    this.tasksForm.onsubmit = (event) => {
      event.preventDefault();
    };

    this.taskInput.addEventListener('keyup', (event) => {
      if (this.timerId) {
        return;
      }

      if (this.tasksForm.lastElementChild.className === 'error') {
        this.tasksForm.lastElementChild.remove();
      }
      const { target } = event;
      if (event.key === 'Enter') {
        if (target.value === '' && !this.timerId) {
          target.insertAdjacentHTML(
            'afterend',
            '<p class="error">Error: Empty value!</p>',
          );
          this.timerId = setTimeout(() => {
            this.timerId = null;
            this.tasksForm.lastElementChild.remove();
          }, 2000);
          return;
        }
        this.handleInput();
      }
    });

    this.taskInput.addEventListener('input', (event) => {
      const { target } = event;
      if (target.value !== '') {
        this.filterTasks();
      } else {
        this.tasksRenderer.render(this.templateEngine.getTodosHTML());
      }
    });

    this.tasks.addEventListener('click', (event) => {
      const { target } = event;

      if (target.classList.contains('task__pin')) {
        const relatedID = +target.parentElement.id.split('#')[1];
        const relatedTodo = this.todos.find((todo) => todo.id === relatedID);
        if (target.textContent === '') {
          target.textContent = 'V';
          relatedTodo.pinned = true;
        } else {
          target.textContent = '';
          relatedTodo.pinned = false;
        }
        if (this.taskInput.value !== '') {
          this.filterTasks();
        } else {
          this.tasksRenderer.render(this.templateEngine.getTodosHTML());
        }
      }
    });
  }
}
