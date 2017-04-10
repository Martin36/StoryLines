// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
angular.module('myApp.projectPage', [])
  .controller('ProjectPageController', function ($scope, $routeParams, Model) {

    var loadBoards = function () {
      Model.loadData(function(){
        $scope.board = Model.getBoard($routeParams.boardId);
        $scope.listsToShow = Model.getListsToShow();
        $scope.$apply();
      });
    };

    //Check if data is loaded
    if(Model.boardsLoaded()){
      $scope.board = Model.getBoard($routeParams.boardId);
      $scope.listsToShow = Model.getListsToShow();
    }else{
      loadBoards();
    }

    $scope.showEdit = false;
    //$scope.clickedCard;
    $scope.desc = "";

    $scope.listId = function(listName) {
      return Model.getListId($routeParams.boardId, listName);
    };

    // TODO: Add card to specific list in this board with API PUSH
    $scope.addCard = function(listName) {
      Model.addNewCard($routeParams.boardId, listName, listName);
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
      //console.log($scope.desc);
      Model.addDescriptionToCard($scope.clickedCard.id, $scope.desc);
      $scope.showEdit = false;
    };
    $scope.cancel = function(){
      $scope.showEdit = false;
    };

    $scope.deleteCard = function(card){
      Model.deleteCard(card.id);
    };
    // Toggles the edit mode for project title
    function toggleEdit(){
      $scope.editMode = !$scope.editMode;
      $scope.isOpen = !$scope.isOpen;
    }


  });
