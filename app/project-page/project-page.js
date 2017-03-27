/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.projectPage', [])
  .controller('ProjectPageController', function ($scope) {

      $scope.boardTypes = ["To Do","In Progress","Verifying","Done"]

      // TODO: Load project from id in adress field??
      $scope.projectTitle = "Test Project"

  });
