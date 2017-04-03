/**
 * Created by marti on 2017-03-26.
 */

app.factory('Model', function ($resource) {

  var loggedIn = false;
  var boardsLoaded = false;
  var boards;
  var loadingCounter = 0;

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

  //this.authorize();
  //TODO: Assign "boards" variable by callback function
  var loadBoards = function (cb) {

    // Get all of the information about the boards you have access to
    var success = function(data) {
      boards = data;
      // console.log(boards);
      //cb(boards);
      boardsLoaded = true;
      for(var i = 0; i < boards.length; i++){
        loadCards(i, cb);
      }
      //loadAllCards(cb);
      //loadCards(cd);
      //console.log(data);
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    Trello.get('/member/me/boards', success, error);

  };

  var loadCards = function (boardIndex, cb) {
    // Get all of the information about the boards you have access to
    var boardId = boards[boardIndex].id;

    var success = function(data) {
      boards[boardIndex].cards = data;
      //Calculate the statistics of the cards for this board
      //cardStats(boardIndex);
      //Call the callback when all the boards has got their cards
      if(++loadingCounter >= boards.length){
        cb();
      }
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    Trello.get('/boards/' + boardId + '/cards', success, error);

  }
  //TODO: Implement this
  var cardStats = function (boardIndex) {
    boards[boardIndex].cardStats = [];
    //Loop through all the cards and add statistics for each
    for(var i = 0; i < boards[boardIndex].cards.length; i++){

    }
  }

  this.loadData = function (cb) {
    loadBoards(cb);
  }

  this.getBoards = function () {
    //Check if boards are not loaded
    if(!boardsLoaded){
      //console.error("Boards not loaded");
      //loadBoards(cb);
    }else{
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

  this.isLoggedIn = function () {
    return loggedIn;
  };

  this.boardsLoaded = function () {
    return boardsLoaded;
  };

  return this;

});
