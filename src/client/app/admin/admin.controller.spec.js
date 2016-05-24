/* jshint -W117, -W030 */
describe('AdminController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.admin');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('AdminController');
        $rootScope.$apply();
    });

    // bard.verifyNoOutstandingHttpRequests();

    describe('Admin controller', function() {
        xit('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            xit('should have title of Admin', function() {
                expect(controller.title).to.equal('Admin');
            });

            xit('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
