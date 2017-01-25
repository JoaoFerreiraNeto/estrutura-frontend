/* @ngInject */
function analyticsService($http, analyticsBaseURL, authenticationService, eventsFactory) {
    const self = this;

    /* public functions */
    self.registerSelectionOf = registerSelectionOf;
    self.registerStateChangeTo = registerStateChangeTo;

    ////////////

    function registerEvent(event) {
        return authenticationService.getUser()
            .then(user => $http.post(`${analyticsBaseURL}/events/${event.id}/user/${user.id}`));
    }

    function registerSelectionOf(environmentProperty) {
        const event = eventsFactory.fromEnvironmentProperty(environmentProperty);
        return registerEvent(event);
    }

    function registerStateChangeTo(state) {
        const event = eventsFactory.fromState(state);
        return registerEvent(event);
    }
}

export default analyticsService;
