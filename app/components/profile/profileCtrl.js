angular.module('BookChallenge')
.controller('ProfileController', ['$http', '$scope', '$window', '$timeout', function($http, $scope, $window, $timeout){

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





  // var assignReadCountries = function (countriesRead) {
  //   for (var i = 0; i < mapCountries.length; i++) {
  //     for (var j = 0; j < countriesRead.length; j++) {
  //       if (mapCountries[i].id === countriesRead[j]) {
  //         mapCountries[i].title = "We read from this place.";
  //         break;
  //       }
  //     }
  //   }
  // };

  // Do an http call to get user's data.

  // Set countries to read if they have read it.
  // var userObj = {
  //   userId: 9999,
  //   email: 'something@bullshit.com',
  //   countriesRead: [
  //     'US'
  //   ]
  // };

  // assignReadCountries(userObj.countriesRead);
  // mapCountries[0].title = "<img src='https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg'></img>"

  var map = AmCharts.makeChart( "chartdiv", {
    "type": "map",
    "theme": "light",
    "projection": "miller",

    "dataProvider": {
      "map": "worldLow",
      "getAreasFromMap": true
    },
    "areasSettings": {
      "autoZoom": false,
      "color": "#b3b3b3",
      "outlineThickness": "2",
      "rollOverColor": "#5FBA73",
      "selectable": "false",
      "balloonText": "[[title]]"
    },
    "export": {
      "enabled": true,
      "position": "bottom-right"
    }
  });
}]);
