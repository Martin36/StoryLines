/**
 * Created by marti on 2017-03-25.
 */
app.controller('MyStoriesController', function ($scope, Model) {

    if(!Model.boardsLoaded()){
      $scope.loading = true;
    }

    $scope.showdetails =function (card){
      $scope.clickedCard = card;
      $scope.showEdit =true;
    };
    $scope.done = function () {
      $scope.showEdit = false;
    };
    $scope.cancel = function () {
      $scope.showEdit = false;
    };
    $scope.styleOptions = {"1":"blue","2":"violet","3":"yellow","4":"red"};

    var loadBoards = function () {
      Model.loadData(function(){
        $scope.boards = Model.getBoards();
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };
    if(Model.boardsLoaded()){
      $scope.boards = Model.getBoards();
      $scope.loading = false;
    }else{
      loadBoards();
    }

    $scope.removeID =function()
    {
        var iE1= angular.element(document.querySelector('#card1'));
        iE1.remove();
    }
    }
);
