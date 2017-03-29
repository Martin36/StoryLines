/**
 * Created by marti on 2017-03-26.
 */
angular.module('myApp.sidebar', [])
  .controller('SidebarController', function ($scope, $location) {

    $scope.pages = [{
      "name": "Planner Hub",
      "link": "plannerHub"
    },{
      "name": "My Stories",
      "link": "myStories"
    }];

    $scope.changeView = function(page) {
      // console.log("Navigating to: "+page);
      $location.path('/' + page);
    }
});
