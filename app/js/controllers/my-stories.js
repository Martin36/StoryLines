/**
 * Created by marti on 2017-03-25.
 */
app.controller('MyStoriesController', function ($scope, CardService) {

    if(!CardService.boardsLoaded()){
      $scope.loading = true;
    }

    $scope.showDetails =function (card){
      $scope.clickedCard = card;
      $scope.showEdit =true;
    };
    $scope.done = function () {
      $scope.showEdit = false;
    };
    $scope.cancel = function () {
      $scope.showEdit = false;
    };

    var loadBoards = function () {
      CardService.loadData(function(){
        $scope.boards = CardService.getBoards;
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };
    if(CardService.boardsLoaded()){
      $scope.boards = CardService.getBoards;
      $scope.loading = false;
    }else{
      loadBoards();
    }

    $scope.toggleDropdown = function (card) {
      card.showDropdown = !card.showDropdown;
    };

    $scope.closeDropdown = function (card) {
      card.showDropdown = false;
    };

    $scope.listId = function(boardId ,listName) {
      return CardService.getListId(boardId, listName);
    };

    $scope.removeID =function()
    {
        var iE1= angular.element(document.querySelector('#card1'));
        iE1.remove();
    }
    $scope.getLabelClass = function(card){
      var label = card.label;
      if(label == undefined){
        return "low-priority";
      }
      switch (label) {
        case "high priority":
          return "high-priority";
          break;
        case "medium priority":
          return "medium-priority";
          break;
        case "low priority":
          return "low-priority";
          break;
        default:
          return "low-priority";
      }

    }
	//to come out of the popup.
	$scope.done=function(){
		$scope.showEdit=false;
	};

	//to move card from one page to another
	$scope.movecard = function(card, listname){
		CardService.moveCard(card, listname);
	};

	//Returns true if there is no cards assigned to the user
	$scope.projectEmpty = function (board) {
    return board.myCards.length == 0;
  }

});
