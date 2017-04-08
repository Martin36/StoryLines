// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
angular.module('myApp.projectPage', [])
  .controller('ProjectPageController', function ($scope, $routeParams, Model) {

      // Get 'this' board from model
      $scope.board = Model.getBoard($routeParams.boardId);
      $scope.listsToShow = Model.getListsToShow();

      $scope.listId = function(listName) {
        return Model.getListId($routeParams.boardId, listName);
      }

      // TODO: Add card to specific list in this board with API PUSH
      $scope.addCard = function(listName) {
        Model.addNewCard($routeParams.boardId, listName, listName);
      }

      $scope.editTitle = function(){
        toggleEdit();
      }

      // Save the new title on trello
      $scope.saveTitle = function(){
        Model.changeBoardName($routeParams.boardId, $scope.board.name);
        toggleEdit();
      }

      // Toggles the edit mode for project title
      function toggleEdit(){
        $scope.editMode = !$scope.editMode;
        $scope.isOpen = !$scope.isOpen;
      }

      //TODO: Add the code for showing the dropdown
      $scope.showDropdown = function(){

      }
  });
