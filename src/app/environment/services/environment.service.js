/* @ngInject */
function environmentService($http, apiBaseURL) {
    const self = this;

    /* public functions */
    /* jshint ignore:start */
    self.createEnvironment = createEnvironment;
    self.deleteEnvironment = deleteEnvironment;
    self.getDistributions = getDistributions;
    self.getPackages = getPackages;
    self.getStorages = getStorages;
    self.getBandwidths = getBandwidths;
    self.getEnvironments = getEnvironments;
    self.getFirewallRules = getFirewallRules;
    self.getMetrics = getMetrics;
    self.getBillings = getBillings;
    self.getEnvironment = getEnvironment;
    self.updateEnvironment = updateEnvironment;
    self.updateFirewallRules = updateFirewallRules;
    self.restart = restart;
    self.restore = restore;
    self.getVoucher = getVoucher;
    self.getDistroLinux = getDistroLinux;
    self.getDistroWindows = getDistroWindows;
    self.getAllPackages = getAllPackages;
    self.upgradeEnvironment = upgradeEnvironment;
    self.downgradeEnvironment = downgradeEnvironment;
    /* jshint ignore:end */
    ////////////

    function createEnvironment(name, distribution, envPackage, storage, bandwidth, voucher) {
        return $http.post(`${apiBaseURL}/environments`, {
            envName: name,
            imageId: distribution.id,
            packageId: envPackage.id,
            storageId: storage ? storage.id : null,
            bandwidthId: bandwidth ? bandwidth.id : null,
            voucher: voucher
        });
    }

    function deleteEnvironment(environment) {
        return $http.delete(`${apiBaseURL}/environments/${environment.cloudEnvId}`);
    }

    function getDistributions() {
        return $http.get(`${apiBaseURL}/images`);
    }

    function getPackages(data) {
        return $http.get(`${apiBaseURL}/packages/image/${data}`);
    }

    function getAllPackages() {
        return $http.get(`${apiBaseURL}/packages/`);
    }

    function getStorages() {
        return $http.get(`${apiBaseURL}/storages`);
    }

    function getBandwidths() {
        return $http.get(`${apiBaseURL}/bandwidths`);
    }

    function getEnvironments() {
        return $http.get(`${apiBaseURL}/environments`);
    }

    function getEnvironment(environmentId) {
        return $http.get(`${apiBaseURL}/environments/${environmentId}`);
    }

    function getFirewallRules(environment) {
        return $http.get(`${apiBaseURL}/environments/${environment.cloudEnvId}/firewalls`);
    }

    function getMetrics(environment) {
        return $http.get(`${apiBaseURL}/environments/${environment.cloudEnvId}/metrics`);
    }

    function updateEnvironment(environment, envPackage) {
        return $http.put(`${apiBaseURL}/environments/${environment.cloudEnvId}`,
           {packageId: envPackage.id});
    }

    function upgradeEnvironment(environment, envPackage) {
        return $http.put(`${apiBaseURL}/environments/${environment.cloudEnvId}/UPGRADE`,
           {packageId: envPackage.id});
    }

    function downgradeEnvironment(environment, envPackage) {
        return $http.put(`${apiBaseURL}/environments/${environment.cloudEnvId}/DOWNGRADE`,
           {packageId: envPackage.id});
    }

    function updateFirewallRules(environment, rules) {
        return $http.post(`${apiBaseURL}/environments/${environment.cloudEnvId}/firewalls`, rules);
    }

    function getBillings(activeMonth) {
        return $http.get(`${apiBaseURL}/environments/billing/month/${activeMonth}`);
    }

    function restart(environment) {
        return $http.post(`${apiBaseURL}/environments/${environment.cloudEnvId}/restart`);
    }

    function restore(environment) {
        return $http.post(`${apiBaseURL}/environments/${environment.cloudEnvId}/restore`);
    }

    function getVoucher(environment) {
        return $http.get(`${apiBaseURL}/voucher/${environment.voucher.voucher}`);
    }

    function getDistroLinux() {
        return $http.get(`${apiBaseURL}/images/distro/LINUX`);
    }

    function getDistroWindows() {
        return $http.get(`${apiBaseURL}/images/distro/WINDOWS`);
    }

}

export default environmentService;
