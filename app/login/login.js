/**
 * Created by marti on 2017-03-25.
 */
app.controller('LoginController', function ($cookies, $scope, $location,
    $firebaseAuth, Model) {

  // Authenticate with google to firebase
  // TODO: Custom token from trello login maybe??
  // var auth = $firebaseAuth();
  // auth.$signInWithPopup("google").then(function(authData) {
  //   console.log(authData);
  // }).catch(function(error){
  //   console.log(error);
  // });

  $scope.login = function () {
    if(Model.isLoggedIn()){
      $location.path('/plannerHub');
    }else{
      Model.authorize(function () {
        $location.path('/plannerHub');
      }, false);
    }
    $scope.$evalAsync();
  };
});
