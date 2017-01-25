class MessageController {
    /* @ngInject */
    constructor(message) {
        const self = this;

        /* public property */
        self.message = message;
    }
}

export default MessageController;
