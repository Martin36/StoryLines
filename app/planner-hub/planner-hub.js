/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.plannerHub', [])
  .controller('PlannerHubController', function ($scope, Model) {
    //For testing
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];

    Model.loadData(function () {
      $scope.boards = Model.getBoards();
      //console.log($scope.boards[0].cards);
      //TODO: Figure out why this is needed for it to work
      $scope.$apply();

    });

  });