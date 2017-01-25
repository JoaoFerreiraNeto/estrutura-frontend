import ConfirmationMessage from '../models/confirm-message';
import ErrorMessage from '../models/error-message';
import InfoMessage from '../models/info-message';
import WarnMessage from '../models/warn-message';

/* @ngInject */
function messageFactory($timeout, ngDialog) {
    const factory = {
        confirm: confirm,
        error: error,
        info: info,
        warn: warn
    };

    return factory;

    ////////////

    function confirm(message, onConfirmation) {
        return new ConfirmationMessage($timeout, ngDialog, message, onConfirmation);
    }

    function error(message) {
        return new ErrorMessage($timeout, ngDialog, message);
    }

    function info(message) {
        return new InfoMessage($timeout, ngDialog, message);
    }

    function warn(message) {
        return new WarnMessage($timeout, ngDialog, message);
    }
}

export default messageFactory;