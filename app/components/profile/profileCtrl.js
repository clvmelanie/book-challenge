angular.module('BookChallenge')
.controller('ProfileController', ['$http', '$scope', '$window', '$timeout', '$cookies', function($http, $scope, $window, $timeout, $cookies){

  $scope.mapCountries = AmCharts.maps.worldLow.svg.g.path;
  $scope.bookList = [];
  $scope.selectedBook = false;
  $scope.slideDown = false;

  $scope.submit = function() {
    var searchTerm = "";
    searchTerm = document.getElementById("book-search-box").value;

    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes',
      dataType: 'json',
      headers: {
          "Content-Type": "application/json"
      },
      params: {
        q: {
          title: searchTerm
        }
      }
    }).then(function (response) {
      if (!!response && !!response.data && !!response.data.items) {
        $scope.slideDown = !$scope.slideDown;
        $timeout(function () {
          $scope.bookList = [];
          for (var i = 0; i < response.data.items.length; i++) {
            var volumeInfo = response.data.items[i].volumeInfo;
            var author = !!volumeInfo.authors ? volumeInfo.authors[0] : '';
            $scope.bookList.push({
              author: author,
              description: volumeInfo.description,
              pageCount: volumeInfo.pageCount,
              title: volumeInfo.title,
              thumbnailImage: volumeInfo.imageLinks.thumbnail
            });
          }
        }, 50);
      }
    }, function (response) {
      console.log('Got an error!', response);
    });

    };

    $scope.toggleSelectedBook = function () {
      $scope.selectedBook = !$scope.selectedBook;
    };

    var map = AmCharts.makeChart("chartdiv", {
      "type": "map",
      "theme": "light",
      "projection": "miller",
      "dataProvider": {
        "map": "worldLow",
        "getAreasFromMap": true,
      },
      "areasSettings": {
        "autoZoom": false,
        "color": "#b3b3b3",
        "outlineThickness": "2",
        "rollOverColor": "#5FBA73",
        "selectable": false,
        "balloonText": "[[title]]",
        "selectedColor": "#5FBA73"
      },
      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });


    $scope.userObj = {
      booksRead: [],
      email: "",
      profilePic: ""
    };

    $http({
      method: 'GET',
      url: 'http://localhost:3000/books',
      dataType: 'json',
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + $cookies.get('token')
      }
    })
    .then(
      function(response){
        $scope.userObj.booksRead = response.data.books_read;
        console.log($scope.userObj)
        $scope.highlightCountries();
      },
      function(response){
        console.log(response);
      }
    );

    $scope.johnTest = function (book) {
      $scope.selectedBook = book;
    };

    $scope.highlightCountries = function () {// Colors in countries the user has read from
      for(var i = 0; i < map.dataProvider.areas.length; i++) {
        for(var j = 0; j < $scope.userObj.booksRead.length; j++) {
          if(map.dataProvider.areas[i].id === $scope.userObj.booksRead[j].country) {
            map.dataProvider.areas[i].showAsSelected = true;
            map.returnInitialColor(map.dataProvider.areas[i]);
          };
        };
      };
    };

    $scope.chooseCountry = function(){
      for (var i = 0; i < map.dataProvider.areas.length; i++){
        if(document.getElementById("country-choice-menu").value === map.dataProvider.areas[i].title){
        

          $scope.userObj.booksRead.push(
            {
              title: $scope.selectedBook.title,
              country: map.dataProvider.areas[i].id,
              pages: $scope.selectedBook.pageCount
            }
          );

          $http({
            method: 'POST',
            url: 'http://localhost:3000/books/',
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + $cookies.get('token')
            },
            data: {books_read: $scope.userObj.booksRead}
          })
          .then(
             function(response){
               console.log(response);
             },
             function(response){
               console.log(response);
             }
           );
           map.dataProvider.areas[i].showAsSelected = true;
           map.returnInitialColor(map.dataProvider.areas[i]);
        };
      };
    };
}]);
