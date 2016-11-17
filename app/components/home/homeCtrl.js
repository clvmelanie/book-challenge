angular.module('BookChallenge')
  .controller('HomeController', ['$scope', '$rootScope', '$http', '$cookies' , '$window', function($scope, $rootScope, $http, $cookies, $window){
    $scope.email = '';
    $scope.password = '';
    $scope.confirmPassword = '';

    var diplayMap = AmCharts.makeChart("displayMap", {
      "type": "map",
      "theme": "light",
      "projection": "miller",
      "dataProvider": {
        "map": "worldLow",
        "getAreasFromMap": true,
      },
      "areasSettings": {
        "alpha": 1,
        "autoZoom": false,
        "color": "#b3b3b3",
        "outlineThickness": "2",
        "rollOverColor": "#FE621D",
        "selectable": true,
        "balloonText": "[[title]][[customData]]",
        "selectedColor": "#FE621D"
      },
      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    $scope.signUp = function () {
      $http.post('http://localhost:3000/register', {email: $scope.email, password: $scope.password})
      .then(
        function(response){
          $cookies.put('token', response.data.auth_token);
          $window.location.href = "/#/profile";
          $rootScope.$broadcast('loggedIn');
        },
        function(response){
          console.log(response);
        }
      );
    };
  }]);
