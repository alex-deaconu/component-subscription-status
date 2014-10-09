/* jshint expr: true */

(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  describe("App Subscription Status Component", function() {
    beforeEach(function (){
      browser.get("/test/e2e/ng-app-subscription-status-scenarios.html");
    });

    it("Should show the default subscription status", function (done) {
      expect(element(by.css("#app-subscription-status .subscribe strong")).isPresent()).
        to.equal.true;

      expect(element(by.css("#app-subscription-status .subscribe strong")).getText()).
        to.eventually.equal("Get a Subscription");
    });

    it("Should show a valid subscription status", function (done) {
      element(by.id("setValid")).click();

      expect(element(by.css("#app-subscription-status .subscribe strong")).getText()).
        to.eventually.equal("Continue To App");
    });

    it("Should show an invalid subscription status", function (done) {
      element(by.id("setInvalid")).click();

      expect(element(by.css("#app-subscription-status .subscribe strong")).getText()).
        to.eventually.equal("Get a Subscription");
    });

    it("Should show an expired subscription status", function (done) {
      element(by.id("setExpired")).click();

      expect(element(by.css("#app-subscription-status .subscribe strong")).getText()).
        to.eventually.equal("Get a Subscription");
    });

  });

})();
