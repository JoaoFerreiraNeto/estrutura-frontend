class EnvironmentDistributionsController {
    /* @ngInject */
    constructor($scope, $rootScope, environmentService, messageFactory) {
        const self = this;

        /* public method */
        self.setDistribution = setDistribution;
        self.getDistroLinux = getDistroLinux;
        self.getDistroWindows = getDistroWindows;
        self.setSelectedNull = setSelectedNull;
        getDistroLinux();
        ////////////

        function setDistribution(selected) {
            $scope.environment.selected.distribution = selected;
            $rootScope.showPackages = true;

            environmentService.getPackages($scope.environment.selected.distribution.id)
              .then(onSuccess, onError);

            function onSuccess(response) {
              $scope.environment.packages = response.data;
            }

            function onError(error) {
                $scope.environment.packages = null;
                messageFactory.error('Não foi possivel encontrar distribuições Linux');
            }
        }

        function getDistroLinux(){
          environmentService.getDistroLinux(
            $scope.environment
          ).then(onSuccess, onError);
          $rootScope.showPackages = false;
          function onSuccess(response) {
            $scope.environment.distributions = response.data;
            setSelectedNull();
          }

          function onError(error) {
              messageFactory.error('Não foi possivel encontrar distribuições Linux');
          }
        }

        function getDistroWindows(){
          environmentService.getDistroWindows(
            $scope.environment
          ).then(onSuccess, onError);
          $rootScope.showPackages = false;
          function onSuccess(response) {
            $scope.environment.distributions = response.data;
            setSelectedNull();
          }

          function onError(error) {
              messageFactory.error('Não foi possivel encontrar distribuições Windows');
          }
        }

        function setSelectedNull(){
          $scope.environment.selected.distribution = null;
          $scope.environment.selected.package = null;
        }
    }
}

export default EnvironmentDistributionsController;
