/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.myStories', [])
  .controller('MyStoriesController', function ($scope, Model) {
    showModal =false;
    //TODO: Wait for data to load in model
    Model.loadData(function () {
      $scope.boards = Model.getBoards();
      //TODO: Figure out why this is needed for it to work
      $scope.$apply();
      $scope.showdetails =function (){
          $scope.showModal =true;
          };
        $scope.save = function () {
            $scope.showModal = false;
        };
        $scope.cancel = function () {
            $scope.showModal = false;
        };
    });
  });
