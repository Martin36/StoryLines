/**
 * Created by marti on 2017-03-25.
 */

angular.module('myApp.login', [])
  .controller('LoginController', function ($scope, $location,
    $firebaseAuth, Model) {


  // Authenticate with google to firebase
  // TODO: Custom token from trello login maybe??
  var auth = $firebaseAuth();
  auth.$signInWithPopup("google").then(function(authData) {
    console.log(authData);
  }).catch(function(error){
    console.log(error);
  });

  $scope.login = function () {
    console.log("Login!");
    Model.authorize(function () {
      //Change view to my tasks
      // $location.path('/myStories');
      // TODO: This will fail to load boards
      $location.path('/plannerHub');
    });
  };
});
