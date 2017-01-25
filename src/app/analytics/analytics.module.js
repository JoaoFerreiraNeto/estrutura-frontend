import angular from 'angular';
import 'angular-ui-router';
import authenticationModule from '../authentication/authentication.module';
import trRegisterSelection from './directives/register-selection.directive';
import eventsFactory from './factories/events.factory';
import routeAnalysisFilter from './filters/route-analysis.filter';
import analyticsService from './services/analytics.service';

const analyticsModule = angular.module('terraCloudApp.analytics', ['ui.router', authenticationModule])
    .factory('eventsFactory', eventsFactory)
    .service('analyticsService', analyticsService)
    .directive('trRegisterSelection', trRegisterSelection)
    .run(routeAnalysisFilter);

export default analyticsModule.name;