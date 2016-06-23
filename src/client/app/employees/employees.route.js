(function() {
    'use strict';

    angular
        .module('app.employees')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'employees',
                config: {
                    url: '/employees',
                    templateUrl: 'app/employees/employees.html',
                    controller: 'EmployeesController',
                    controllerAs: 'vmEmployees',
                    title: 'Employees',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-lock"></i> Employees'
                    }
                }
            }
        ];
    }
})();
