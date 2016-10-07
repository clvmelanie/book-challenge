angular.module("BookChallenge")

  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: "components/home/home.html",
        controller: "HomeController"
      })
      .when('/profile', {
        templateUrl: "components/profile/profile.html",
        controller: "ProfileController"
      })
      .otherwise({redirectTo:'/'});
  });
