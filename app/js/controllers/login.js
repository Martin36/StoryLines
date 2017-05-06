/**
 * Created by marti on 2017-03-25.
 */
app.controller('LoginController', function ($cookies, $scope, $location,
    TrelloService, FirebaseService) {

  $scope.login = function () {
    if(TrelloService.isLoggedIn()){
      $location.path('/home');
      $scope.$evalAsync();
    }else{
      TrelloService.authorize(function () {
        $location.path('/home');
        $scope.$evalAsync();
      }, false);
    }
  };
});
