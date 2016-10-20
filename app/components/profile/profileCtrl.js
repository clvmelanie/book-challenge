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
        "selectedColor": "#FF0000"
      },
      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    // Initial drawing logic
    map.dataProvider.areas[160].showAsSelected = true;
    map.returnInitialColor(map.dataProvider.areas[160]);

}]);
