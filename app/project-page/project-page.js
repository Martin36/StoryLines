// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
angular.module('myApp.projectPage', [])
  .controller('ProjectPageController', function ($scope, $routeParams, Model) {

    if(!Model.boardsLoaded()){
      $scope.loading = true;
    }

    var loadBoards = function () {
      Model.loadData(function(){
        $scope.board = Model.getBoard($routeParams.boardId);
        $scope.listsToShow = Model.getListsToShow();
        $scope.loading = false;
        $scope.$apply();
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
        $scope.$apply();
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
    //TODO: Save the edits then exit
    $scope.save = function () {
      //console.log($scope.clickedCard.desc);
      Model.addDescriptionToCard($scope.clickedCard);
      Model.changeNameOfCard($scope.clickedCard);
      $scope.showEdit = false;
    };
    $scope.cancel = function(){
      $scope.showEdit = false;
      $scope.showDelete = false;
    };

    $scope.showDeleteWarning = function (card) {
      $scope.clickedCard = card;
      $scope.showDelete = true;
    };

    $scope.deleteCard = function(){
      Model.deleteCard($routeParams.boardId, $scope.clickedCard.id);
      $scope.showDelete = false;
    };
    // Toggles the edit mode for project title
    function toggleEdit(){
      $scope.editMode = !$scope.editMode;
      $scope.isOpen = !$scope.isOpen;
    }


  });
