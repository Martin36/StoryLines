// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
angular.module('myApp.projectPage', [])
  .controller('ProjectPageController', function ($scope, $routeParams, Model) {

      // Get 'this' board from model
      $scope.board = Model.getBoard($routeParams.boardId);

      // TODO: Add card to specific list in this board with API PUSH
      $scope.addCard = function(listName) {
        // Find the right list to add the card too
        // for(var i = 0; i < $scope.lists.length; i++) {
        //   if($scope.lists[i].name == listName){
            // Add card to API
            Model.addNewCard($routeParams.boardId, listName, listName);
        //   }
        // }
      }

      $scope.editTitle = function(){
        toggleEdit();
      }

      // Save the new title on trello
      $scope.saveTitle = function(){
        Model.changeBoardName($routeParams.boardId, $scope.board.name);
        toggleEdit();
      }

      $scope.isValidList = function(listName) {
        // var validLists = Model.getListTypes();
        // for(var i = 0; i < validLists.length; i++) {
        //   if(validLists[i] == listName){
        //     console.log(validLists[i] + " " + listNames);
        //     return true;
        //   }
        //   return false;
        // }
        switch (listName) {
          case "To Do":
              return true;
            break;
          case "In Progress":
              return true;
            break;
          case "Verifying":
              return true;
            break;
          case "Done":
              return true;
            break;
          default:
            return false;
        }
      }

      // Toggles the edit mode for project title
      function toggleEdit(){
        $scope.editMode = !$scope.editMode;
        $scope.isOpen = !$scope.isOpen;
      }


  });
