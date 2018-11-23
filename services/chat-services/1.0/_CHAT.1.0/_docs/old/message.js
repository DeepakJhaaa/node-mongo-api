// Import the User Modal for the Further Use
const User = require('./models/user.modal');
const Message = require('./models/message.modal');
const Conversation = require('./models/conversation.modal');

//========================================
// Registration Route
//========================================
exports.newMessage = function (req, res) {
    console.log("New Message API Called -001");
    console.log("_id : " + req);
    console.log("recipient : " + req.body.recipient);
    const conversation = new Conversation({
        participants: [req.body._id, req.body.recipient]
    });

    conversation.save((err, newConversation) => {
        console.log("new conversation ID");
        console.log(newConversation._id);
        if (err) {
            res.send({
                error: err
            });
            return next(err);
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.composedMessage,
            author: req.body._id
        });

        message.save((err, newMessage) => {
            if (err) {
                res.send({
                    error: err
                });
                return next(err);
            }

            return res.status(200).json({
                message: 'Conversation started!',
                conversationId: conversation._id
            });
        });
    });
}
exports.replyMessage = function (req, res) {
    const reply = new Message({
        conversationId: req.body.conversationId,
        body: req.body.composedMessage,
        author: req.body._id
    });

    reply.save((err, sentReply) => {
        if (err) {
            res.send({
                error: err
            });
            return next(err);
        }

        return res.status(200).json({
            message: 'Reply successfully sent!'
        });
    });
}
exports.Conversataion = function (req, res, next) {
    Message.find({
            conversationId: req.body.conversationId
        })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
        })
        .exec((err, messages) => {
            if (err) {
                res.send({
                    error: err
                });
                return next(err);
            }

            return res.status(200).json({
                conversation: messages
            });
        });
}
exports.AllConversations = function (req, res, next) {}