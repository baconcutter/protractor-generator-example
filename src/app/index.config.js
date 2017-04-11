export function indexConfig($locationProvider, $logProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $logProvider.debugEnabled(true);
}

