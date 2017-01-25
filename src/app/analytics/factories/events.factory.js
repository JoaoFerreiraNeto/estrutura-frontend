import _ from 'lodash';

/* @ngInject */
function eventsFactory($log) {
    const events = {
        CREATE_ENVIRONMENT: {id: 20},
        DELETE_ENVIRONMENT: {id: 22},
        ENVIRONMENT_BILLING_SCREEN: {id: 2},
        ENVIRONMENT_CREATION_SCREEN: {id: 3},
        ENVIRONMENT_LIST_SCREEN: {id: 1},
        SELECTED_BANDWIDTH_1000_GB_S: {id: 16},
        SELECTED_BANDWIDTH_1100_GB_S: {id: 17},
        SELECTED_BANDWIDTH_1500_GB_S: {id: 18},
        SELECTED_BANDWIDTH_2000_GB_S: {id: 19},
        SELECTED_DISTRO_AMAZON_LINUX_2016_03_3: {id: 4},
        SELECTED_DISTRO_RED_HAT_7_2: {id: 5},
        SELECTED_DISTRO_SUSE_12: {id: 6},
        SELECTED_DISTRO_UBUNTU_14_04: {id: 7},
        SELECTED_DOWNGRADE_SCREEN: {id: 23},
        SELECTED_METRICS_SCREEN: {id: 24},
        SELECTED_PACKAGE_TERRA_MICRO: {id: 10},
        SELECTED_PACKAGE_TERRA_MICRO_2: {id: 9},
        SELECTED_PACKAGE_TERRA_NANO: {id: 8},
        SELECTED_PACKAGE_TERRA_SMALL: {id: 11},
        SELECTED_STORAGE_10_GB: {id: 12},
        SELECTED_STORAGE_15_GB: {id: 13},
        SELECTED_STORAGE_17_GB: {id: 14},
        SELECTED_STORAGE_20_GB: {id: 15},
        SELECTED_UPGRADE_SCREEN: {id: 25},
        UPDATE_ENVIRONMENT: {id: 21}
    };
    const factory = {
        fromEnvironmentProperty: fromEnvironmentProperty,
        fromState: fromState
    };

    return factory;

    ////////////

    function fromEnvironmentProperty(environmentProperty) {
        const eventKey = `SELECTED_${_.snakeCase(environmentProperty).toUpperCase()}`;
        const event = events[eventKey];
        if(!event) $log.warn(`Event for ${environmentProperty} was not found!`);
        return event;
    }

    function fromState(state) {
        const eventKey = `${_.snakeCase(state).toUpperCase()}_SCREEN`;
        const event = events[eventKey];
        if(!event) $log.warn(`Event for ${state} was not found!`);
        return event;
    }
}

export default eventsFactory;