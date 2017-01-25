class Message {
    constructor(ngDialog, attempt) {
        const self = this;

        /* public methods */
        self.close = close;

        ////////////

        const dialog = ngDialog.open({
            controller: 'RetryMessageController as controller',
            resolve: {attempt: attemptFactory},
            template: './app/retry/views/retry.html',
            closeByDocument: false,
            closeByNavigation: true,
            overlay: false,
            showClose: false,
            closeByEscape: false
        });

        function close() {
            ngDialog.close(dialog.id);
        }

        function attemptFactory() {
            return attempt;
        }
    }
}

export default Message;