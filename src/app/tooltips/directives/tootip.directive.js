function trTooltip() {
    const directive = {
        link: link,
        restrict: 'EA',
    };

    return directive;

    //////////////////////

    function link(scope, element, attr) {
        element.tooltip({
            placement: 'top',
            title: attr.trTooltip
        });
    }
}

export default trTooltip;
