export class CreateController {
  constructor($state, todoService) {
    'ngInject';
    this.$state = $state;
    this.todoService = todoService;
  }

  save(item) {
    console.log(item);
    this.todoService.addTodo(item);
    this.$state.go('todo.list');
  }
}