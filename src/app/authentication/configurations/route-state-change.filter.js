/* @ngInject */
function routeStateChangeFilter($location, $rootScope, $state, authenticationService) {
    $rootScope.$on('$stateChangeStart', stateChangeFilter);

    function stateChangeFilter(event, toState) {
        authenticationService.isAthenticated().then(redirectToMainPage, redirectToLogin);

        ////////////

        function redirectToMainPage() {
            if (toState.name === 'authentication') {
                event.preventDefault();
                $location.path('/');
            }
        }

        function redirectToLogin() {
            if (toState.name !== 'authentication') {
                event.preventDefault();
                $state.go('authentication');
            }
        }
    }
}

export default routeStateChangeFilter;
