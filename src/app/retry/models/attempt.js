import angular from 'angular';
import RetryMessage from '../models/retry-message';

class Attempt {
    constructor(action, $interval, $timeout, $q, ngDialog) {
        const deferred = $q.defer(),
            self = this;
        let counter,
            fails = 0,
            message,
            timer;

        /* public properties */
        self.countdown = 0;

        /* public methods */
        self.getResult = getResult;
        self.retry = retry;

        retry();

        ////////////
        
        function fail(error) {
            message = new RetryMessage(ngDialog, self);
            if (fails < 6) {
                self.status = 'retrying';
                deferred.notify(`retry (${fails}x)`);
                fails++;
                toAttempt(fails * 10000);
            } else {
                self.status = 'failed';
            }
        }

        function getResult() {
            return deferred.promise;
        }

        function retry() {
            toAttempt(0);
        }

        function startCountdown(delay) {
            stopCountdown();
            self.countdown = delay / 1000;
            counter = $interval(function () {
                if (self.countdown > 0) {
                    self.countdown = self.countdown - 1;
                } else {
                    stopCountdown();
                }
            }, 1000);
        }

        function stopCountdown() {
            if (angular.isDefined(counter)) {
                $interval.cancel(counter);
                counter = undefined;
            }
        }

        function success(result) {
            self.status = 'success';
            if(message) message.close();
            deferred.resolve(result);
        }

        function toAttempt(delay) {
            startCountdown(delay);
            if (angular.isDefined(timer)) {
                $timeout.cancel(timer);
            }
            timer = $timeout(() => action().then(success, fail), delay);
        }
    }
}

export default Attempt;