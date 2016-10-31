angular.module('BookChallenge')
  .controller('HomeController', ['$scope', '$http', '$cookies' , '$window', function($scope, $http, $cookies, $window){
    $scope.email = '';
    $scope.password = '';
    $scope.confirmPassword = '';

    $scope.signUp = function () {
      $http.post('http://localhost:3000/register', {email: $scope.email, password: $scope.password})
      .then(
        function(response){
          $cookies.put('token', response.data.auth_token);
          $window.location.href = "/#/profile";
        },
        function(response){
          console.log(response);
        }
      );
    };
  }]);
