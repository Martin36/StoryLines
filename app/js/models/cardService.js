/**
 * Created by martin on 2017-03-26.
 */
app.factory('CardService', function ($cookies, $resource, $firebaseArray) {

  var useCardStats = true;
  var loggedIn = false;
  var boardsLoaded = false;
  var boards = [];
  var loadingCounter = 0;
  var listTypes = ['To Do','In Progress','Verifying','Done'];
  var userId;

  //Authorize to the trello api
  this.authorize = function(cb, shouldLoadBoards) {
    Trello.authorize({
      type: 'popup',
      name: 'Getting Started Application',
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success: function() {
        loggedIn = true;
        if(shouldLoadBoards){
          loadBoards(cb);
        }else{
          cb();
        }
      },
      error: function() { console.log('Failed authentication'); }
    });
  };

  this.isLoggedIn = function () {
    return loggedIn;
  };

  this.logout = function () {
    loggedIn = false;
  }

  var loadBoards = function (cb) {
    // Get all of the information about the boards you have access to
    var success = function(data) {
      boards = data;
      if(data.length == 0){
        boardsLoaded = true;
        cb();
      }
      for(var i = 0; i < boards.length; i++){
        loadLists(i, cb);
      }
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    //First load the user Id
    Trello.get('/member/me', function (data) {
      userId = data.id;
      Trello.get('/member/me/boards', success, error);
    });
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
  };

  var loadCards = function (boardIndex, cb) {
    // Get all of the information about the boards you have access to
    var boardId = boards[boardIndex].id;
    var success = function(data) {
      boards[boardIndex].cards = data;
      //Call the callback when all the boards has got their cards
      if(++loadingCounter >= boards.length){
        loadCardLabels(boardIndex, cb);
      }
      else{
        loadCardLabels(boardIndex, cb);
      }
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
    Trello.get('/boards/' + boardId + '/cards', success, error);
  };

  // Load labels from firebase
  var loadCardLabels = function(boardIndex, cb) {
    var boardId = boards[boardIndex].id;
    var ref = firebase.database().ref().child(boardId);
    var obj = $firebaseArray(ref);

    obj.$loaded().then(function(){
      for(var i = 0; i < obj.length; i++) {
        var cardId = obj[i].$id;
        var cardIndex = findIndexOfCard(boardIndex, cardId);
        boards[boardIndex].cards[cardIndex].label = obj[i].label;
      }
      if(useCardStats){
        cardStats([], cb);
      }
      else {
        cb();
      }
    });
  }

  this.loadData = function (cb) {
    if(loggedIn){
      //Check if the boards are already loaded
      if(boardsLoaded){cb();}
      else{loadBoards(cb);}
    }else{
      //Authorize the user if not logged in
      this.authorize(cb, true);
    }
  };
  //Returns the id of the list with listName
  var getListId = function (listName, boardIndex) {
    var doneListIdArray = boards[boardIndex].lists.filter(function (obj) {
      return obj.name.toLowerCase() == listName;
    });
    if(doneListIdArray.length != 0){
      return doneListIdArray[0].id;
    }else{
      return undefined;
    }
  };

  //Adds my cards to the board
  var myCards = function(boardIndex){
    boards[boardIndex].myCards = [];
    if(boards[boardIndex].cards == undefined){
      return;
    }
    for(var i = 0; i < boards[boardIndex].cards.length; i++) {
      var currentCard = boards[boardIndex].cards[i];
      var doneListId = getListId("done", boardIndex);
      if(currentCard.idList != doneListId){
        var memberIds = currentCard.idMembers;
        for(var j = 0; j < memberIds.length; j++){
          if(memberIds[j] == userId){
            boards[boardIndex].myCards.push(currentCard);
          }
        }
      }
    }
  };

  var cardStatsOneBoard = function (boardIndex) {
    myCards(boardIndex);
    //Create array for holding the stats
    boards[boardIndex].cardStats = {
      highPriority : 0,
      mediumPriority : 0,
      lowPriority : 0
    };
    //Get the id of the list named "done"
    var doneListId = getListId("done", boardIndex);
    if(boards[boardIndex].cards == undefined){
      return;
    }
    //Loop through all the cards and add statistics for each
    for(var j = 0; j < boards[boardIndex].cards.length; j++) {
      var card = boards[boardIndex].cards[j];
      //Check the label of the card
      var label = card.label;
      // If there is no label
      if(label == undefined){
        boards[boardIndex].cardStats.lowPriority++;
        continue;
      } 
      //Remove all the cards that are in the "done" list
      if(doneListId != undefined){
        if(card.idList == doneListId){
          continue;
        }
      }
      if(label.toLowerCase() == "high priority"){
        boards[boardIndex].cardStats.highPriority++;
      }
      else if(label.toLowerCase() == "medium priority"){
        boards[boardIndex].cardStats.mediumPriority++;
      }
      else if(label.toLowerCase() == "low priority"){
        boards[boardIndex].cardStats.lowPriority++;
      }
      else {
        //If it is the last label and it is none of the above then give it low priority
        boards[boardIndex].cardStats.lowPriority++;
      }
    }
  };

  var cardStats = function (card, cb) {
    for(var i = 0; i < boards.length; i++){
      cardStatsOneBoard(i);
    }
    boardsLoaded = true;
    cb(card);
  };

  this.addNewCard = function(boardId, listName, cardName, cb) {
    // Go throught all boards
    for(var i = 0; i < boards.length; i++){
      // Find board with the correct id
      if(boards[i].id == boardId) {
        // Check if the list exist (If board was created on trello)
        var list = getList(boards[i].lists, listName);
        // Create list if it didn't exist
        if(list == null) {
          Trello.post('/lists?idBoard='+boardId+'&name='+listName, function(newList){
            boards[findBoardIndex(boardId)].lists.push(newList);
            addCardToList(newList.id, boardId, cardName, cb);
          });
        } else {
          addCardToList(list.id, boardId, cardName, cb);
        }
      }
    }
  };

  function addCardToList(listId, boardId, cardName, cb){
    Trello.post('cards?idList='+listId+"&name="+cardName+'&idMembers='+userId, function (card) {
      //When the card is added to the API, add the card to our cardService
      boards[findBoardIndex(boardId)].cards.push(card);
      cardStats(card, cb);
    }, function (errorMsg) {
      console.log(errorMsg)
    });
  }

  //Adds description to the card
  this.addDescriptionToCard = function(card){
    Trello.put("cards/"+card.id+"/desc?value="+card.desc);
  };

  this.changeNameOfCard = function (card) {
    Trello.put("cards/"+card.id +"/name?value="+card.name);
  };

  var findIndexOfCard = function (boardIndex, cardId) {
    for(var i = 0; i < boards[boardIndex].cards.length; i++){
      if(boards[boardIndex].cards[i].id == cardId){
        return i;
      }
    }
  };

  this.changeLabelOfCard = function (boardId, cardId, label) {
    var boardIndex = findBoardIndex(boardId);
    var cardIndex = findIndexOfCard(boardIndex, cardId);
    boards[boardIndex].cards[cardIndex].label = label;
    cardStatsOneBoard(boardIndex); // Update cardstats
  };

  this.moveCard = function(card, listName, cb){
		var idList = this.getListId(card.idBoard, listName);
    // If list not found create it first
    if(idList == listTypes) {
      Trello.post('/lists?idBoard='+card.idBoard+'&name='+listName, function(newList){
        boards[findBoardIndex(card.idBoard)].lists.push(newList);
        moveHelper(card, newList.id, cb);
      });
    }else {
      moveHelper(card, idList, cb);
    }
	};

  var removeCardFromMyCards = function (cardId, boardIndex) {
    for(var i = 0; i < boards[boardIndex].myCards.length; i++){
      var currentCard = boards[boardIndex].myCards[i];
      if(currentCard.id == cardId){
        //Remove the card from the array
        boards[boardIndex].myCards.splice(i, 1);
      }
    }
  }
  
  var moveHelper = function(card, idList, cb) {
    Trello.put("cards/"+card.id+"/idList?value="+idList);
    for(var i=0; i< boards.length; i++){
      for(var j=0; j< boards[i].cards.length; j++){
        if(boards[i].cards[j].id == card.id){
          boards[i].cards[j].idList= idList;
          removeCardFromMyCards(card.id, i);
        }
        cb();
      }
    }
  };

  this.deleteCard = function (boardId, cardId) {
    Trello.delete("cards/"+cardId);
    //Also delete from cardService
    for(var i = 0; i < boards.length; i++){
      if(boards[i].id == boardId){
        boards[i].cards = boards[i].cards.filter(function (card) {
          return card.id != cardId;
        });
        boards[i].myCards = boards[i].myCards.filter(function (card){
          return card.id != cardId;
        });
      }
    }
  };

  this.getBoards = function () {
    if(boardsLoaded){
      return boards;
    }
  };

  // Get board with specific id from the ones loaded.
  this.getBoard = function(id) {
    for(var i = 0; i < boards.length; i++) {
      if(boards[i].id == id)
        return boards[i];
    }
    return false; // If non existant
  }

  // Give the board with the id a new name
  this.changeBoardName = function(id, newName) {
    Trello.put('boards/'+id+'/name?value='+newName);
  }
  
  this.createNewBoard = function(cb) {
    Trello.post('/boards?name=New Project&defaultLists=false', function(board) {
      for(var i = 0; i < listTypes.length; i++) {
        //Make sure that all the API calls has been done before adding the board
        if(i == listTypes.length-1) {
          Trello.post('/lists?idBoard='+board.id+'&name='+listTypes[i], function () {
            boards.push(board); // Add new board to array
            loadLists(boards.length-1, function(){
              cb(board.id);
            });
          });
        }else {
          //Adds lists to board
          Trello.post('/lists?idBoard='+board.id+'&name='+listTypes[i])
        }
      }
    });
  };

  var findBoardIndex = function(boardId) {
    for(var i = 0; i < boards.length; i++){
      if(boards[i].id == boardId){
        return i;
      }
    }
  }

  this.addBoard = function(board) {
    boards.push(board);
  };

  this.deleteBoard = function(boardId) {
    Trello.delete("boards/"+boardId);
    for(var i = 0; i < boards.length; i++) {
      if(boards[i].id == boardId){
        boards.splice(i, 1);
      }
    }
  };

  this.boardsLoaded = function () {
    return boardsLoaded;
  };

  // Return the lists from the board
  var getList = function(lists, listName) {
    for(var i = 0; i < lists.length; i++) {
      if(lists[i].name == listName){
        return lists[i];
      }
    }
    return null;
  }

  // Returns the list with the name from the board with the id
  this.getListId = function(boardId, listName) {
    for(var i = 0; i < boards.length; i++) {
      if(boards[i].id == boardId) {
        for(var j = 0; j < boards[i].lists.length; j++) {
          if(boards[i].lists[j].name == listName) {
            return boards[i].lists[j].id;
          }
        }
      }
    }
    return listTypes;
  };

  this.getListsToShow = function() {
    return listTypes;
  };

  return this;
});
