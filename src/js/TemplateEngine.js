export default class TemplateEngine {
  constructor(todos) {
    this.todos = todos;
  }

  getTodosHTML(filteredTodos = null) {
    let all = '';
    let pinned = '';
    let mainCallback = (todo) => {
      if (todo.pinned) {
        pinned += `
          <div class="task" id="task#${todo.id}">
            <div class="task__title">
              ${todo.content}
            </div>
            <a href="#" class="task__pin">V</a>
          </div>
        `;
      } else {
        all += `
          <div class="task" id="task#${todo.id}">
            <div class="task__title">
              ${todo.content}
            </div>
            <a href="#" class="task__pin"></a>
          </div>
        `;
      }
    };
    const modifiedCallback = (todo) => {
      if (todo.pinned) {
        pinned += `
          <div class="task" id="task#${todo.id}">
            <div class="task__title">
              ${todo.content}
            </div>
            <a href="#" class="task__pin">V</a>
          </div>
        `;
      }
    };

    if (filteredTodos) {
      if (filteredTodos.length) {
        filteredTodos.forEach((filteredTodo) => {
          all += `
          <div class="task" id="task#${filteredTodo.id}">
            <div class="task__title">
              ${filteredTodo.content}
            </div>
            <a href="#" class="task__pin"></a>
          </div>
        `;
        });
      } else {
        all = '<p class="warning">No tasks found</p>';
      }
      mainCallback = modifiedCallback;
    }

    this.todos.forEach(mainCallback);

    if (pinned === '') {
      pinned = '<p class="warning">No pinned tasks</p>';
    }

    return {
      all,
      pinned,
    };
  }
}
