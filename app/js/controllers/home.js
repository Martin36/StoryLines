
app.controller('HomeController', function($scope, $location, Model){

  $scope.changeView = function(page){
    $location.path('/' + page);
    setId(page);
  }

  function setId(id){
    $scope.currentId = id;
  }

})
