angular.module('BookChallenge')
  .directive('rtgNavbarMenu', ['$cookies', '$location', 'envService', function ($cookies, $location, envService) {
    return {
      scope: {},
      replace: true,
      restrict: 'E',
      templateUrl: 'components/navbar/rtg-navbar-menu.html',
      link: function (scope, element, attrs) {
        if ($location.host().includes('pagetrekker.com')) {
          envService.set('production');
        }
        scope.loggedIn = !!$cookies.get('token');

        scope.mouseOver = function () {
          // $('#rtg-dropdown-menu').fadeIn();
          $('#rtg-dropdown-menu').stop();
          $('#rtg-dropdown-menu').fadeIn();
        };

        scope.mouseLeave = function () {
          // $('#rtg-dropdown-menu').fadeOut();
          $('#rtg-dropdown-menu').stop();
          $('#rtg-dropdown-menu').fadeOut();
        };

        scope.logOut = function () {
          $cookies.remove('token');
          scope.loggedIn = false;
        };

        scope.$on('loggedIn', function () {
          scope.loggedIn = true;
        });
      }
    };
  }]);
