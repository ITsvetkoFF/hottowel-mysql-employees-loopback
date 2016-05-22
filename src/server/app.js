var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web client is at: %s', baseUrl);

        // app.use('/explorer', explorer(app, {basePath: '/api'}));
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
            console.log('Your REST API url is %s%s', baseUrl, '/api');
        }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) {
        throw err;
    }

    // start the server if `$ node server.js`
    if (require.main === module) {
        app.start();
    }
});
