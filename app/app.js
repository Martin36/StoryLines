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
      controller: "UserScreenController",
      controllerAs: 'myUser',
    })
  .when("/userScreen/:userId", {
    templateUrl: "user-screen/user-screen.html",
    controller: "UserScreenController",
    resolve: {
                user: function ($route, $routeParams, UsersModel) {
                    var userId = $route.current.params['userId']
                               ? $route.current.params['userId']
                               : $routeParams['userId'];
                    return UsersModel.fetch(userId);
                },
                stories: function ($rootScope, StoriesModel) {
                    return StoriesModel.all();
                }
            }
    })
    .otherwise({redirectTo: '/login'});
}]);
