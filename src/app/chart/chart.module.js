import angular from 'angular';
import chartFactory from './factories/chart.factory';
import EnvironmentMetricsController from './controllers/environment-metrics.controller';
import trMetricsChart from './directives/metrics-chart.directive';

const app = angular.module('terraCloudApp.chart', [])
    .factory('chartFactory', chartFactory)
    .controller('EnvironmentMetricsController', EnvironmentMetricsController)
    .directive('trMetricsChart', trMetricsChart);

export default app.name;
