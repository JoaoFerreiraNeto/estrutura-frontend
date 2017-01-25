class AuthenticationController {
    /* @ngInject */
    constructor($location, $state, authenticationService) {
        const self = this;

        /* public property */
        self.credentials = {};

        /* public method */
        self.login = login;

        ////////////

        function login() {
            const onSuccess = () => $location.path('/');
            const onError = () => $state.go('authentication', {error: 'Authentication Failed'}, {reload: true});
            authenticationService
                .authenticate(self.credentials)
                .then(onSuccess, onError);
        }

    }
}

export default AuthenticationController;
