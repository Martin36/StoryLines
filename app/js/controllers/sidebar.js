/**
 * Created by marti on 2017-03-26.
 */
app.controller('SidebarController', function ($scope, $location, CardService) {
    $scope.showSidebar = true;
    $scope.pages = [{
      "name": "Planner Hub",
      "link": "plannerHub"
    },{
      "name": "My Stories",
      "link": "myStories"
    }];

    $scope.boards = CardService.getBoards;
    $scope.boardsLoaded = CardService.boardsLoaded;
    $scope.currentId = "";
    $scope.loading = false;
    //Creates bug
    var loadBoards = function () {
      CardService.loadData(function(){
        $scope.boards = CardService.getBoards;
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };

    if(!$scope.boardsLoaded()){
      loadBoards();
    }

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

    // Determines if the sidebar should be hidden or not
    $scope.shouldIHide = function() {
      var path = "/login";
      return $location.path().substr(0, path.length) !== path;
    };

    $scope.newProject = function() {
      $scope.loading = true;
      CardService.createNewBoard(function (boardId) {
        $scope.goProjectPage(boardId);
        $scope.loading = false;
        $scope.$evalAsync(); // Needed for page to change
      });
    };

    $scope.showLoading = function() {
      return ($scope.loading) ? 'is-loading' : '';
    };

    $scope.logout = function () {
      CardService.logout();
      $location.path('/login');
    };


    function setId(id){
      $scope.currentId = id;
    }
    $scope.showSidebar = false;

    //For the mobile navigation bar
    $scope.toggleNavigation = function () {
      $scope.showNavigation = true;
    };

    $scope.closeNavigation = function () {
      $scope.showNavigation = false;
    }

});
