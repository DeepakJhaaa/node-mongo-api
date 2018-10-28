//Import of Required Node Modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Import of All the Module specific API's
const _getUsr = require('./_getUsersData');
const _modUsr = require('./_modifyUsersData');
const _auth = require('./_authentication');

// List of All the Routes available for API Version u1

router.get('/getAllUser', _getUsr.getUsers);
router.get('/getUser/:id', _getUsr.getUser);
router.get('/searchUser', _getUsr.searchUser);
router.post('/createUser', _modUsr.create);
router.delete('/removeUser/:id', _modUsr.delete);
router.post('/updateUser/:id', _auth.check, _modUsr.update);

router.post('/api/admin/signin', _auth.signin);
router.post('/api/admin/signup', _auth.signup);
router.post('/api/admin/signout', _auth.check, _auth.signout);
router.post('/api/admin/update', _auth.check, _auth.update);
router.post('/api/admin/delete', _auth.check, _auth.delete);

//Export this Module to the Main Module of server
module.exports = router;