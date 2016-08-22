angular.module("CoffeeShop")

  .config(function($routeProvider){
    $routeProvider
      .when('/menu', {
        templateUrl: "components/menu/menu.html",
        controller: "MenuController"
      })
      .when('/about', {
        templateUrl: "components/about/about.html",
        controller: "AboutController"
      });
  });
