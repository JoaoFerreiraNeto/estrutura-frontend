/* @ngInject */
function homeRoutes($stateProvider) {
    $stateProvider
        .state('home', {
            templateUrl: './app/home/views/main.html',
            controller: 'HomeAuthenticationController as controller'
        });
}

export default homeRoutes;
