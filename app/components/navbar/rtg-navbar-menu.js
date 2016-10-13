angular.module('BookChallenge')
  .directive('rtgNavbarMenu', function () {
    return {
      scope: {},
      replace: true,
      restrict: 'E',
      templateUrl: 'components/navbar/rtg-navbar-menu.html',
      link: function (scope, element, attrs) {
        var delay = 300, setTimeoutConst;

        // Shows a dropdown menu on mouseover of profile image after delay of .3 seconds
        $('.rtg-profile-picture').mouseover(function() {
          setTimeoutConst = setTimeout(function(){
            $('#rtg-dropdown-menu').slideDown();
          }, delay);
        });

        $('.rtg-profile-picture').mouseleave( function() {
          clearTimeout(setTimeoutConst);
            $('#rtg-dropdown-menu').slideUp();
        });
      }
    };
  });
