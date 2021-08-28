import TemplateEngine from './TemplateEngine';
import TasksRenderer from './TasksRenderer';
import Handlers from './Handlers';

const todos = [];
const tasksForm = document.body.querySelector('#tasks__form');
const taskInput = tasksForm.querySelector('#tasks__input');
const tasks = document.body.querySelector('#tasks');
const allTasks = tasks.querySelector('#all-tasks');
const pinnedTasks = tasks.querySelector('#pinned-tasks');
const templateEngine = new TemplateEngine(todos);
const tasksRenderer = new TasksRenderer(allTasks, pinnedTasks);
const handlers = new Handlers(
  todos,
  tasksForm,
  taskInput,
  tasks,
  templateEngine,
  tasksRenderer,
);

handlers.assign();
