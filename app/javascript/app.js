angular.module('BookChallenge', ['ngRoute']);

var delay=300, setTimeoutConst;

// Shows a dropdown menu on mouseover of profile image after delay of .3 seconds
$('.rtg-profile-picture').mouseover(function(){
  setTimeoutConst = setTimeout(function(){
    $('#rtg-dropdown-menu').slideDown();
  }, delay);
});

$('.rtg-profile-picture').mouseleave( function(){
  clearTimeout(setTimeoutConst);
    $('#rtg-dropdown-menu').slideUp();
});
