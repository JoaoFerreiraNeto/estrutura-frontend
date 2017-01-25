class EnvironmentCreationController {
    /* @ngInject */
    constructor($scope, $rootScope, $q, $state, $filter, attemptFactory, environmentService, messageFactory, ngDialog) {
        const self = this;
        const MAX_ENVIRONMENTS = 5;
        const LBL_INSTALL = 'INSTALAR';
        const LBL_PROCESSING = 'PROCESSANDO...';
        let maxEnvironmentReached = false;

        /* public properties */
        $scope.environment = { selected: {} };
        $scope.environment.voucher = {};
        self.btnInstallLabel = LBL_INSTALL;

        /* public methods */
        self.install = install;
        self.applyVoucher = applyVoucher;
        self.checkBtnInstallDisabled = checkBtnInstallDisabled;

        attemptFactory.newAttempt(loadEnvironmentOptions).getResult().then(addOptionsToScope);

        function addOptionsToScope([environments, distributions, storages, bandwidths]) {
            if (angular.isArray(environments.data)) {
                const statusFilter = ['COMPLETE', 'UPDATING', 'CREATING'];
                const filterByStatus = function (env) {
                    return statusFilter.indexOf(env.status) !== -1;
                };
                const activeEnvs = $filter('filter')(environments.data, filterByStatus);
                if (activeEnvs.length >= MAX_ENVIRONMENTS) {
                    maxEnvironmentReached = true;
                    messageFactory.info('O cliente atingiu o número máximo de ambientes ' +
                        '(' + MAX_ENVIRONMENTS + '). Por favor, entrar em contato com o ' +
                        'suporte do Terra caso haja a necessidade de criar mais ambientes.');
                }
            }
            $scope.environment.distributions = distributions.data;
            $scope.environment.storages = storages.data;
            $scope.environment.bandwidths = bandwidths.data;

            checkBtnInstallDisabled();
        }

        function checkBtnInstallDisabled() {
            if (maxEnvironmentReached ||
                angular.isUndefined($scope.environment.selected.package) ||
                angular.isUndefined($scope.environment.selected.environmentName)) {
                self.btnInstallDisabled = true;
            } else {
                self.btnInstallDisabled = false;
            }
        }

        function install() {
            if (!maxEnvironmentReached) {
                self.btnInstallDisabled = true;
                self.btnInstallLabel = LBL_PROCESSING;

                const onSuccess = function (response) {
                    self.cloudEnv = response.data;
                     ngDialog.openConfirm({
                        scope: $scope,
                        template: './app/environment/views/environment-password-dialog.html',
                        className: 'ngdialog-password'
                    }).then(() => $state.go('environment.list'));
                };

                const onError = function (error) {
                    self.btnInstallDisabled = false;
                    self.btnInstallLabel = LBL_INSTALL;
                    if (error.status == 406) {
                        messageFactory.error('Não foi possível criar o ambiente, pagamento não aprovado.');
                    } else {
                        messageFactory.error('Não foi possível criar o ambiente.');
                    }
                };

                environmentService.createEnvironment(
                    $scope.environment.selected.environmentName,
                    $scope.environment.selected.distribution,
                    $scope.environment.selected.package,
                    $scope.environment.selected.storage,
                    $scope.environment.selected.bandwidth,
                    $scope.environment.voucher.voucher
                ).then(onSuccess, onError);
            }
        }

        function loadEnvironmentOptions() {
            return $q.all([
                environmentService.getEnvironments(),
                environmentService.getDistroLinux(),
                environmentService.getStorages(),
                environmentService.getBandwidths()
            ]);
        }

        // function setDefaults() {
        //     $scope.environment.selected.distribution = $scope.environment.distributions[0];
        //     $scope.environment.selected.package = $scope.environment.packages[0];
        // }

        function applyVoucher() {
            environmentService.getVoucher(
                $scope.environment
            ).then(onSuccess, onError);

            function onSuccess(response) {

                $scope.environment.voucher = response.data;
            }

            function onError() {
                messageFactory.error('Não foi possivel aplicar o cupom de desconto.');
            }
        }
    }
}

export default EnvironmentCreationController;
