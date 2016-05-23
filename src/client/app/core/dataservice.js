(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getDepartments: getDepartments,
            getDepartmentManagers: getDepartmentManagers,
            getEmployees: getEmployees,
            getEmployeeById: getEmployeeById,
            getEmployeeCount: getEmployeeCount
        };

        return service;

        function getEmployeeCount() {
            return $http.get('api/Employees/count').then(success).catch(fail);
        }

        function getDepartments() {
            return $http.get('/api/Departments').then(success).catch(fail);
        }

        function getDepartmentManagers(deptNo) {
            return $http.get('api/DeptManagers',
                {params: {filter: {where: {deptNo: deptNo}, include: 'employees'}}})
                .then(success).catch(fail);
        }

        function getEmployees(offset, limit) {
            return $http.get('/api/Employees?filter[limit]=' + limit + '&filter[offset]=' + offset)
                .then(success).catch(fail);
        }

        function getEmployeeById(id) {
            return $http.get('/api/Employees/' + id)
                .then(success).catch(fail);
        }

        function success(response) {
            return response.data;
        }

        function fail(e) {
            return exception.catcher('XHR Failed')(e);
        }
    }
})();
