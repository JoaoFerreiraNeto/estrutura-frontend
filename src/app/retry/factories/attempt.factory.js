import Attempt from '../models/attempt';

/* @ngInject */
function attemptFactory($interval, $timeout, $q, ngDialog) {
    const attempt ={
        newAttempt: newAttempt
    };
    
    return attempt;

    ////////////

    function newAttempt(action) {
        return new Attempt(action, $interval, $timeout, $q, ngDialog);
    }
}

export default attemptFactory;