/**
 * Created by marti on 2017-03-25.
 */
app.controller('LoginController', function ($cookies, $scope, $location,
    $firebaseAuth, TrelloService) {

  // Authenticate with google to firebase
  // TODO: Custom token from trello login maybe??
  // var auth = $firebaseAuth();
  // auth.$signInWithPopup("google").then(function(authData) {
  //   console.log(authData);
  // }).catch(function(error){
  //   console.log(error);
  // });

  $scope.login = function () {
    if(TrelloService.isLoggedIn()){
      $location.path('/plannerHub');
      $scope.$evalAsync();
    }else{
      TrelloService.authorize(function () {
        $location.path('/plannerHub');
        $scope.$evalAsync();
      }, false);
    }
  };
});
