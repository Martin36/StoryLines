'use strict';

var app = angular.module('myApp', [
  'ngCookies',
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'chart.js',
  'firebase',
  'angular-click-outside'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when("/login", {
      templateUrl: "partials/login.html",
      controller: "LoginController"
    })
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: "SidebarController"
    })
    .when("/myStories", {
      templateUrl: "partials/my-stories.html",
      controller: "MyStoriesController"
    })
    .when("/plannerHub", {
      templateUrl: "partials/planner-hub.html",
      controller: "PlannerHubController"
    })
    .when("/projectPage/:boardId", {
      templateUrl: "partials/project-page.html",
      controller: "ProjectPageController"
    })
    .otherwise({redirectTo: '/login'});
}]);
