/* jshint -W117, -W030 */
describe('DashboardController', function() {
    var controller;
    var people = mockData.getMockPeople();

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getPeople').returns($q.when(people));
        controller = $controller('DashboardController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Dashboard controller', function() {
        xit('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            xit('should have title of Dashboard', function () {
                expect(controller.title).to.equal('Dashboard');
            });

            xit('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });

            xit('should have news', function () {
                expect(controller.news).to.not.be.empty;
            });

            xit('should have at least 1 person', function () {
                expect(controller.depts).to.have.length.above(0);
            });
        });
    });
});
