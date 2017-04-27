/**
 * Created by marti on 2017-03-25.
 */
app.controller('MyStoriesController', function ($scope, TrelloService) {

    if(!TrelloService.boardsLoaded()){
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
      TrelloService.loadData(function(){
        $scope.boards = TrelloService.getBoards;
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };
    if(TrelloService.boardsLoaded()){
      $scope.boards = TrelloService.getBoards;
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
      return TrelloService.getListId(boardId, listName);
    };

    $scope.removeID =function()
    {
        var iE1= angular.element(document.querySelector('#card1'));
        iE1.remove();
    }
    $scope.getLabelClass = function(card){
      var label = card.labels[0];
      if(label == undefined){
        return "low-priority";
      }
      switch (label.name) {
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
		TrelloService.moveCard(card, listname);
	};

});
