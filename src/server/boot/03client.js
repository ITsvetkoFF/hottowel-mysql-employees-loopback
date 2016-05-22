module.exports = function (app) {
    var environment = process.env.NODE_ENV;
    var express = require('express');

    switch (environment) {
        case 'build':
            console.log('** BUILD **');
            app.use(express.static('./build/'));
            // Any deep link calls should return index.html
            app.use('/*', express.static('./build/index.html'));
            break;
        default:
            console.log('** DEV **');
            app.use(express.static('./src/client/'));
            app.use(express.static('./'));
            app.use(express.static('./tmp'));
            // Any deep link calls should return index.html
            app.use('/*', express.static('./src/client/index.html'));
            break;
    }
};
