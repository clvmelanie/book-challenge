angular.module('BookChallenge')
  .directive('rtgNavbarMenu', function() {
    return {
      scope: {},
      replace: true,
      restrict: 'E',
      templateUrl: 'components/navbar/rtg-navbar-menu.html',
      controllerAs: 'navbarCtrl'
    };
  });
