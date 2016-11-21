angular.module('BookChallenge', ['ngRoute', 'ngAnimate', 'ngCookies', 'environment'])
.config(function(envServiceProvider) {
  // set the domains and variables for each environment
  envServiceProvider.config({
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
});
