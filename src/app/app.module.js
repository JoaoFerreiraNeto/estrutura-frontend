import angular from 'angular';
import 'angular-ui-router';
import analyticsModule from './analytics/analytics.module';
import authenticationModule from './authentication/authentication.module';
import chartModule from './chart/chart.module';
import appRoutes from './configurations/app.routes';
import environmentModule from './environment/environment.module';
import i18nModule from './i18n/i18n.module';
import tooltipModule from './tooltips/tooltip.module';

const app = angular.module('terraCloudApp', [
    'ui.router',
    analyticsModule,
    authenticationModule,
    chartModule,
    environmentModule,
    i18nModule,
    tooltipModule,
])
    // TODO: add constants by environment profile (build or qa)
    .config(appRoutes);
       app.constant('apiBaseURL', 'http://terra-cloud-service-qa.us-east-1.elasticbeanstalk.com/cloud');
       app.constant('analyticsBaseURL', 'http://analytics-service.us-east-1.elasticbeanstalk.com/analytics');

angular
    .element(document)
    .ready(()=> angular.bootstrap(document, [app.name]));

export default app.name;
