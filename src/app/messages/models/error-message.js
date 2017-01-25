import Message from './message';

class ErrorMessage extends Message {
    constructor($timeout, ngDialog, messageText) {
        super($timeout, ngDialog, 'erro', messageText, true, './app/messages/views/error-messages.html');
    }
}

export default ErrorMessage;