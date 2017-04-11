export class ListController {
  constructor($state, todoService) {
    'ngInject';
    this.$state = $state;

    todoService.getTodoList()
      .then(list => this.list = list);
  }

  createTodo(){
    this.$state.go('todo.create');
  }
}