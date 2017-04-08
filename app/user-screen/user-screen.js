/**
 * Created by Jori on 2017-03-31.
 */

 /** The sub-module myApp.userScreen construction uses the angular.module method call
 * that takes the name of the new module as a string and an array of its dependencies
 */
angular.module('myApp.userScreen', [])
  .controller('UserScreenController', function ($routeParams, $rootScope, $scope, Model) {
/*
        var myUser = this;

            myUser.userId = $routeParams['userId'];
            myUser.user = user.data;

            myUser.getAssignedStories = function (userId, stories) {
                var assignedStories = {};

                Object.keys(stories, function(key, value) {
                    if (value.assignee == userId) assignedStories[key] = stories[key];
                });

                return assignedStories;
            };

            myUser.stories = myUser.getAssignedStories(myUser.userId, stories);

        var linker = function (scope, element, attrs) {
                // element
                //     .mouseover(function () {
                //         element.css({ 'opacity': 0.9 });
                //     })
                //     .mouseout(function () {
                //         element.css({ 'opacity': 1.0 })
                //     });
            };

        var controller = function () {
                var userStory = this;
                userStory.deleteStory = function (id) {
                    StoriesModel.destroy(id)
                        .then(function (result) {
                            $rootScope.$broadcast('storyDeleted');
                            $log.debug('RESULT', result);
                        }, function (reason) {
                            $log.debug('ERROR', reason);
                        });
                };
            };

            return {
                restrict: 'A',
                controller: controller,
                controllerAs: 'userStory',
                link: linker
            };
            */
        });
