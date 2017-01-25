import Message from './message';

class ConfirmationMessage extends Message {
    constructor($timeout, ngDialog, messageText, onConfirmation) {
        super($timeout,
            ngDialog,
            'atenção',
            messageText,
            false,
            './app/messages/views/confirm-messages.html',
            onConfirmation);
    }
}

export default ConfirmationMessage;