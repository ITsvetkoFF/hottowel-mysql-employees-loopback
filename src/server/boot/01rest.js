module.exports = function (app) {
    var loopback = require('loopback');
    app.use('/api', loopback.rest());
    // app.use('/explorer', explorer(app, { basePath: '/api' }));
};
