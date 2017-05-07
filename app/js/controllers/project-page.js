// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
app.controller('ProjectPageController', function ($scope, $routeParams, CardService) {

    // Set reference to board id
    var ref = firebase.database().ref().child($routeParams.boardId);


    $scope.edit = {
      title: false,
      titleFocus: false
    };

    if(!CardService.boardsLoaded()){
      $scope.loading = true;
    }

    var loadBoards = function () {
      CardService.loadData(function(){
        $scope.board = CardService.getBoard($routeParams.boardId);
        $scope.listsToShow = CardService.getListsToShow();
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };

    //Check if data is loaded
    if(CardService.boardsLoaded()){
      $scope.board = CardService.getBoard($routeParams.boardId);
      $scope.listsToShow = CardService.getListsToShow();
      $scope.loading = false;
    }else{
      loadBoards();
    }

    $scope.showEdit = false;
    $scope.showDelete = false;
    $scope.desc = "";

    $scope.listId = function(listName) {
      return CardService.getListId($routeParams.boardId, listName);
    };

    $scope.addCard = function(listName) {
      CardService.addNewCard($routeParams.boardId, listName, listName, function (card) {
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
      CardService.changeBoardName($routeParams.boardId, $scope.board.name);
      toggleEdit();
    };

    $scope.showEditBox = function (card) {
      if(card.label != undefined){
        //Set the label of the card
        card.label = card.label;
      }else{
        //Set this to make the dropdown have a default value
        card.label = "low priority";
      }
      $scope.clickedCard = card;
      $scope.showEdit = true;
    };

    // Save changes done in the edit popup window
    $scope.save = function () {
      CardService.addDescriptionToCard($scope.clickedCard);
      CardService.changeNameOfCard($scope.clickedCard);
      CardService.changeLabelOfCard($routeParams.boardId, $scope.clickedCard.id,
          $scope.clickedCard.label);
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
      CardService.deleteCard($routeParams.boardId, $scope.clickedCard.id);
      $scope.showDelete = false;
      ref.child($scope.clickedCard.id).remove();
    };

    $scope.showDeleteBoardWarning = function() {
      $scope.showDeleteBoard = true;
    }

    $scope.deleteBoard = function() {
      CardService.deleteBoard($routeParams.boardId);
      $scope.showDeleteBoard = false;
      $scope.deleted = true;
    }

    $scope.isDeleted = function() {
      return CardService.getBoard($routeParams.boardId);
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
