import Message from './message';

class WarnMessage extends Message {
    constructor($timeout, ngDialog, messageText) {
        super($timeout, ngDialog, 'atenção', messageText, true);
    }
}

export default WarnMessage;