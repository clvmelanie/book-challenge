angular.module('BookChallenge')
.controller('ProfileController', ['$http', function($http){

  var mapCountries = AmCharts.maps.worldLow.svg.g.path;
  var goodReadsApiKey = 'ZywOwAHPQbeb27l4JbegA';

  $http({
    method: 'GET',
    url: 'https://www.goodreads.com/search',
    params: {
      q: '0439554934',
      key: goodReadsApiKey
    }
  }).then(function (response) {
    console.log(response);
  }, function (response) {
    console.log('Got an error!', response);
  });

  // var assignReadCountries = function (countriesRead) {
  //   for (var i = 0; i < mapCountries.length; i++) {
  //     for (var j = 0; j < countriesRead.length; j++) {
  //       if (mapCountries[i].id === countriesRead[j]) {
  //         mapCountries[i].title = "We read from this shitty place.";
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
      "autoZoom": true,
      "selectedColor": "#CC0000",
      "balloonText": "[[title]]"
    },
    "export": {
      "enabled": true,
      "position": "bottom-right"
    }
  });
}]);
