class RetryMessageController {
    /* @ngInject */
    constructor(attempt) {
        const self = this;

        /* public property */
        self.attempt = attempt;
    }
}

export default RetryMessageController;
