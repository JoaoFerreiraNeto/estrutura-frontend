/* @ngInject */
function environmentRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('environment', {
            url: '/environment',
            abstract: true,
            parent: 'home',
            template: '<ui-view/>'
        })
        .state('environment.creation', {
            url: '/creation',
            parent: 'environment',
            views: {
                '': {
                    templateUrl: './app/environment/views/environment-creation.html',
                    controller: 'EnvironmentCreationController as controller'
                },
                'distributions@environment.creation': {
                    templateUrl: './app/environment/views/environment-distributions.html',
                    controller: 'EnvironmentDistributionsController as controller'
                },
                'packages@environment.creation': {
                    templateUrl: './app/environment/views/environment-packages.html',
                    controller: 'EnvironmentPackagesController as controller'
                },
                'customization@environment.creation': {
                    templateUrl: './app/environment/views/environment-customization.html',
                    controller: 'EnvironmentCustomizationController as controller'
                },
                'identifier@environment.creation': {
                    templateUrl: './app/environment/views/environment-identifier.html'
                }
            }
        })
        .state('environment.list', {
            url: '/list',
            parent: 'environment',
            templateUrl: './app/environment/views/environment-list.html',
            controller: 'EnvironmentListController as controller'
        })
        .state('environment.billing', {
            url: '/billing',
            parent: 'environment',
            templateUrl: './app/environment/views/environment-billing.html',
            controller: 'EnvironmentBillingController as controller'
        });

    $urlRouterProvider.when('/environment', '/environment/list');
}

export default environmentRoutes;
