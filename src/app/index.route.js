
export function indexRoute($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('todo', {
      url: '/todo',
      abstract: '.list',
      template: '<div ui-view></div>'
    })
    .state('todo.list', {
      url: '/',
      controller: 'listController',
      controllerAs: '$ctrl',
      template: require('./pages/list/list.html')
    })
    .state('todo.create', {
      url: '/create',
      controller: 'createController',
      controllerAs: '$ctrl',
      template: require('./pages/create/create.html')
    });

  $urlRouterProvider
    .otherwise(($injector) => {
      const $state = $injector.get('$state');
      $state.go('todo.list', {}, {location: 'replace'});
    });
}