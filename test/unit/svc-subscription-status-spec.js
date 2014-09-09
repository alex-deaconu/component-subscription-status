/*jshint expr:true */
"use strict";

describe("Services: subscriptionStatusService", function() {

  var $httpBackend;

  beforeEach(module("risevision.widget.common.subscription-status.service"));

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get("$httpBackend");
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should exist", function(done) {
    inject(function(subscriptionStatusService) {
      expect(subscriptionStatusService).be.defined;
      done();
    });
  });

  it("get function should exist", function(done) {
    inject(function(subscriptionStatusService) {
      expect(subscriptionStatusService.get).be.defined;

      done();
    });
  });

  it("should return a promise", function(done) {
    inject(function(subscriptionStatusService) {
      expect(subscriptionStatusService.get("1", "12345")).eventually.be.defined;
      done();
    });
  });

  it("should fetch subscription status", function(done) {
    inject(function(subscriptionStatusService) {

      $httpBackend.whenGET("https://store-dot-rvaserver2.appspot.com/v1/company/12345/product/status?pc=1").respond(200, {data: ["test"]});
      subscriptionStatusService.get("1", "12345").then(function(data){
        expect(data).be.defined;
        done();
      });
      $httpBackend.flush();
    });
  });

});
