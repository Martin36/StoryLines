/**
 * Created by marti on 2017-03-25.
 */
app.controller('LoginController', function ($cookies, $scope, $location,
    CardService) {

  $scope.login = function () {
    if(CardService.isLoggedIn()){
      $location.path('/home');
      $scope.$evalAsync();
    }else{
      CardService.authorize(function () {
        $location.path('/home');
        $scope.$evalAsync();
      }, false);
    }
  };
});
