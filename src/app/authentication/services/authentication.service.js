/* @ngInject */
function authenticationService($http, apiBaseURL, localStorageService, $q, $location) {
    const self = this;

    /* public functions */
    self.authenticate = authenticate;
    self.getUser = getUser;
    self.isAthenticated = isAthenticated;
    self.logout = logout;

    ////////////

    function authenticate(credentials) {
        const deferred = $q.defer();

        credentials.clientCode = '132dsa654ewq321sad879ewq1'; // TODO remove auth

        $http.post(`${apiBaseURL}/login`, credentials)
            .then(({data}) => {
                localStorageService.set('token', data.token);
                localStorageService.set('user', data.username);
                deferred.resolve();
            }, deferred.reject);

        return deferred.promise;
    }

    function getUser() {
        const deferred = $q.defer();
        let user = localStorageService.get('user');

        if (user) {
            deferred.resolve(user);
        } else {
            $http.get(`${apiBaseURL}/client`)
                .then(response => {
                    localStorageService.set('user', response.data);
                    deferred.resolve(response.data);
                }, deferred.reject);
        }

        return deferred.promise;
    }

    function isAthenticated() {
        const deferred = $q.defer();



        if (localStorageService.get('token')) {
            deferred.resolve();
        } else {
            deferred.reject();
        }

        return deferred.promise;

        ////////////

        function registerToken(token) {
            if (token.value) {
                localStorageService.set('token', token.value);
                deferred.resolve(token.value);
            } else {
                deferred.reject();
            }
        }
    }

    function logout() {
        localStorageService.remove('token');
        localStorageService.remove('user');
        $location.path('/login');
    }
}

export default authenticationService;
