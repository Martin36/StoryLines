/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.myStories', [])
  .controller('MyStoriesController', function ($scope, Model) {

    if(!Model.boardsLoaded()){
      $scope.loading = true;
    }

    $scope.showdetails =function (){
      $scope.showModal =true;
    };
    $scope.save = function () {
      $scope.showModal = false;
    };
    $scope.cancel = function () {
      $scope.showModal = false;
    };
    $scope.styleOptions = {"1":"blue","2":"violet","3":"yellow","4":"red"};

    var loadBoards = function () {
      Model.loadData(function(){
        $scope.boards = Model.getBoards();
        $scope.loading = false;
        $scope.$apply();
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


