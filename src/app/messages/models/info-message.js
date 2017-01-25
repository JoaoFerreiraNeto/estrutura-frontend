import Message from './message';

class InfoMessage extends Message {
    constructor($timeout, ngDialog, messageText) {
        super($timeout, ngDialog, 'informação', messageText, true);
    }
}

export default InfoMessage;