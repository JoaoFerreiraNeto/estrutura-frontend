/* @ngInject */
function authenticationRoutes($stateProvider) {
    $stateProvider
        .state('authentication', {
          url: '/login',
          templateUrl: './app/authentication/views/authentication.html',
          controller: 'AuthenticationController as controller'
        });
}

export default authenticationRoutes;
