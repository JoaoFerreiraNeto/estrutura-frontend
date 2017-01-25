class EnvironmentCustomizationController {
    /* @ngInject */
    constructor($scope, $location, $anchorScroll) {
        const self = this;

        /* public method */
        self.setStorage = setStorage;
        self.setBandwidth = setBandwidth;

        ////////////

        $scope.gotoBottom = function() {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('sidebar-bottom');

            // call $anchorScroll()
            $anchorScroll();
        };

        function setBandwidth(selected) {
            if ($scope.environment.selected.bandwidth === selected) {
                delete $scope.environment.selected.bandwidth;
            } else {
                $scope.environment.selected.bandwidth = selected;
            }

            setTimeout(function() {
                $scope.gotoBottom(); 
            }, 0);
        }

        function setStorage(selected) {
            if ($scope.environment.selected.storage === selected) {
                delete $scope.environment.selected.storage;
            } else {
                $scope.environment.selected.storage = selected;
            }

            setTimeout(function() {
                $scope.gotoBottom(); 
            }, 0);
        }
    }
}

export default EnvironmentCustomizationController;
