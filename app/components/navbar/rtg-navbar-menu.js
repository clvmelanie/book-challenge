angular.module('BookChallenge')
  .directive('rtgNavbarMenu', function () {
    return {
      scope: {},
      replace: true,
      restrict: 'E',
      templateUrl: 'components/navbar/rtg-navbar-menu.html',
      link: function (scope, element, attrs) {
        // var delay = 300, setTimeoutConst;

        console.log(scope);
        scope.mouseOver = function () {
          // $('#rtg-dropdown-menu').slideDown();
          $('#rtg-dropdown-menu').stop();
          // setTimeoutConst = setTimeout(function(){
          $('#rtg-dropdown-menu').slideDown();
          // }, delay);
        }
        scope.mouseLeave = function () {
          // console.log('dropDown');
          // $('#rtg-dropdown-menu').slideUp();
          // clearTimeout(setTimeoutConst);
          $('#rtg-dropdown-menu').stop();
          $('#rtg-dropdown-menu').slideUp();
        }
      }
    };
  });
