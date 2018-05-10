// Import the User Modal for the Further Use
const User = require("./models/user.modal");
const Message = require("./models/message.modal");
const Conversation = require("./models/conversation.modal");

//========================================
// Registration Route
//========================================
exports.newMessage = function(req, res) {
  const conversation = new Conversation({
    participants: [req.body._id, req.body.recipient]
  });

  conversation.save((err, newConversation) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.body._id
    });

    message.save((err, newMessage) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      return res.status(200).json({
        message: "Conversation started!",
        conversationId: conversation._id
      });
    });
  });
};
exports.replyMessage = function(req, res) {
  console.log("author :" + req.body._id);
  const reply = new Message({
    conversationId: req.body.conversationId,
    body: req.body.composedMessage,
    author: req.body._id
  });

  reply.save((err, sentReply) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: "Reply successfully sent!" });
  });
};
exports.Conversataion = function(req, res, next) {
  Message.find({ conversationId: req.body.conversationId })
    .select("createdAt body author")
    .sort("-createdAt")
    .populate({
      path: "author",
      select: "profile.username"
    })
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ conversation: messages });
    });
};
exports.AllConversations = function(req, res, next) {};
