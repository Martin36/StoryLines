
app.controller('HomeController', function($scope, $location, CardService){



  if(!CardService.boardsLoaded()){
    CardService.loadData(function(){
      $scope.boards = CardService.getBoards;
      console.log($scope.boards());
    });
  }else{
    CardService.loadData(function(){
      $scope.boards = CardService.getBoards;
      console.log($scope.boards());
    });

  }


  $scope.changeView = function(page){
    $location.path('/' + page);
    setId(page);
  };

  function setId(id){
    $scope.currentId = id;
  }

});
