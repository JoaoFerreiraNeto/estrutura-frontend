class EnvironmentBillingController {
    /* @ngInject */
    constructor($scope, environmentService, messageFactory) {
        const self = this;
        self.months = [
            {name:'Janeiro', id:1},
            {name:'Fevereiro', id:2},
            {name:'Março', id:3},
            {name:'Abril', id:4},
            {name:'Maio', id:5},
            {name:'Junho', id:6},
            {name:'Julho', id:7},
            {name:'Agosto', id:8},
            {name:'Setembro', id:9},
            {name:'Outubro', id:10},
            {name:'Novembro', id:11},
            {name:'Dezembro', id:12}
        ];

        self.setActiveMonth = function(monthId) {
            self.activeMonth = monthId;

            environmentService.getBillings(self.activeMonth).then(onSuccess, onError);

            function onSuccess(response) {
                self.billings = response.data;

                self.billingTotal = 0;

                for(let i = 0; i < response.data.length; i++){
                    self.billingTotal += parseFloat(response.data[i].price);
                }
            }

            function onError(error) {
                self.billings = null;
                self.billingTotal = 0;
                messageFactory.error('Não foi possivel encontrar informações referente ao mês selecionado');
            }
        };

        self.setActualMonth = function(){
            const today = new Date();
            self.setActiveMonth(today.getMonth()+1);    
        };
    }
}

export default EnvironmentBillingController;
