'use strict';

// Declaration of myApp as single top-level module; myApp will connect sub-modules and apply application-wide
// configuration settings.
// Sub-module dependencies are being declared, too (for every myApp feature); for back-end communication and
// authentication Node.js and perhaps Firebase will be used; to enable them
// we need to inject the sub-modules firebase, auth0, angular-jwt, and angular-storage
// (comments by Jori, April 03, 2017)

// TODO: Skipp modules for controllers
var app = angular.module('myApp', [
  'ngCookies',
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'chart.js',
  'firebase',
  'angular-click-outside'
]).

// Passing in $routeProvider, responsible for the configuration of routes
// Routes are configured by calling $routeProvider.when and passing in a route (URL string), as well as
// a configuration object for that particular route
// The route configuration object is responsible for associating a template and a controller
// to a particular route (comment by Jori, April 03, 2017)
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when("/login", {
      templateUrl: "partials/login.html",
      controller: "LoginController"
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
// In case there is no route match, a fallback is being defined using otherwise method on $routeProvider
// if a route cannot be matched a redirect to the root of the application occurs (comment by Jori, April 03, 2017)
    .otherwise({redirectTo: '/login'});
}]);
