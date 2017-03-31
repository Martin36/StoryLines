'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'chart.js',
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
}]).
// Directive for focus switching
// Source: http://www.jomendez.com/2015/10/05/focus-on-input-field-in-angularjs-mini-challenge-8-answer/
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
