var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var jsonData = {
    name: 'node-express-api-boilerplate',
    'api-status': 'OK',
  };
  res.render('login.html');
});

module.exports = router;