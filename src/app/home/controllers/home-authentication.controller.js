class HomeAuthenticationController {
  /* @ngInject */
  constructor(authenticationService, $rootScope) {
      const self = this;

      /* public property */
      $rootScope.credentials = {};

      /* public functions */
      self.logout = logout;

      authenticationService.getUser().then(data => $rootScope.credentials = data);

      ////////////

      function logout() {
          authenticationService.logout();
      }
  }
}

export default HomeAuthenticationController;
