// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
app.controller('ProjectPageController', function ($scope, $routeParams, TrelloService) {

    // Set reference to board id
    var ref = firebase.database().ref().child($routeParams.boardId);

    $scope.edit = {
      title: false,
      titleFocus: false
    }

    if(!TrelloService.boardsLoaded()){
      $scope.loading = true;
    }

    var loadBoards = function () {
      TrelloService.loadData(function(){
        $scope.board = TrelloService.getBoard($routeParams.boardId);
        $scope.listsToShow = TrelloService.getListsToShow();
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };

    //Check if data is loaded
    if(TrelloService.boardsLoaded()){
      $scope.board = TrelloService.getBoard($routeParams.boardId);
      $scope.listsToShow = TrelloService.getListsToShow();
      $scope.loading = false;
    }else{
      loadBoards();
    }

    $scope.showEdit = false;
    $scope.showDelete = false;

    //$scope.clickedCard;
    $scope.desc = "";

    $scope.listId = function(listName) {
      return TrelloService.getListId($routeParams.boardId, listName);
    };

    // TODO: Add card to specific list in this board with API PUSH.
    // Also add the label to firebase
    $scope.addCard = function(listName) {
      TrelloService.addNewCard($routeParams.boardId, listName, listName, function (card) {
        $scope.$evalAsync();
        ref.child(card.id).set({
          label : "low priority"
        }, function(){
          card.label = "low priority";
        });
      });
    };

    $scope.editTitle = function(){
      toggleEdit();
    };

    // Save the new title on trello
    $scope.saveTitle = function(){
      TrelloService.changeBoardName($routeParams.boardId, $scope.board.name);
      toggleEdit();
    };

    $scope.showEditBox = function (card) {
      if(card.labels[0] != undefined){
        //Set the label of the card
        card.label = card.labels[0].name;
      }else{
        //Set this to make the dropdown have a default value
        card.label = "low priority";
      }
      $scope.clickedCard = card;
      $scope.showEdit = true;
    };

    // Save changes done in the edit popup window
    $scope.save = function () {
      TrelloService.addDescriptionToCard($scope.clickedCard);
      TrelloService.changeNameOfCard($scope.clickedCard);
      ref.child($scope.clickedCard.id).set({
        label : $scope.clickedCard.label
      });
      $scope.showEdit = false;
    };

    $scope.cancel = function(){
      $scope.showEdit = false;
      $scope.showDelete = false;
      $scope.showDeleteBoard = false;
    };

    $scope.showDeleteWarning = function (card) {
      $scope.clickedCard = card;
      $scope.showDelete = true;
    };

    $scope.deleteCard = function(){
      TrelloService.deleteCard($routeParams.boardId, $scope.clickedCard.id);
      $scope.showDelete = false;
      ref.child($scope.clickedCard.id).remove();
    };

    $scope.showDeleteBoardWarning = function() {
      $scope.showDeleteBoard = true;
    }

    $scope.deleteBoard = function() {
      TrelloService.deleteBoard($routeParams.boardId);
      $scope.showDeleteBoard = false;
      $scope.deleted = true;
    }

    $scope.isDeleted = function() {
      return TrelloService.getBoard($routeParams.boardId);
    }

    $scope.toggleDropdown = function (card) {
      card.showDropdown = !card.showDropdown;
    };

    $scope.closeDropdown = function (card) {
      card.showDropdown = false;
    };
    // Toggles the edit mode for project title
    toggleEdit = function(){
      $scope.edit["title"] = !$scope.edit["title"];
      $scope.edit["titleFocus"] = !$scope.edit["titleFocus"]
    }

  });
