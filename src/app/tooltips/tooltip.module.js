import angular from 'angular';
import trTooltip from './directives/tootip.directive';

const app = angular.module('terraCloudApp.tooltip', [])
    .directive('trTooltip', trTooltip);

export default app.name;
