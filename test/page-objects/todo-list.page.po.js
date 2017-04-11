class TodoListPage {
  constructor() {
    this.list = element(by.id('todo-list'));
    this.linkToPage = element(by.id('link-to-list-page'));
  }

  open() {
    //Open the page via the link, then wait for Angular to be ready and for the list item to be present
    return this.linkToPage.click()
      .then(() => browser.waitForAngular())
      .then(() => browser.wait(EC.presenceOf(this.list), 1000));
  }

  //This returns a promise which will be resolved with the number of li elements
  getNumberOfItems() {
    return this.list
      .all(by.css('li'))
      .count();
  }
}

module.exports = new TodoListPage();