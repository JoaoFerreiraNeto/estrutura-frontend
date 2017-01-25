import _ from 'lodash';

class EnvironmentListController {
    /* @ngInject */
    constructor($scope, $timeout, $state, attemptFactory, environmentService, messageFactory, $filter, ngDialog) {
        const self = this;

        /* public methods */
        self.deleteEnvironment = deleteEnvironment;
        self.edit = edit;
        self.restart = restart;
        self.restore = restore;
        self.redirect = redirect;
        self.packages = {};

        attemptFactory.newAttempt(environmentService.getEnvironments).getResult().then(addOptionsToScope);

        $scope.$on('cloudEnv:downgrade', function (event, data) {
            collapseEditionPanel();
            messageFactory
                .info(`Seu ambiente será atualizado em ${$filter('date')(data.response.eventDate)}, aguarde...`);
        });

        $scope.$on('cloudEnv:upgrade', function (event, data) {
            collapseEditionPanel();
            updateEnvironment({cloudEnvId: data.cloudEnvId, status: 'UPDATING'});
        });

        ////////////

        function redirect(environments){
          if(environments.data.length === 0){
            $state.go('environment.creation');
          }
        }

        function addOptionsToScope(environments) {
            if (!self.environments) {
                redirect(environments);
                self.environments = environments.data;
            } else {
                environments.data.forEach(updateEnvironment);
            }
            $timeout(() => reloadPage(), 30000);
        }

        function collapseEditionPanel() {
            delete self.editing;
        }

        function deleteEnvironment(environment) {
            const onSuccess = info => messageFactory
                .info(`Seu ambiente será deletado em ${$filter('date')(info.data.eventDate)}, aguarde...`);
            const onError = error => messageFactory.error('Não foi possivel deletar o ambiente');

            messageFactory.confirm('Tem certeza que deseja deletar este ambiente?',
                () => environmentService.deleteEnvironment(environment).then(onSuccess, onError));
        }

        function edit(editing) {
            const imageId = editing.environment.imageId;

            if (!self.packages[imageId]) {
                environmentService.getPackages(imageId).then(
                    packages => {
                        self.packages[imageId] = packages.data;
                        selectEnvironment(editing);
                    },
                    error => messageFactory.error('Não foi possivel listar os pacotes disponíveis.')
                );
            } else {
                selectEnvironment(editing);
            }
        }

        function restart(environment) {
            const onSuccess = info => messageFactory.info('Seu ambiente será reiniciado, aguarde...');
            const onError = error => messageFactory.error('Não foi possivel reiniciar o ambiente');

            environmentService.restart(environment).then(onSuccess, onError);
        }

        function restore(environment) {
            const onSuccess = (response) =>
            {
                self.cloudEnv = response.data.cloudEnv;
                ngDialog.openConfirm({
                    scope: $scope,
                    template: './app/environment/views/environment-password-dialog.html',
                    className: 'ngdialog-password'
                }).then(() => messageFactory.info('Seu ambiente será restaurado, aguarde...'));
            };
            const onError = error => messageFactory.error('Não foi possivel restaurar o ambiente');

            messageFactory.confirm('Tem certeza que deseja restaurar este ambiente?',
                () => environmentService.restore(environment).then(onSuccess, onError));
        }

        function reloadPage() {
            attemptFactory.newAttempt(environmentService.getEnvironments).getResult().then(addOptionsToScope);
        }

        function selectEnvironment(editing) {
            if (self.editing &&
                self.editing.environment === editing.environment &&
                self.editing.action === editing.action) {
                collapseEditionPanel();
            } else {
                self.editing = editing;
            }
        }

        function updateEnvironment(environment) {
            const index = _.findIndex(self.environments, {'cloudEnvId': environment.cloudEnvId});
            if (self.environments[index]) Object.assign(self.environments[index], environment);
        }
    }
}

export default EnvironmentListController;
