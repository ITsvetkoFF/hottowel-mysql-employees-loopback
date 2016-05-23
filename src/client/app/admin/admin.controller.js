(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController(logger, moment, dataservice) {
        var vm = this;
        vm.title = 'Admin';

        dataservice.getDepartments().then(function (data) {
            vm.depts = data;
            vm.selectedDept = vm.depts[0];

        });


        vm.showDeptStats = function () {
            dataservice.getDepartmentManagers(vm.selectedDept.deptNo).then(function (data) {
                vm.currentManagerData = data;
                vm.dates = transformDates(vm.currentManagerData);
            });
        }

        // [
        //     {
        //         "empNo": 110303,
        //         "deptNo": "d004",
        //         "fromDate": "1985-01-01T00:00:00.000Z",
        //         "toDate": "1988-09-09T00:00:00.000Z",
        //         "employees": {
        //             "empNo": 110303,
        //             "birthDate": "1956-06-08T00:00:00.000Z",
        //             "firstName": "Krassimir",
        //             "lastName": "Wegerle",
        //             "gender": "F",
        //             "hireDate": "1985-01-01T00:00:00.000Z"
        //         }
        //     },
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
        // ]

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
                }
            })
        }

        // vm.dates = [
        //     {
        //         label: "person a", times: [
        //         {"starting_time": 1345752800000, "ending_time": 1355759900000},
        //         {"starting_time": 1355767900000, "ending_time": 1355774400000}]
        //     },
        //     {
        //         label: "person b", times: [
        //         {"starting_time": 1355759910000, "ending_time": 1355761900000}]
        //     },
        //     {
        //         label: "person c", times: [
        //         {"starting_time": 1355761910000, "ending_time": 1355763910000}]
        //     }
        // ];

        vm.dates = [
            {
                label: 'Shirish Ossenbruggen',
                times: [
                    {
                        'starting_time': 473385600000,
                        'ending_time': 701136000000
                    }
                ]
            },
            {
                label: 'Karsten Sigstam',
                times: [
                    {
                        'starting_time': 701136000000,
                        'ending_time': 963960356679
                    }
                ]
            }
        ];

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
