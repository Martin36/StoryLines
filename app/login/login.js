/**
 * Created by marti on 2017-03-25.
 */

angular.module('myApp.login', [])
  .controller('LoginController', function ($scope, $location, Model) {

    $scope.login = function () {
      console.log("Login!");
      Model.authorize(function () {
        //Change view to my tasks
        $location.path('/myTasks');
      });

    };
  });