/**
 * Created by marti on 2017-03-26.
 */
angular.module('myApp.sidebar', [])
  .controller('SidebarController', function ($scope, $location, Model) {

    $scope.pages = [{
      "name": "Planner Hub",
      "link": "plannerHub"
    },{
      "name": "My Stories",
      "link": "myStories"
    }];

    // Points to function rather than array itself!
    // Then it won't loose track of array if it's assigned
    // to a new one im model.
    $scope.boards = Model.getBoards;

    // Change view to the given page
    $scope.changeView = function(page) {
      $location.path('/' + page);
    }

    // Go to a specific project page
    $scope.goProjectPage = function(boardId) {
      $location.path('/projectPage/'+boardId);
    }

    $scope.newProject = function() {
        Model.createNewBoard();
    }
});
