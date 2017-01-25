/* @ngInject */
function trMetricsChart(chartFactory, environmentService) {
    const directive = {
        controller: 'EnvironmentMetricsController',
        controllerAs: 'controller',
        link: link,
        restrict: 'EA',
        scope: {environment: '='},
        templateUrl: './app/chart/views/chart.html'
    };

    return directive;

    //////////////////////

    function link(scope, element) {
        environmentService.getMetrics(scope.environment)
            .then(response => {
                chartFactory.cpu(element.find('#cpu'), response.data.metrics);
                chartFactory.memory(element.find('#memory'), response.data.metrics);
                chartFactory.storage(element.find('#storage'), response.data.metrics);
            });
    }
}

export default trMetricsChart;
