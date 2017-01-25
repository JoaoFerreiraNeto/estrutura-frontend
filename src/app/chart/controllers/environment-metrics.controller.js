import Protocol from '../models/protocol';

class EnvironmentMetricsController {
    /* @ngInject */
    constructor($scope, environmentService) {
        const self = this;
        self.rules = [];

        self.addRule = addRule;
        self.removeRule = removeRule;
        self.applyRules = applyRules;

        environmentService.getFirewallRules($scope.environment)
            .then(function (response) {
                    if (response.data) response.data.forEach(rule => self.rules.push(new Protocol(rule.port)));
                }
            );

        function addRule() {
            if (self.rules[self.rules.length - 1].port) self.rules.push(new Protocol());
        }

        function removeRule(rule) {
            const index = self.rules.indexOf(rule);
            self.rules.splice(index, 1);
            if (self.rules.length === 0) self.rules.push(new Protocol());
        }

        function applyRules() {
            environmentService.updateFirewallRules($scope.environment, self.rules);
        }
    }
}

export default EnvironmentMetricsController;
