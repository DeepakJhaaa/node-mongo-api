var express = require('express');
var router = express.Router();

//Import of All the Module specific API's
const _getUsr = require('../services/getUsersData');
const _modUsr = require('../services/modifyUsersData');
const _auth = require('../services/authentication');

// List of All the Routes available for API Version u1

router.get('/getAllUser', _getUsr.getUsers);
router.get('/getUser/:id', _getUsr.getUser);
router.get('/searchUser', _getUsr.searchUser);
router.post('/createUser', _modUsr.createUser);
router.post('/updateUser/:id', _auth.verify, _modUsr.updateUser);
router.post('/signin', _auth.userLogin);
router.delete('/removeUser/:id', _modUsr.deleteUser);

//Export this Module to the Main Module of server
module.exports = router;