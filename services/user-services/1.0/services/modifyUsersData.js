// Import the User Modal for the Further Use
const User = require('../models/user.modal');

exports.createUser = function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const about = req.body.about;

  if (!email) {
    return res.status(422).send({
      error: 'You must enter an email address.'
    });
  }
  if (!firstName) {
    return res.status(422).send({
      error: 'You must enter your full name.'
    });
  }
  if (!lastName) {
    return res.status(422).send({
      error: 'You must enter your full name.'
    });
  }
  if (!phone) {
    return res.status(422).send({
      error: 'You must enter your 10 digit Phone Number.'
    });
  }
  User.findOne({
    email
  }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If user is not unique, return error
    if (existingUser) {
      return res
        .status(422)
        .send({
          error: 'That email address is already in use.'
        });
    }
    // If email is unique and Phone Number was provided, create account
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      phone: phone,
      address: address,
      about: about
    });

    user.save((err, data) => {
      if (err) {
        var error = {
          status: 'ERROR',
          message: 'Error saving User Data'
        };
        return res.json(error);
      }
      //Now return the json data of the new profile
      var jsonData = {
        status: 'OK',
        user: data
      };
      return res.json(jsonData);
    });
  });
};

/**
 * POST '/api/update/:id'
 * Receives a POST request with data of the animal to update, updates db, responds back
 * @param  {String} req.params.id - The animalId to update
 * @param  {Object} req. An object containing the different attributes of the Animal
 * @return {Object} JSON
 */
exports.updateUser = function (req, res, next) {
  //=== A blank object of data to update ===
  var dataToUpdate = {};
  var userId, username, password, firstName, lastName, email, phone;
  userId = req.body.userId;

  //=== If userId not found, return with error ===
  if (!userId) {
    var error = {
      status: 'error',
      message: 'You must provide the userId.'
    };
    return res.json(error);
  }
  //=== Get data from request body ===
  if (req.body.username) {
    username = req.body.username;
    dataToUpdate['username'] = username;
  }
  if (req.body.password) {
    password = req.body.password;
    dataToUpdate['password'] = password;
  }
  if (req.body.firstName) {
    firstName = req.body.firstName;
    dataToUpdate['firstName'] = firstName;
  }
  if (req.body.lastName) {
    lastName = req.body.lastName;
    dataToUpdate['lastName'] = lastName;
  }
  if (req.body.email) {
    email = req.body.email;
    dataToUpdate['email'] = email;
  }
  if (req.body.phone) {
    phone = req.body.phone;
    dataToUpdate['phone'] = phone;
  }

  User.findByIdAndUpdate(userId, dataToUpdate, function (err, data) {
    //=== If No User Found - Respond with Error.
    if (err || data == null) {
      var error = {
        status: 'error',
        message: 'Error updating user.'
      };
      return res.json(error);
    }
    //=== For Success - Respond with User Data.
    var jsonData = {
      status: 'success',
      data: data
    };
    return res.json(jsonData);
  });
};

/**
 * GET '/api/deleteUser/:id'
 * Receives a GET request specifying the animal to delete
 * @param  {String} req.params.id - The animalId
 * @return {Object} JSON
 */
exports.deleteUser = function (req, res) {
  var userId = req.params.id;
  User.findByIdAndRemove(userId, function (err, data) {
    //=== If No User Found - Respond with Error.
    if (err || data == null) {
      var error = {
        status: 'error',
        message: 'User not found to delete.'
      };
      return res.json(error);
    }
    //=== For Success - Respond with User Data.
    var jsonData = {
      status: 'success',
      message: 'Successfully deleted User : ' + userId
    };

    res.json(jsonData);
  });
};