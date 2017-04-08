/**
 * Created by marti on 2017-03-26.
 */

app.factory('Model', function ($resource) {

  var useCardStats = true;
  var loggedIn = false;
  var boardsLoaded = false;
  var boards;
  var loadingCounter = 0;
  var listTypes = ['To Do','In Progress','Verifying','Done'];

  //Authorize to the trello api
  this.authorize = function(cb) {
    Trello.authorize({
      type: 'popup',
      name: 'Getting Started Application',
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success: function() {
        console.log('Successful authentication');
        loggedIn = true;
        cb();
      },
      error: function() { console.log('Failed authentication'); }
    });
  };

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAnGNc08nedi09D3T-vSW-kLN_lFFEjcDA",
    authDomain: "storylines-784ba.firebaseapp.com",
    databaseURL: "https://storylines-784ba.firebaseio.com",
    projectId: "storylines-784ba",
    storageBucket: "storylines-784ba.appspot.com",
    messagingSenderId: "631528991893"
  };
  firebase.initializeApp(config);

  //TODO: Assign "boards" variable by callback function
  var loadBoards = function (cb) {
    // Get all of the information about the boards you have access to
    var success = function(data) {
      boards = data;
      for(var i = 0; i < boards.length; i++){
        loadLists(i, cb);
        //loadCards(i, cb);
      }
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    Trello.get('/member/me/boards', success, error);
  };

  var loadLists = function (boardIndex, cb) {

    var boardId = boards[boardIndex].id;

    var success = function (data) {
      boards[boardIndex].lists = data;
      loadCards(boardIndex, cb);
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    Trello.get('/boards/' + boardId + '/lists', success, error);

  }

  var loadCards = function (boardIndex, cb) {
    // Get all of the information about the boards you have access to
    var boardId = boards[boardIndex].id;

    var success = function(data) {
      boards[boardIndex].cards = data;
      //TODO: Uncomment this when function is implemented
      //boards[boardIndex].myCards = getUsersCards(boardIndex);

      //Calculate the statistics of the cards for this board
      //cardStats(boardIndex);
      //Call the callback when all the boards has got their cards
      if(++loadingCounter >= boards.length){
        if(useCardStats){
          cardStats(cb);
        }
        else{
          cb();
        }
      }
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    Trello.get('/boards/' + boardId + '/cards', success, error);

  }
  //TODO: Return all the cards that is assigned to the logged in user
  var getUsersCards = function(boardIndex){
 for(var i = 0; i < boards[boardIndex].cards.length; i++) {
     
 }
  }

  var cardStats = function (cb) {

    for(var i = 0; i < boards.length; i++){
      //Create array for holding the stats
      boards[i].cardStats = {
        mediumPriority : 0,
        lowPriority : 0,
        highPriority : 0
      };
      //Get the id of the list named "done"
      var doneListIdArray = boards[i].lists.filter(function (obj) {
        return obj.name.toLowerCase() == "done";
      });
      if(doneListIdArray.length != 0){
        var doneListId = doneListIdArray[0].id;
      }
      //Loop through all the cards and add statistics for each
      for(var j = 0; j < boards[i].cards.length; j++){
        var card = boards[i].cards[j];
        //Check the label of the card
        var labels = card.labels;
        if(labels.length == 0){
          //Give "unlabeled" cards low priority
          boards[i].cardStats.lowPriority++;
        }
        //Remove all the cards that are in the "done" list
        if(doneListId != undefined){
          if(card.idList == doneListId){
            break;
          }
        }
        for(var k = 0; k < labels.length; k++){
          //Remove the "done cards"
          if(labels[k].name.toLowerCase() == "done") {
            break;
          }
          if(labels[k].name.toLowerCase() == "high priority"){
            boards[i].cardStats.highPriority++;
            break;
          }
          else if(labels[k].name.toLowerCase() == "medium priority"){
            boards[i].cardStats.mediumPriority++;
            break;
          }
          else if(labels[k].name.toLowerCase() == "low priority"){
            boards[i].cardStats.lowPriority++;
            break;
          }
          else if(k == labels.length-1){
            //If it is the last label and it is none of the above then give it low priority
            boards[i].cardStats.lowPriority++;
            break;
          }
        }
      }
    }
    boardsLoaded = true;
    cb();
  };

  this.loadData = function (cb) {
    loadBoards(cb);
  }
 
  this.getBoards = function () {
    //Check if boards are not loaded
    if(!boardsLoaded){
      //console.error("Boards not loaded");
    }else{
      // console.log("Get boards call!");
      return boards;
    }
  };

  // Get board with specific id from the ones loaded.
  this.getBoard = function(id) {
    for(var i = 0; i < boards.length; i++) {
      if(boards[i].id == id)
        return boards[i];
    }
  }

  // Give the board with the id a new name
  this.changeBoardName = function(id, newName) {
    Trello.put('boards/'+id+'/name?value='+newName);
  }

  // TODO: getBoard() from sidebar gets called before the new board is added to boads.
  // Create a new board and post it to Trello
  this.createNewBoard = function() {
    Trello.post('/boards?name=New Project', function(board) {
      for(var i = 0; i < listTypes.length; i++) {
        //Some how three additional lists are added in trello. Translated to swedeish.
        Trello.post('/lists?idBoard='+board.id+'&name='+listTypes[i])
      }
      boards.push(board); // Add new board to array
    });
  }

  this.isLoggedIn = function () {
    return loggedIn;
  };

  this.boardsLoaded = function () {
    return boardsLoaded;
  };

  //Function for the user screen

  //TODO: Implement this function to add a user to the specified board
  this.addUser = function(boardId, userName){
    //GET /1/members/[idMember or username]
  }

  //TODO: Make this function remove a user from the board
  this.removeUser = function(boardId, memberId){
    //DELETE /1/boards/[board_id]/members/[idMember]
  }

  return this;

});
