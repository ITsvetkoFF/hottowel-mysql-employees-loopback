/* global toastr:false, moment:false, d3:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('d3', d3);
})();
