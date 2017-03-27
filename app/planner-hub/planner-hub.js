/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.plannerHub', [])
  .controller('PlannerHubController', function ($scope, Model) {
    //For testing
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
    //Displays the legend for the doughnut chart
    $scope.options = {legend: {display:true}};

    Model.loadData(function () {
      $scope.boards = Model.getBoards();
      //console.log($scope.boards[0].cards);
      //TODO: Figure out why this is needed for it to work
      $scope.$apply();

    });

  });