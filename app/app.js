'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.login',
  'myApp.sidebar',
  'myApp.myTasks',
  'myApp.plannerHub',
  'myApp.projectPage',
  'myApp.storiesStatus',
  'myApp.userScreen'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when("/login", {
      templateUrl: "login/login.html"
    })
    .when("/myTasks", {
      templateUrl: "my-tasks/my-tasks.html"
      /*controller: "MyTasksController"*/
    })
    .when("/plannerHub", {
      templateUrl: "planner-hub/planner-hub.html",
      controller: "PlannerHubController"
    })
    .when("/projectPage", {
      templateUrl: "project-page/project-page.html",
      controller: "ProjectPageController"
    })
    .when("/storiesStatus", {
      templateUrl: "stories-status/stories-status.html",
      controller: "StoriesStatusController"
    })
    .when("/userScreen", {
      templateUrl: "user-screen/user-screen.html",
      controller: "UserScreenController"
    })
    .otherwise({redirectTo: '/login'});
}]);
