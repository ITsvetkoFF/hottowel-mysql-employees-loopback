(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'HottowelMysqlEmployeesLoopback (HMEL)',
            description: 'HottowelMysqlEmployeesLoopback Project Generated from HotTowel Angular and Loopback. ' +
            'It uses Mysql seed Employees DB'
        };
        vm.employeeCount = 0;
        vm.deps = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getEmployeeCount(), getDepartments()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getEmployeeCount() {
            return dataservice.getEmployeeCount().then(function (data) {
                vm.employeeCount = data.count;
                return vm.employeeCount;
            });
        }

        function getDepartments() {
            return dataservice.getDepartments().then(function (data) {
                vm.depts = data;
                return vm.depts;
            });
        }
    }
})();
