class TodoCreatePage {
  constructor() {
    this.form = element(by.id('todo-form'));
    this.titleInput = element(by.id('item-title'));
    this.submitButton = element(by.id('submit'));
    this.linkToPage = element(by.id('link-to-create-page'));
  }

  open() {
    //Open the page via the link, then wait for Angular to be ready and for the list item to be present
    return this.linkToPage.click()
      .then(() => browser.waitForAngular())
      .then(() => browser.wait(EC.presenceOf(this.form), 1000));
  }

  createTodoItem(title) {
    return this.titleInput.clear()
      .then(() => this.titleInput.sendKeys(title))
      .then(() => this.submitButton.click());
  }
}

module.exports = new TodoCreatePage();