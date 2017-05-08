/**
 * Created by marti on 2017-03-25.
 */
app.controller('PlannerHubController', function ($scope, $timeout, CardService) {
    Chart.defaults.global.responsive = true;

    if(!CardService.boardsLoaded()){
      $scope.loading = true;
    }

    $scope.labels = ["High Priority", "Medium Priority", "Low Priority"];

    //Displays the legend for the doughnut chart
    $scope.options = {
      legend: {display:true},
      responsive: true
    };

    $scope.colors = [ '#ff3860', '#ffdd57', '#23d160'];

    var addBoardsData = function () {
      $scope.boards = CardService.getBoards;
      for(var i = 0; i < $scope.boards().length; i++){
        $scope.boards()[i].statsData = Object.values($scope.boards()[i].cardStats);
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

    $scope.toggleHelp = function(){
      $scope.showHelp = true;
    };

    $scope.cancel = function () {
      $scope.showHelp = false;
    };
    //Checks if there is no cards to show in the chart
    $scope.noCardsToShow = function (board) {
      var doneListId = CardService.getListId(board.id, "Done");
      for(var i = 0; i < board.cards.length; i++){
        //Check if the card is not in the list done
        if(board.cards[i].idList != doneListId){
          return false;
        }
      }
      //If it didn't return before this, there was no cards in any list except the done list
      return true;
    }
  });
