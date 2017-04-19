/**
 * Created by marti on 2017-03-25.
 */
app.controller('MyStoriesController', function ($scope, Model) {

    if(!Model.boardsLoaded()){
      $scope.loading = true;
    }

    $scope.showdetails =function (card){
      $scope.clickedCard = card;
      $scope.showEdit =true;
    };
    $scope.done = function () {
      $scope.showEdit = false;
    };
    $scope.cancel = function () {
      $scope.showEdit = false;
    };
   
    var loadBoards = function () {
      Model.loadData(function(){
        $scope.boards = Model.getBoards();
        $scope.loading = false;
        $scope.$evalAsync();
      });
    };
    if(Model.boardsLoaded()){
      $scope.boards = Model.getBoards();
      $scope.loading = false;
    }else{
      loadBoards();
    }

    $scope.toggleDropdown = function (card) {
      card.showDropdown = !card.showDropdown;
    };

    $scope.closeDropdown = function (card) {
      card.showDropdown = false;
    };
	
	//to come out of the popup.
	$scope.done=function(){
		$scope.showEdit=false;
	};
	
	//to move card from one page to another
	$scope.movecard = function(card, listname)
	{
		Model.moveCard(card, listname);
	};
}
);
