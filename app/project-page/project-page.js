// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
app.controller('ProjectPageController', function ($scope, $routeParams, Model) {

    $scope.edit = {
      title: false,
      titleFocus: false
    }

    if(!Model.boardsLoaded()){
      $scope.loading = true;
    }

    var loadBoards = function () {
      Model.loadData(function(){
        $scope.board = Model.getBoard($routeParams.boardId);
        $scope.listsToShow = Model.getListsToShow();
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };

    //Check if data is loaded
    if(Model.boardsLoaded()){
      $scope.board = Model.getBoard($routeParams.boardId);
      $scope.listsToShow = Model.getListsToShow();
      $scope.loading = false;
    }else{
      loadBoards();
    }

    $scope.showEdit = false;
    $scope.showDelete = false;

    //$scope.clickedCard;
    $scope.desc = "";

    $scope.listId = function(listName) {
      return Model.getListId($routeParams.boardId, listName);
    };

    // TODO: Add card to specific list in this board with API PUSH
    $scope.addCard = function(listName) {
      Model.addNewCard($routeParams.boardId, listName, listName, function () {
        $scope.board = Model.getBoard($routeParams.boardId);
        $scope.$evalAsync();
      });
    };

    $scope.editTitle = function(){
      toggleEdit();
    };

    // Save the new title on trello
    $scope.saveTitle = function(){
      Model.changeBoardName($routeParams.boardId, $scope.board.name);
      toggleEdit();
    };

    $scope.showEditBox = function (card) {
      $scope.clickedCard = card;
      $scope.showEdit = true;
    };

    $scope.getLabelName = function (card) {
      var labels = card.labels;
      for(var i = 0; i < labels.length; i++){
        if(labels[i].name.toLowerCase() == "high priority" ||
           labels[i].name.toLowerCase() == "medium priority" ||
           labels[i].name.toLowerCase() == "low priority"){
          return labels[i].name.toLowerCase();
        }
      }
      //Set "low priority" by default
      return "low priority";
    };

    $scope.save = function () {
      //console.log($scope.clickedCard.desc);
      Model.addDescriptionToCard($scope.clickedCard);
      Model.changeNameOfCard($scope.clickedCard);
      Model.changeLabelOfCard($routeParams.boardId, $scope.clickedCard);
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
      Model.deleteCard($routeParams.boardId, $scope.clickedCard.id);
      $scope.showDelete = false;
    };

    $scope.showDeleteBoardWarning = function() {
      $scope.showDeleteBoard = true;
    }

    $scope.deleteBoard = function() {
      Model.deleteBoard($routeParams.boardId);
      $scope.showDeleteBoard = false;
      $scope.deleted = true;
    }

    $scope.isDeleted = function() {
      return Model.getBoard($routeParams.boardId);
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
