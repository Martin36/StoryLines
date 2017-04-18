/**
 * Created by marti on 2017-03-26.
 */

app.factory('Model', function ($cookies, $resource) {

  var useCardStats = true;
  var loggedIn = false;
  var boardsLoaded = false;
  var boards = [];
  //console.log($cookies.get("boards"));
  var loadingCounter = 0;
  var userId;
  var listTypes = ['To Do','In Progress','Verifying','Done'];
  var lables =
  [{
    name: 'Low Priority',
    color: 'green'
  },
  {
    name: 'Medium Priority',
    color: 'yellow'
  },
  {
    name: 'High Priority',
    color: 'red'
  }];

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
        console.log('Successful authentication');
        loggedIn = true;
        if(shouldLoadBoards){
          loadBoards(cb);
        }else{
          cb();
        }
        //cb();
      },
      error: function() { console.log('Failed authentication'); }
    });
  };
  /*
  this.logout = function () {
    Trello.deauthorize();
    loggedIn = false;
    console.log("Logged out!");
    boardsLoaded = false;
    boards = [];
    loadingCounter = 0;
  }
  */
  this.logout = function () {
    loggedIn = false;
  }
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
  };

  //TODO: Return all the cards that is assigned to the logged in user
  var myCards = function(boardIndex){
    boards[boardIndex].myCards = [];
    for(var i = 0; i < boards[boardIndex].cards.length; i++) {
      var currentCard = boards[boardIndex].cards[i];
      var memberIds = currentCard.idMembers;
      for(var j = 0; j < memberIds.length; j++){
        if(memberIds[j] == userId){
          boards[boardIndex].myCards.push(currentCard);
        }
      }
    }
  };

  var cardStats = function (cb) {

    for(var i = 0; i < boards.length; i++){
      //Add my cards to the board
      myCards(i);
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
    if(loggedIn){
      //Check if the boards are already loaded
      if(boardsLoaded){cb();}
      else{loadBoards(cb);}
    }else{
      //Authorize the user if not logged in
      this.authorize(cb, true);
    }
  };

  this.getBoards = function () {
    //Check if boards are loaded
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

  // Add lables to specific board
  var addLables = function(boardId, cb) {
    for(var i = 0; i < lables.length; i++){
        var l = lables[i];
        Trello.post('/boards/'+boardId+'/labels?name='+l.name+'&color='+l.color);
    }
    cb();
  };

  // Create a new board and post it to Trello
  this.createNewBoard = function(cb) {
    Trello.post('/boards?name=New Project&defaultLists=false&defaultLables=false', function(board) {
      addLables(board.id, function(){
        for(var i = 0; i < listTypes.length; i++) {
          //Make sure that all the API calls has been done before adding the board
          if(i == listTypes.length-1) {
            Trello.post('/lists?idBoard='+board.id+'&name='+listTypes[i], function () {
              boards.push(board); // Add new board to array
              loadLists(boards.length-1, function(){
                cb(board.id);
              });
            });
          }
          //Adds lists to board
          Trello.post('/lists?idBoard='+board.id+'&name='+listTypes[i])
        }
      });
    });
  };

  this.addBoard = function(board) {
    boards.push(board);
  };

  // Adds a new card to the api
  this.addNewCard = function(boardId, listName, cardName, cb) {
    // Go throught all boards
    for(var i = 0; i < boards.length; i++){
      // Find board with the correct id
      if(boards[i].id == boardId) {
        // Check if the list exist (If board was created on trello)
        var list = getList(boards[i].lists, listName);
        // Create board if it didn't exist
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

  // Adds a card to the given list
  function addCardToList(listId, boardId, cardName, cb){
    // Add new card to API
    Trello.post('cards?idList='+listId+"&name="+cardName, function (card) {
      //When the card is added to the API, add the card to our model
      boards[findBoardIndex(boardId)].cards.push(card);
      cb();
    }, function (errorMsg) {
      console.log(errorMsg)
    });
  }

  // Return the lists from the board
  // Return null if it don't exist
  var getList = function(lists, listName) {
    for(var i = 0; i < lists.length; i++) {
      if(lists[i].name == listName){
        return lists[i];
      }
    }
    return null;
  }

  var findBoardIndex = function(boardId) {
    for(var i = 0; i < boards.length; i++){
      if(boards[i].id == boardId){
        return i;
      }
    }
  }

  this.isLoggedIn = function () {
    return loggedIn;
  };

  this.boardsLoaded = function () {
    return boardsLoaded;
  };

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

  //Function for the user screen
  //TODO: Implement this function to add a user to the specified board
  this.addUser = function(boardId, userName){
    //GET /1/members/[idMember or username]
  };

  //TODO: Make this function remove a user from the board
  this.removeUser = function(boardId, memberId){
    //DELETE /1/boards/[board_id]/members/[idMember]
  };

  //Adds description to the card
  this.addDescriptionToCard = function(card){
    Trello.put("cards/"+card.id+"/desc?value="+card.desc);
  };

  this.changeNameOfCard = function (card) {
    Trello.put("cards/"+card.id +"/name?value="+card.name);
  };

  this.deleteCard = function (boardId, cardId) {
    Trello.delete("cards/"+cardId);
    //Also delete from the model
    for(var i = 0; i < boards.length; i++){
      if(boards[i].id == boardId){
        boards[i].cards = boards[i].cards.filter(function (card) {
          return card.id != cardId;
        });
      }
    }
  };

  this.deleteBoard = function(boardId) {
    Trello.delete("boards/"+boardId);
    for(var i = 0; i < boards.length; i++) {
      if(boards[i].id == boardId){
        boards.splice(i, 1);
      }
    }
  };

  var createWebhook = function () {
    //this.loadUserId();
    var success = function (data) {
      console.log(data);
    };
    var error = function(errorMsg) {
      console.log(errorMsg);
    };
//    Trello.get('/members/'+userId+'/tokens', success, error);
    //TODO: Make this work
    var token = Trello.token();

    console.log(token);

     $.post("https://api.trello.com/1/tokens/"+userToken+"/webhooks/?key=d55de169d8cbf243f781b431c5b458e0", {
     description: "My first webhook",
     callbackURL: "http://localhost:63342/StoryLines/app/index.html?_ijt=8l5f822ie37itbr2gq2uk8spct#!/login",
     idModel: "4d5ea62fd76aa1136000000c"
     });
  };

  return this;
});
