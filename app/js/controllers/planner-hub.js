/**
 * Created by marti on 2017-03-25.
 */
app.controller('PlannerHubController', function ($scope, $timeout, CardService) {
    Chart.defaults.global.responsive = true;

    if(!CardService.boardsLoaded()){
      $scope.loading = true;
    }

    $scope.labels = ["Medium Priority", "Low Priority", "High Priority"];

    //Displays the legend for the doughnut chart
    $scope.options = {
      legend: {display:true},
      responsive: true
    };
    $scope.colors = [ '#949FB1', '#4D5360', '#DCDCDC'];

    var addBoardsData = function () {
      $scope.boards = CardService.getBoards();
      for(var i = 0; i < $scope.boards.length; i++){
        $scope.boards[i].statsData = Object.values($scope.boards[i].cardStats);
      }
    }

    var loadBoards = function () {
      CardService.loadData(function(){
        addBoardsData();
        //Extract the values in the data from the boards
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };
    if(CardService.boardsLoaded()){
      addBoardsData();
    }else{
      loadBoards();
    }

    $scope.showHelp = function(){

    }
  });
