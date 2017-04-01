angular.module('myApp.projectPage', [])
  .controller('ProjectPageController', function ($scope, $routeParams,Model) {

      // Temporary board structure in project
      $scope.boards = [{
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

      // Get project from model
      $scope.project = Model.getBoard($routeParams.projectId);

      $scope.addCard = function(boardType) {
        // Find the right board to add the card too
        for(var i = 0; i < $scope.boards.length; i++) {
          if($scope.boards[i].name == boardType){
            // Dummy object for testing purpous
            var newCard = {}
            newCard["text"] = boardType + " Card\n" +
              "Nr: " + $scope.boards[i].cards.length;
            $scope.boards[i].cards.push(newCard);
          }
        }
      }

      $scope.editTitle = function(){
        $scope.editMode = !$scope.editMode;
        $scope.isOpen = !$scope.isOpen;
      }
  });
