/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.plannerHub', [])
  .controller('PlannerHubController', function ($scope, Model) {
    Chart.defaults.global.responsive = true;
    //For testing
    $scope.labels = ["Medium Priority", "Low Priority", "High Priority"];
    $scope.data = [300, 500, 100];
    //Displays the legend for the doughnut chart
    $scope.options = {
      legend: {display:true},
      responsive: true
    };
    $scope.colors = [ '#949FB1', '#4D5360', '#DCDCDC'];
    Model.loadData(function() {
      $scope.boards = Model.getBoards();
      for(var i = 0; i < $scope.boards.length; i++){
        $scope.boards[i].statsData = Object.values($scope.boards[i].cardStats);
      }
      console.log($scope.boards[0]);
      //Extract the values in the data from the boards
      $scope.$apply();
    });
  //  console.log($scope.boards[0]);
    //console.log($scope.boards[0].cards);
    //TODO: Figure out why this is needed for it to work
//      $scope.$apply();


    // var ref = firebase.database().ref();
    // var obj = $firebaseObject(ref);
    //
    // $scope.data = obj;
    // // Three-way binding
    // obj.$bindTo($scope, "data");


  });
