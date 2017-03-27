/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.myTasks', [])
  .controller('MyTasksController', function ($scope, Model) {

    //TODO: Wait for data to load in model
    Model.loadData(function () {
      $scope.boards = Model.getBoards();
      //console.log($scope.boards[0].cards);
      //TODO: Figure out why this is needed for it to work
      $scope.$apply();

    });


  });
