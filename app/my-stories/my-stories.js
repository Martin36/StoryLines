/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.myStories', [])
  .controller('MyStoriesController', function ($scope, Model) {
    //TODO: Wait for data to load in model
   Model.loadData(function () {
      $scope.boards = Model.getBoard();
        $scope.myCards=Model.getUsersCards();
      //TODO: Figure out why this is needed for it to work
      $scope.$apply();
        
     });
  });
