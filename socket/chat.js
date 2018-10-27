module.exports = function (io) {
  io.on('connection', socket => {
    console.log('User Connected on Socket.');

    socket.on('join', (params, callback) => {
      // console.log(params);
      socket.join(params.conversationID);
    });

    socket.on('createMessage', message => {
      console.log(message.conversationID);
      io.to(message.conversationID).emit('newMessage', {
        text: message.text,
        conversationID: message.conversationID
      });
    });
  });
};