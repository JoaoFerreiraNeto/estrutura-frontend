class EnvironmentPackagesController {
    /* @ngInject */
    constructor($scope, $rootScope) {
        const self = this;

        /* public method */
        self.setPackage = setPackage;
        ////////////

        function setPackage(selected) {
            $scope.environment.selected.package = selected;
        }
    }
}

export default EnvironmentPackagesController;
