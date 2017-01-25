function trEnvironmentEdition() {   
    const directive = {
        controller: 'EnvironmentEditionController',
        controllerAs: 'controller',
        restrict: 'EA',
        scope: {
            environment: '=',
            packages: '=',
            action: '@'
        },
        templateUrl: './app/environment/views/environment-edition.html',
        link: function (scope) {
            scope.actionAvailablePackages = [];
            scope.packages.forEach(function (pkg) {
                if (scope.action === 'upgrade') {
                    if (pkg.scale > scope.environment.packageScale) {
                        scope.actionAvailablePackages.push(pkg);
                    }
                } else if (scope.action === 'downgrade') {
                    if (pkg.scale < scope.environment.packageScale) {
                        scope.actionAvailablePackages.push(pkg);
                    }
                } else {
                    scope.actionAvailablePackages.push(pkg);
                }
            }, this);
        }
    };
    return directive;
}

export default trEnvironmentEdition;
