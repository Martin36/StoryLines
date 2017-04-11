/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.myStories', [])
  .controller('MyStoriesController', function ($scope, Model) {

    if(Model.boardsLoaded()){
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
        $scope.styleOptions = {"1":"blue","2":"violet","3":"yellow","4":"red"};
    };
});


