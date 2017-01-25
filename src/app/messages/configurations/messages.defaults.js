/* @ngInject */
function messagesDefaults(ngDialogProvider) {
    ngDialogProvider.setDefaults({
        closeByDocument: false,
        closeByNavigation: true,
        overlay: false,
        showClose: false,
    });
}

export default messagesDefaults;
