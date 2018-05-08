var express = require('express');
var router = express.Router();

/*
 * GET '/'
 * Default home route. Redirect to Signin Page.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function (req, res) {

  // Redirecting to  Signin page for default
  res.render('login.html');
});

module.exports = router;