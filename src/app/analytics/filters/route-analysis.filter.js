/* @ngInject */
function routeAnalysisFilter($rootScope, analyticsService) {
    $rootScope.$on('$stateChangeSuccess', routeFilter);

    function routeFilter(event, toState) {
        analyticsService.registerStateChangeTo(toState.name);
    }
}

export default routeAnalysisFilter;
