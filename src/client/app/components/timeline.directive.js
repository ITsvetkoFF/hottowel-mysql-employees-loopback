(function () {
    'use strict';

    angular
        .module('app')
        .component('htTimeline', htTimeline());

    /* @ngInject */
    function htTimeline() {
        var cdo = {
            controller: HtTimelineController,
            bindings: {
                data: '<'
            },
            template: '<div id="deptTimeline"></div>'
        };
        return cdo;
        /* @ngInject */
        function HtTimelineController(d3) {

            var ctrl = this;
            var data = [];

            var width = 600;
            var height = 200;

            var chart = d3.timeline()
                .width(width)
                .showTimeAxis()
                .stack()
                .margin({left: 120, right: 30, top: 0, bottom: 0})
                .labelFormat(function (label) {
                    return label;
                });

            function drawGraph() {
                d3.select('#deptTimeline')
                    .selectAll('*').remove();

                d3.select('#deptTimeline')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .datum(ctrl.data).call(chart);
            }

            this.$onChanges = drawGraph;

            // Object.defineProperty(this, 'data', {
            //     get: function () {
            //         return data;
            //     },
            //
            //     set: function (newVal) {
            //         data = newVal;
            //     }
            // });

        }
    }
})();
