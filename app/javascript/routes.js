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
      .when('/list', {
        templateUrl: "components/list/list.html",
        controller: "ListController"
      })
      .when('/account', {
        templateUrl: "components/account/account.html",
        controller: "AccountController"
      })
      .otherwise({redirectTo:'/'});
  });
