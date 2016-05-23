(function () {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[HMEL Error] ',
        appTitle: 'HottowelMysqlEmployeesLoopback'
    };

    core.value('config', config);
    
    
    // Add configuration to delete global libraries 
    core.config(removeGlobalsConfig);
    
    function removeGlobalsConfig() {
        delete window.toastr;
        // delete window.d3; 
        delete window.moment;
    }
    
    
    // Add Toastr configuration
    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    
    // Add app configuration
    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }

})();
