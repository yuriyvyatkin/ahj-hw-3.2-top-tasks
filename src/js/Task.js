export default class Task {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.pinned = false;
  }
}
