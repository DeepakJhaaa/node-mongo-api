//Import of Required Node Modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Import of All the Module specific API's
const _getUsr = require('./_getUsersData');
const _modUsr = require('./_modifyUsersData');
const _auth = require('./_authentication');
const _msg = require('./_message');

// List of All the Routes available for API Version v1
router.post('/api/message/new', _msg.newMessage);
router.post('/api/message/reply', _msg.replyMessage);
router.post('/api/message/getConversation', _msg.Conversataion);
router.post('/api/message/getAllConversations', _msg.AllConversations);

router.get('/api/user/get', _getUsr.getUsers);
router.get('/api/user/get/:id', _getUsr.getUser);
router.get('/api/user/profile', _getUsr.getProfile);
router.get('/api/user/search', _getUsr.searchUser);
router.post('/api/user/create', _modUsr.create);
router.post('/api/user/delete/:id', _auth.check, _modUsr.delete);
router.post('/api/user/update/:id', _auth.check, _modUsr.update);

router.post('/api/user/signin', _auth.signin);
router.post('/api/user/signup', _auth.signup);
router.post('/api/user/signout', _auth.check, _auth.signout);
router.post('/api/user/update', _auth.check, _auth.update);
router.post('/api/user/delete', _auth.check, _auth.delete);

//Export this Module to the Main Module of server
module.exports = router;
