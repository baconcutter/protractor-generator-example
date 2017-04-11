describe('todo test', function () {
  const todoListPage = require('../page-objects/todo-list.page.po');
  const todoCreatePage = require('../page-objects/todo-create.page.po');

  beforeEach(() => {
    browser.get('/');
  });

  it('should create a todo item', function*() {
    //Check that number of items is 0 to begin with.
    yield todoListPage.open();
    expect(yield todoListPage.getNumberOfItems()).toBe(0);

    //Add
    yield todoCreatePage.open();
    yield todoCreatePage.createTodoItem('test');
    yield todoListPage.open();

    //number of todos should now be 1
    expect(yield todoListPage.getNumberOfItems()).toBe(1);
  });
});