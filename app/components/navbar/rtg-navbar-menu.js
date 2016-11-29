angular.module('BookChallenge')
  .directive('rtgNavbarMenu', ['$cookies', '$location', 'envService', '$anchorScroll', function ($cookies, $location, envService, $anchorScroll) {
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
        console.log($cookies.getAll());

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

        scope.goToLogin = function () {
          // $location.hash('login-here');
          $anchorScroll();
        };

        scope.goToSignup = function () {
          // $location.hash('signup-here')
          $anchorScroll();
        };
      }
    };
  }]);
