Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  var room = 'lobby';

  Template.chat.helpers({
    room: room,
    messages: function() {
      return Messages.find({ room: room });
    }
  });

  var currentUserName = 'Jason';

  var sendChat = function(room, message) {
    Messages.insert({ room: room, author: currentUserName, body: message, date: new Date() });
  };

  Template.chat.events({
    'keyup input[name=new-message]': function(e) {
      if (e.keyCode === 13) {
        sendChat(room, e.target.value);
        e.target.value = '';
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Messages.find().count() === 0) {
      Messages.insert({ date: new Date(), room: 'lobby', author: 'Jason', body: 'Hello' });
      Messages.insert({ date: new Date(), room: 'lobby', author: 'Jason', body: 'welcome to the chat' });
      Messages.insert({ date: new Date(), room: 'lobby', author: 'Jason', body: 'come in!' });
      Messages.insert({ date: new Date(), room: 'otherchat', author: 'Jason', body: 'OTHER CHAT Hello' });
      Messages.insert({ date: new Date(), room: 'otherchat', author: 'Jason', body: 'OTHER CHAT welcome to the chat' });
      Messages.insert({ date: new Date(), room: 'otherchat', author: 'Jason', body: 'OTHER CHAT come in!' });
    }
    // code to run on server at startup
  });
}



