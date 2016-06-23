(function () {
    'use strict';

    angular
        .module('app.employees')
        .controller('EmployeesController', EmployeesController);

    /* @ngInject */
    function EmployeesController(logger, moment, employees) {
        var vm = this;
        vm.title = 'Employees';
        vm.employees = [];

        activate();

        function activate() {
            employees.getEmployees().then(function (data) {
                vm.employees = data;
                logger.info('Activated Employees View');
            },null,function (message) {
                logger.info(message);
            });

        }
    }
})();
