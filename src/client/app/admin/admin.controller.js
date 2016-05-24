(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController(logger, moment, dataservice, d3) {
        var vm = this;
        vm.title = 'Admin';
        vm.dates = [];

        vm.showDeptStats = function () {
            dataservice.getDepartmentManagers(vm.selectedDept.deptNo).then(function (data) {
                vm.currentManagerData = data;
                vm.dates = transformDates(vm.currentManagerData);
            });
        };


        //     {
        //         "empNo": 110420,
        //         "deptNo": "d004",
        //         "fromDate": "1996-08-30T00:00:00.000Z",
        //         "toDate": "9999-01-01T00:00:00.000Z",
        //         "employees": {
        //             "empNo": 110420,
        //             "birthDate": "1963-07-27T00:00:00.000Z",
        //             "firstName": "Oscar",
        //             "lastName": "Ghazalie",
        //             "gender": "M",
        //             "hireDate": "1992-02-05T00:00:00.000Z"
        //         }
        //     }

        function transformDates(data) {
            return data.map(function (el) {
                return {
                    label: el.employees.firstName + ' ' + el.employees.lastName,
                    times: [
                        {
                            'starting_time': moment(el.fromDate).valueOf(),
                            'ending_time': d3.min([moment(el.toDate).valueOf(), Date.now()])
                        }
                    ]
                };
            });
        }

        activate();

        function activate() {
            dataservice.getDepartments().then(function (data) {
                vm.depts = data;
                vm.selectedDept = vm.depts[0];
                vm.showDeptStats();
            });
            logger.info('Activated Admin View');
        }
    }
})();
