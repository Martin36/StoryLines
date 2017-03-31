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

    $scope.changeView = function(page) {
      // console.log("Navigating to: "+page);
      $location.path('/' + page);
    }
});
