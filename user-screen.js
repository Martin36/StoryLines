
/* Implementation of the UserScreenCtrl that "talks" to the user-screen view (and model.js, in case 
data are real-time fetched from Trello making use of the Trello API) (by Jori Witte, April 17, 2017) */

'use strict';

/**
* Initially, the ui.grid dependency had been added to myApp in app.js.
* Instead of dynamically updating data retrieved by calling e.g., a web service, 
* a static JSON file had been created, containing dummy values (provisional).
 */
angular.module('myApp')


// Injection of the $http service into the UserScreenCtrl //
.controller('UserScreenCtrl', function ($scope,$http,$modal,$interval, $q) {
 

// Implementation of a menue button for the grid (settings icon), customizing the columns' menu
  var fakeI18n = function( title ){
    var deferred = $q.defer();
    $interval( function() {
      deferred.resolve( 'col: ' + title );
    }, 1000, 1);
    return deferred.promise;
  };


/** Data binding using http.get and retrieving local JSON user data using the $htp.get method
* to make the HTTP request to the userscreen.json file
* This enables the $http service to return a promise; the userscreen model will then be populated
* with the returned data within the .then method */

// TODO: make fetching real-time data using the Trello API possible (model.js)
$http.get('userscreen.json').then(function (response){
$scope.userscreen = response.data;

})

/* Specification of the grid the user data are loaded into, based on Angular ui-grid module
* and initialization of ui-grid.
*/

/** TODO: improving implementation of delete function for single selected rows. 
* Currently, the rows are not being deleted after pressing the delete button.
*/

$scope.gridOptions = {
exporterMenuCsv: true,
enableGridMenu: true,
gridMenuTitleFilter: fakeI18n,

data: 'userscreen',

showGroupPanel: true,
enableColumnResizing: true,
enableFiltering: true,
showGridFooter: true,
showColumnFooter: true,
enableCellSelection: true,
enableCellEditOnFocus: true,
enableFiltering: true,
paginationPageSizes: [15, 25, 50],
paginationPageSize: 15,
enableVerticalScrollbar: 1,
enableHorizontalScrollbar: 1,
enableColumnResizing: true,


columnDefs: [
{field:'no', displayName:'No.', minWidth: 20, width: 40, pinnedLeft:true},
{field:'name', displayName:'Name', cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD.first }} {{ COL_FIELD.last }}</div>', enableCellEdit: true, width: '20%', maxWidth: 200, minWidth: 70, pinnedLeft:false},
{field:'email', displayName:'eMail', cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{ COL_FIELD }}">Send E-Mail</a></div>', width: '20%', pinnedRight:false},
{field:'userType', displayName:'Experience Level', width: '20%', pinnedRight:false},
{field:'stories', displayName:'No. of Stories',  width: '20%', pinnedRight:false},
{field:'joinDate', displayName:'Date of Joining', width: '20%', pinnedRight:false},
{field: 'edit', cellTemplate: '<button id="editBtn" type="button" class="btn-small glyphicon glyphicon-pencil" ng-click="grid.appScope.editUser(row.entity)" ></button> '
},
{field: 'remove', cellTemplate: '<button id="removeBtn" type="button" class="btn-small glyphicon glyphicon-remove" ng-click="grid.appScope.removeUser(row.entity)" ></button> '
}
],

} 
  


// Implemention of the option to edit a data entry 
    $scope.editUser = function(data) {
      alert('Edit ' + data.no + data.name + data.userType + data.stories + data.joinDate);
    }
// Implemention of the option to delete a data entry 
      $scope.removeUser = function(data) {
      alert('Remove ' + data.no + data.name + data.userType + data.stories + data.joinDate);
    }

// Implementation of the modal window that pops up after user clicks the "Add User" button.
$scope.showModal=function () {
$scope.newUser={};
var modalInstance = $modal.open({
templateUrl: 'user-screen/add-user.html',
controller:'AddNewUserCtrl',

resolve: {
newUser: function () {
return $scope.newUser;
}
}
})

/** The data returned to the newUser model (in responding to the promise)
* are being pushed into the userscreen model.
*/

modalInstance.result.then(function (selectedItem) {
$scope.userscreen.push({
no:$scope.newUser.length+1,
first:$scope.newUser.first,
last:$scope.newUser.last,
email:$scope.newUser.email,
userType:$scope.newUser.userType,
stories:$scope.newUser.stories,
joinDate:$scope.newUser.joinDate
});
});
}


})

/** Definition of the functions for the "Cancel" button within the AddNewUserCtrl
* and for saving the new user.
* $modal service uses promises to return objects and variables.
* Hence the newUser model object is being returned using resolve.
*/

.controller('AddNewUserCtrl', function ($scope, $modalInstance, newUser) {


$scope.newUser=newUser;
$scope.saveNewUser=function(){
    $modalInstance.close(newUser);
};

$scope.cancel =function(){
    $modalInstance.dismiss('cancel');
}

// Function to submit the form after all validation has occurred            
  $scope.submitForm = function(isValid) {

// Check to make sure the form is completely valid
    if (isValid) {
      alert('Congratulations! A new user had been added to the Storylines database!');
    }

  }

});







