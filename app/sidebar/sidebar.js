/**
 * Created by marti on 2017-03-26.
 */
app.controller('SidebarController', function ($scope, $location, Model) {

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
    $scope.currentId = "";
    $scope.loading = false;

    // Change view to the given page
    $scope.changeView = function(page) {
      $location.path('/' + page);
      setId(page);
    }

    // Go to a specific project page
    $scope.goProjectPage = function(boardId) {
      $location.path('/projectPage/'+boardId);
      setId(boardId);
    }

    // Returns class is-active if path is the current page you are on.
    $scope.isActive = function (path) {
      return ($location.path().substr(0, path.length) === path) ? 'is-active' : '';
    };

    $scope.newProject = function() {
      $scope.loading = true;
      Model.createNewBoard(function (boardId) {
        $scope.goProjectPage(boardId);
        $scope.loading = false;
        $scope.$digest();
        $scope.$apply(); // Needed for page to change
      });
    };

    $scope.showLoading = function() {
      return ($scope.loading) ? 'is-loading' : '';
    };
    
    $scope.logout = function () {
      Model.logout();
      $location.path('/login');
    };

    function setId(id){
      $scope.currentId = id;
    }

});
