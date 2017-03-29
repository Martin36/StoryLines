'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'chart.js',
  'myApp.login',
  'myApp.sidebar',
  'myApp.myTasks',
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
    .when("/myTasks", {
      templateUrl: "my-tasks/my-tasks.html"
    })
    .when("/plannerHub", {
      templateUrl: "planner-hub/planner-hub.html",
    })
    .when("/projectPage", {
      templateUrl: "project-page/project-page.html",
      controller: "ProjectPageController"
    })
    .when("/userScreen", {
      templateUrl: "user-screen/user-screen.html",
    })
    .otherwise({redirectTo: '/login'});
}]).
// Directive for focus switching
// Source: https://jsfiddle.net/7L8vqf8u/3/
directive('focusMe', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
      element.bind('blur', function() {
        scope.$apply(model.assign(scope, false));
      })
    }
  };
});
