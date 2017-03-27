/**
 * Created by marti on 2017-03-26.
 */

app.factory('Model', function ($resource) {

  var loggedIn = false;
  var boardsLoaded = false;
  var cardsLoaded = false;
  var boards;
  var cards;
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

    //loadBoards();
  };

  //this.authorize();
  //TODO: Assign "boards" variable by callback function
  var loadBoards = function (cb) {

    // Get all of the information about the boards you have access to
    var success = function(data) {
      boards = data;
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

  var loadAllCards = function(cb){

    // Get all of the information about the boards you have access to
    var success = function(data) {
      cards = data;
      cardsLoaded = true;
      cb();
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    Trello.get('/member/me/cards', success, error);

  };

  this.loadData = function (cb) {
    loadBoards(cb);
  }

  this.getBoards = function () {
    //Check if boards are not loaded
    if(!boardsLoaded){
      console.error("Boards not loaded");
      //loadBoards(cb);
    }else{
      return boards;
    }
  };

  //Returns the cards from the board with "boardId"
  this.getCards = function (boardId) {
    if(!cardsLoaded){
      console.error("Cards not loaded");
      //loadBoards(cb);
    }else{
      //Return only the cards that belongs to the board with "boardId"
      return cards.filter(function (card) {
        return card.idBoard === boardId;
      });
    }
  };

  this.isLoggedIn = function () {
    return loggedIn;
  };

  this.boardsLoaded = function () {
    return boardsLoaded;
  };

  return this;

});
