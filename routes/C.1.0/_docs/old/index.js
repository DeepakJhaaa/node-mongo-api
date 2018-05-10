//Import of Required Node Modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Import of All the Module specific API's
const _usr = require('./user');
const _msg = require('./message');

// List of All the Routes available for API Version v1
router.post('/api/user/register', _usr.register);
router.get('/api/user/get', _usr.getUsers);
router.get('/api/user/get/:id', _usr.getUser);
router.post('/api/message/new', _msg.newMessage);
router.post('/api/message/reply', _msg.replyMessage);
router.post('/api/message/getConversation', _msg.Conversataion);
router.post('/api/message/getAllConversations', _msg.AllConversations);

//Export this Module to the Main Module of server
module.exports = router;