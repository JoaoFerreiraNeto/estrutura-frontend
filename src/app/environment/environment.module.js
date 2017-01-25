import angular from 'angular';
import 'ng-dialog';
import chartModule from '../chart/chart.module';
import homeModule from '../home/home.module';
import messagesModule from '../messages/messages.module';
import retryModule from '../retry/retry.module';
import environmentRoutes from './configurations/environment.routes';
import EnvironmentBillingController from './controllers/environment-billing.controller';
import EnvironmentCreationController from './controllers/environment-creation.controller';
import EnvironmentCustomizationController from './controllers/environment-customization.controller';
import EnvironmentDistributionsController from './controllers/environment-distributions.controller';
import EnvironmentEditionController from './controllers/environment-edition.controller';
import EnvironmentListController from './controllers/environment-list.controller';
import EnvironmentPackagesController from './controllers/environment-packages.controller';
import trEnvironmentEdition from './directives/environment-edition.directive';
import trTabsNavbar from './directives/tabs-navbar.directive';
import environmentService from './services/environment.service';

const environmentModule = angular.module('terraCloudApp.environment', [
    'ngDialog',
    chartModule,
    homeModule,
    messagesModule,
    retryModule
])
    .config(environmentRoutes)
    .service('environmentService', environmentService)
    .controller('EnvironmentBillingController', EnvironmentBillingController)
    .controller('EnvironmentCreationController', EnvironmentCreationController)
    .controller('EnvironmentCustomizationController', EnvironmentCustomizationController, 
        ['$location', '$anchorScroll'])
    .controller('EnvironmentDistributionsController', EnvironmentDistributionsController)
    .controller('EnvironmentEditionController', EnvironmentEditionController)
    .controller('EnvironmentListController', EnvironmentListController)
    .controller('EnvironmentPackagesController', EnvironmentPackagesController)
    .directive('trEnvironmentEdition', trEnvironmentEdition)
    .directive('trTabsNavbar', trTabsNavbar);

export default environmentModule.name;
