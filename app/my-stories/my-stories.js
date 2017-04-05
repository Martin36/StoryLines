/**
 * Created by marti on 2017-03-25.
 */
angular.module('myApp.myStories', [])
  .controller('MyStoriesController', function ($scope, Model) {
    //TODO: Wait for data to load in model
    Model.loadData(function () {
      $scope.boards = Model.getBoard();
        $scope.myCards=Model.getUsersCards();
      //console.log($scope.boards[0].cards);
        /*Trello.get('organization/'+orgId+'/boards/?token='+token+'&lists=open', function(boards) {
        $.each(boards, function(ix, board) {
            Trello.get('boards/'+board.id+'/lists?cards=all&token='+token, function(lists) {
                $.each(lists, function(lx, list) {
                if(list.name.toLowerCase()=='doing' && list.cards.length > 0) {
                    console.log(board.name);
                }
            });
        });
    });
});*/
      //TODO: Figure out why this is needed for it to work
      $scope.$apply();
        
       /* var loadBoards = function() {		     
            //Get the users boards		      
            Trello.get('/members/me/boards/',		        loadedBoards,	
            function() { console.log("Failed to load boards"); }	
        );		   
        };*/
    });
  });
