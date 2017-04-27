/**
 * Created by marti on 2017-03-25.
 */
app.controller('LoginController', function ($cookies, $scope, $location,
    TrelloService, FirebaseService) {

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
