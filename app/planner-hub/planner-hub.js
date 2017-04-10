/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.plannerHub', [])
  .controller('PlannerHubController', function ($scope, Model) {
    Chart.defaults.global.responsive = true;

 //   Model.loadUserId();

    $scope.labels = ["Medium Priority", "Low Priority", "High Priority"];

    //Displays the legend for the doughnut chart
    $scope.options = {
      legend: {display:true},
      responsive: true
    };
    $scope.colors = [ '#949FB1', '#4D5360', '#DCDCDC'];
    if(Model.boardsLoaded()){
      $scope.boards = Model.getBoards();
    }else{
      Model.loadData(function() {
        $scope.boards = Model.getBoards();
        for(var i = 0; i < $scope.boards.length; i++){
          $scope.boards[i].statsData = Object.values($scope.boards[i].cardStats);
        }
        console.log($scope.boards[0]);
        //Extract the values in the data from the boards
        $scope.$apply();
      });
    }
   // console.log($scope.boards);
    // var ref = firebase.database().ref();
    // var obj = $firebaseObject(ref);
    //
    // $scope.data = obj;
    // // Three-way binding
    // obj.$bindTo($scope, "data");


  });
