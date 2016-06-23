(function (angular) {
    'use strict';
    angular.module('app.employees')
        .factory('employees', Factory);

    function Factory($http, $q, API_URL) {
        return {
            getEmployees: getEmployees
        };

        function getEmployeesChunk(limit, offset) {
            return $http.get(API_URL.EMPLOYEES, {
                params: {
                    filter: {
                        limit: limit,
                        offset: offset
                    }
                }
            }).then(function (response) {
                return response.data;
            });
        }

        function getEmployees() {
            var employees = [];

            var deferred = $q.defer();

            var offset = 0;
            var limit = 10;

            while (offset < 1000) {
                (function (offset, limit) {
                    getEmployeesChunk(limit, offset).then(function (data) {
                        employees = employees.concat(data);
                        if (offset === 990) {
                            deferred.resolve(employees);
                        }
                        deferred.notify('uploaded: ' + (offset + limit) / limit);
                    });
                })(offset, limit);
                offset += limit;
            }

            return deferred.promise;

        }
    }
})(angular);
