/* @ngInject */
function trRegisterSelection(analyticsService) {
    const directive = {
        link: link,
        restrict: 'A',
    };

    return directive;

    ////////////

    function link(scope, element, attrs) {
        element.click(register);

        function register() {
            analyticsService.registerSelectionOf(attrs.trRegisterSelection);
        }
    }
}

export default trRegisterSelection;