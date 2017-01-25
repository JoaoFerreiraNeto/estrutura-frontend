import _ from 'lodash';

class EnvironmentEditionController {
    /* @ngInject */
    constructor($scope, environmentService, messageFactory) {
        const self = this;
        const LBL_UPDATE = 'ATUALIZAR';
        const LBL_PROCESSING = 'PROCESSANDO...';

        /* public methods */
        self.setPackage = setPackage;
        self.update = update;
        self.btnUpdateLabel = LBL_UPDATE;

        init();

        ////////////

        function init() {
            const packageIndex = _.findIndex($scope.packages, { 'dsInstanceType': $scope.environment.dsPackage });
            if (packageIndex > -1) {
                self.package = $scope.packages[packageIndex];
                self.packages = _.filter($scope.packages,
                    envPackage => $scope.action === 'upgrade' ?
                        (envPackage.price >= self.package.price) :
                        (envPackage.price <= self.package.price)
                );
            } else {
                self.packages = $scope.packages;
            }
            checkBtnInstallDisabled();
            self.btnUpdateDisabled = true;
        }

        function setPackage(selected) {
            self.package = selected;
            checkBtnInstallDisabled();
        }

        function checkBtnInstallDisabled() {
            if (angular.isUndefined(self.package)) {
                self.btnUpdateDisabled = true;
            } else {
                self.btnUpdateDisabled = false;
            }
        }

        function update() {

            self.btnUpdateDisabled = true;
            self.btnUpdateLabel = LBL_PROCESSING;
            const onSuccess = function (response) {
                $scope.$emit(`cloudEnv:${$scope.action}`, {
                    cloudEnvId: $scope.environment.cloudEnvId,
                    response: response.data
                });
                self.btnUpdateDisabled = false;
            };

            const onError = function () {
                self.btnUpdateDisabled = false;
                self.btnUpdateLabel = LBL_UPDATE;
                messageFactory.error('Não foi possivel atualizar o ambiente');
            };

            if($scope.action === 'downgrade') {
                environmentService
                .downgradeEnvironment($scope.environment, self.package)
                .then(onSuccess, onError);
            } else if($scope.action === 'upgrade') {
                environmentService
                .upgradeEnvironment($scope.environment, self.package)
                .then(onSuccess, onError);
            }
            
        }
    }
}

export default EnvironmentEditionController;
