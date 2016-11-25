angular.module('BookChallenge', ['ngRoute', 'ngAnimate', 'ngCookies', 'environment'])
.config(function(envServiceProvider) {
  // set the domains and variables for each environment
  envServiceProvider.config({
    domains: {
      development: ['localhost'],
      production: ['pagetrekker.com']
    },
    vars: {
      development: {
        apiUrl: 'http://localhost:3000/'
      },
      production: {
        apiUrl: 'http://book-challenge-server.herokuapp.com/'
      }
    }
  });

  // run the environment check, so the comprobation is made
  // before controllers and services are built
  envServiceProvider.check();
})
.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
}]);
