/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.plannerHub', [])
  .controller('PlannerHubController', function ($scope, $timeout, Model) {
    Chart.defaults.global.responsive = true;
    $scope.loading = true;
    $scope.labels = ["Medium Priority", "Low Priority", "High Priority"];

    //Displays the legend for the doughnut chart
    $scope.options = {
      legend: {display:true},
      responsive: true
    };
    $scope.colors = [ '#949FB1', '#4D5360', '#DCDCDC'];

    var addBoardsData = function () {
      $scope.boards = Model.getBoards();
      for(var i = 0; i < $scope.boards.length; i++){
        $scope.boards[i].statsData = Object.values($scope.boards[i].cardStats);
      }
    }

    var loadBoards = function () {
      Model.loadData(function(){
        addBoardsData();
        console.log($scope.boards[0]);
        //Extract the values in the data from the boards
        $scope.loading = false;
        $scope.$apply();
      });
    };
    if(Model.boardsLoaded()){
      addBoardsData();
    }else{
      loadBoards();
    }

    /*
    if(!Model.isLoggedIn()){
      Model.authorize(function () {
        loadBoards();
      })
    }else {
      loadBoards();
    }
*/
   // console.log($scope.boards);
    // var ref = firebase.database().ref();
    // var obj = $firebaseObject(ref);
    //
    // $scope.data = obj;
    // // Three-way binding
    // obj.$bindTo($scope, "data");


  });
