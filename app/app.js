'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'chart.js',
  'firebase',
  'myApp.login',
  'myApp.sidebar',
  'myApp.myStories',
  'myApp.plannerHub',
  'myApp.projectPage',
  'myApp.userScreen'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when("/login", {
      templateUrl: "login/login.html"
    })
    .when("/myStories", {
      templateUrl: "my-stories/my-stories.html"
    })
    .when("/plannerHub", {
      templateUrl: "planner-hub/planner-hub.html",
    })
    .when("/projectPage/:projectId", {
      templateUrl: "project-page/project-page.html",
      controller: "ProjectPageController"
    })
    .when("/userScreen", {
      templateUrl: "user-screen/user-screen.html",
    })
    .otherwise({redirectTo: '/login'});
}]);
