export class TodoService {
  constructor($q) {
    'ngInject';
    this.$q = $q;
    this.list = [];
  }

  addTodo(item) {
    this.list.push(item);
  }

  getTodoList() {
    return this.$q.resolve(this.list);
  }
}