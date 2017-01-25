class Message {
    constructor($timeout, ngDialog, type, text, autoClose, template, onConfirmation, controller) {
        const self = this;

        /* public methods */
        self.close = close;

        ////////////

        const dialog = ngDialog.open({
            controller: controller || 'MessageController as controller',
            resolve: {message: messageFactory},
            template: template || './app/messages/views/info-messages.html',
            preCloseCallback: function (confirm) {
                if (confirm) onConfirmation();
            },
            overlay: onConfirmation ? true : false
        });
        if (autoClose) {
            $timeout(function () {
                ngDialog.close(dialog.id);
            }, 15000);
        }

        function close() {
            ngDialog.close(dialog.id);
        }

        function messageFactory() {
            return {type, text};
        }
    }
}

export default Message;