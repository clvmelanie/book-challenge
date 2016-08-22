angular.module('CoffeeShop')
  .service('GalleryService', function(){
    this.getImages = function(){
      var csGallery = [
        {
          image: "https://static.pexels.com/photos/32059/pexels-photo-large.jpg",
          caption:""
        },
        {
          image: "https://static.pexels.com/photos/48665/pexels-photo-48665.jpeg",
          caption:""
        },
        {
          image: "https://static.pexels.com/photos/6357/coffee-cup-desk-pen-large.jpg",
          caption:""

        }
      ];
      return csGallery;
    };

  });
