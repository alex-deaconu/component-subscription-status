(function () {
  "use strict";

  angular.module("risevision.widget.common.subscription-status")
    .directive("appSubscriptionStatus", ["$templateCache", "subscriptionStatusService",
    "$document", "$compile",
      function ($templateCache, subscriptionStatusService, $document, $compile) {
      return {
        restrict: "AE",
        require: "?ngModel",
        scope: {
          productId: "@",
          productCode: "@",
          companyId: "@",
          productPrice: "@"
        },
        template: $templateCache.get("app-subscription-status-template.html"),
        link: function($scope, elm, attrs, ctrl) {
          var storeModalInitialized = false;

          $scope.subscriptionStatus = {"status": "N/A", "subscribed": false, "expiry": null};

          $scope.$watch("companyId", function() {
            checkSubscriptionStatus();
          });

          function checkSubscriptionStatus() {
            if ($scope.productCode && $scope.productId && $scope.companyId) {
              subscriptionStatusService.get($scope.productCode, $scope.companyId).then(function(subscriptionStatus) {
                if (subscriptionStatus) {
                  $scope.subscriptionStatus = subscriptionStatus;
                }
              },
              function () {
                // TODO: catch error here
              });
            }
          }

          if (ctrl) {
            $scope.$watch("subscriptionStatus", function(subscriptionStatus) {
              ctrl.$setViewValue(subscriptionStatus);
            });
          }

          var watch = $scope.$watch("showStoreModal", function(show) {
            if (show) {
              initStoreModal();

              watch();
            }
          });

          $scope.$on("store-dialog-save", function() {
            checkSubscriptionStatus();
          });

          function initStoreModal() {
            if (!storeModalInitialized) {
              var body = $document.find("body").eq(0);

              var angularDomEl = angular.element("<div store-modal></div>");
              angularDomEl.attr({
                "id": "store-modal",
                "animate": "animate",
                "show-store-modal": "showStoreModal",
                "company-id": "{{companyId}}",
                "product-id": "{{productId}}"
              });

              var modalDomEl = $compile(angularDomEl)($scope);
              body.append(modalDomEl);

              storeModalInitialized = true;
            }
          }
        }
      };
    }]);
}());