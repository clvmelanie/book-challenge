angular.module('BookChallenge')
.controller('ProfileController', ['$http', '$scope', '$window', '$timeout', '$cookies', 'envService', function($http, $scope, $window, $timeout, $cookies, envService){

  $scope.mapCountries = AmCharts.maps.worldLow.svg.g.path;
  $scope.bookList = [];
  $scope.selectedBook = false;
  $scope.slideDown = false;
  $scope.searchBookTitles = '';

  // When search submit button is clicked, gets requested book data
  // and on success slides the search area down to list results
  $scope.submit = function() {
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes',
      dataType: 'json',
      headers: {
          "Content-Type": "application/json"
      },
      params: {
        q: {
          title: $scope.searchBookTitles
        }
      }
    }).then(function (response) {
      if (!!response && !!response.data && !!response.data.items) {
        $scope.slideDown = true;
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
              thumbnailImage: volumeInfo.imageLinks.thumbnail,
              addClicked: false
            });
          }
        }, 50);
      }
    }, function (response) {
      console.log('Got an error!', response);
    });

    };

    // Slides search results up when X button is clicked
    $scope.closeSearch = function(){
      $scope.searchBookTitles = '';
    };

    $scope.toggleSelectedBook = function(book) {
      book.addClicked = !book.addClicked;
    };

    var map = AmCharts.makeChart("chartdiv", {
      "type": "map",
      "theme": "light",
      "projection": "miller",
      "dataProvider": {
        "map": "worldLow",
        "getAreasFromMap": true
      },
      "areasSettings": {
        "alpha": 1,
        "autoZoom": false,
        "color": "#b3b3b3",
        "outlineThickness": "2",
        "rollOverColor": "#b3b3b3",
        "selectable": false,
        "balloonText": "[[title]][[customData]]",
        "selectedColor": "#FE621D"
      },
      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    // Restricts area of info balloon on hover so it isn't cut off
    map.balloon.setBounds(75,50,1200,1000);

    // Disables map control buttons
    map.zoomControl = {
           zoomControlEnabled: false,
           panControlEnabled: false,
           homeButtonEnabled: false
    };

    map.dragMap = false;

    $scope.userObj = {
      booksRead: [],
      email: "",
      profilePic: "",
      showList: false
    };

    $scope.toggleList = function() {
      $scope.userObj.showList = !$scope.userObj.showList;
    };

    $timeout(function () {
      console.log(envService.read('apiUrl'));
      $http({
        method: 'GET',
        url: envService.read('apiUrl') + 'books',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + $cookies.get('token')
        }
      })
      .then(
        function(response) {
          $scope.userObj.booksRead = response.data.books_read;
          $scope.highlightCountries();
        },
        function(response){
          console.log(response);
        }
      );
    });

    $scope.chooseBook = function (book) {
      $scope.selectedBook = book;
    };

    $scope.highlightCountries = function () {// Colors in countries the user has read from
      for(var i = 0; i < map.dataProvider.areas.length; i++) {
        for(var j = 0; j < $scope.userObj.booksRead.length; j++) {
          if(map.dataProvider.areas[i].id === $scope.userObj.booksRead[j].country) {
            map.dataProvider.areas[i].showAsSelected = true;
            map.dataProvider.areas[i].customData = '<br><img src="' + $scope.userObj.booksRead[j].cover + '"></img>';
            map.returnInitialColor(map.dataProvider.areas[i]);
          };
        };
      };
    };

    $scope.chooseCountry = function(){
      for (var i = 0; i < map.dataProvider.areas.length; i++){
        if(document.getElementById("country-choice-menu").value === map.dataProvider.areas[i].title) {
          $scope.userObj.booksRead.push(
            {
              title: $scope.selectedBook.title,
              country: map.dataProvider.areas[i].id,
              countryName: map.dataProvider.areas[i].title,
              pages: $scope.selectedBook.pageCount,
              cover: $scope.selectedBook.thumbnailImage
            }
          );

          $http({
            method: 'POST',
            url: envService.read('apiUrl') + 'books/',
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + $cookies.get('token')
            },
            data: {books_read: $scope.userObj.booksRead}
          })
          .then(
             function(response){
               $scope.highlightCountries();
             },
             function(response){
               console.log(response);
             }
           );
        };
      };
    };
}]);
