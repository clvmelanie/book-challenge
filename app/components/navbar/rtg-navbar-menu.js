angular.module('BookChallenge')
  .directive('rtgNavbarMenu', function () {
    return {
      scope: {},
      replace: true,
      restrict: 'E',
      templateUrl: 'components/navbar/rtg-navbar-menu.html',
      link: function (scope, element, attrs) {

        console.log(scope);
        scope.mouseOver = function () {
          // $('#rtg-dropdown-menu').fadeIn();
          $('#rtg-dropdown-menu').stop();
          $('#rtg-dropdown-menu').fadeIn();

        }
        scope.mouseLeave = function () {
          // $('#rtg-dropdown-menu').fadeOut();
          $('#rtg-dropdown-menu').stop();
          $('#rtg-dropdown-menu').fadeOut();
        }
      }
    };
  });
