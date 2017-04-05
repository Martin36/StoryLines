/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.plannerHub', [])
  .controller('PlannerHubController', function ($scope, $firebaseObject, Model) {
    //For testing
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
    //Displays the legend for the doughnut chart
    $scope.options = {legend: {display:true}};

    Model.loadData(function() {
      $scope.boards = Model.getBoards();
      $scope.$apply();
    });
  //  console.log($scope.boards[0]);
    //console.log($scope.boards[0].cards);
    //TODO: Figure out why this is needed for it to work
//      $scope.$apply();


    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);

    $scope.data = obj;
    // Three-way binding
    obj.$bindTo($scope, "data");


  });
