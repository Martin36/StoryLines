// We might use the term 'project' instead of 'board'(Trello), they mean the same thing.
angular.module('myApp.projectPage', [])
  .controller('ProjectPageController', function ($scope, $routeParams, Model) {

      // Temporary list structure in project
      $scope.lists = [{
        "name": "To Do",
        "cards": []
        }, {
        "name": "In Progress",
        "cards": []
        }, {
        "name": "Verifying",
        "cards": []
        }, {
        "name": "Done",
        "cards": []
      }];

      // Get 'this' board from model
      $scope.board = Model.getBoard($routeParams.boardId);

      $scope.addCard = function(listType) {
        // Find the right list to add the card too
        for(var i = 0; i < $scope.lists.length; i++) {
          if($scope.lists[i].name == listType){
            // Dummy object for testing purpous
            var newCard = {}
            newCard["text"] = listType + " Card\n" +
              "Nr: " + $scope.lists[i].cards.length;
            $scope.lists[i].cards.push(newCard);
            // console.log("Card added to: "+listType+", Length: "+ $scope.lists[i].cards.length);
          }
        }
      }

      $scope.editTitle = function(){
        toggleEdit();
      }

      // Save the new title on trello
      $scope.saveTitle = function(){
        Model.changeBoardName($routeParams.boardId, $scope.project.name);
        toggleEdit();
      }

      // Toggles the edit mode for project title
      function toggleEdit(){
        $scope.editMode = !$scope.editMode;
        $scope.isOpen = !$scope.isOpen;
      }

  });
