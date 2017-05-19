var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Collection Name for the Profile in DB
var Animal = require("../../models/model.js");
var conezero_Profile = require("./models/profile.model.js");

// simple route to render am HTML form that can POST data to our server
// NOTE that this is not a standard API route, and is really for testing
router.get('/create-pet', function (req, res) {
  res.render('pet-form.html')
})

// simple route to render an HTML page that pulls data from our server and displays it on a page
// NOTE that this is not a standard API route, and is really for testing
router.get('/show-pets', function (req, res) {
  res.render('show-pets.html')
})

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function (req, res) {

  var jsonData = {
    'name': 'node-express-api-boilerplate',
    'api-status': 'OK'
  }

  // respond with json data
  res.json(jsonData)
});

// simple route to show an HTML page
router.get('/sample-page', function (req, res) {
  res.render('sample.html')
})


//Receives a POST request of the new Profile, saves to db, responds back
router.post('/api/profile/create', function (req, res) {

  //Pullout the information from the req.body
  var name = req.body.name;
  var age = req.body.age;
  var gender = req.body.gender;
  var email = req.body.email;
  var geo_coords = req.body.geo_coords;
  var preference = req.body.preference;
  var mood = req.body.mood;
  var contacts = req.body.contacts;

  //Hold all this data in an object and it be structured same as DB Model
  var profileObj = {
    name: name,
    age: age,
    gender: gender,
    email: email,
    geo_coords: geo_coords,
    preference: preference,
    mood: mood,
    contacts: contacts
  }

  //Create a new Profile model instance, Passing in the object
  var profile = new conezero_Profile(profileObj);

  //Now, save that profile instance to the database  
  profile.save(function (err, data) {
    //If err saving, respond back with error
    if (err) {
      var error = { status: 'ERROR', message: 'Error saving Profile Data' };
      return res.json(error);
    }
    console.log('saved a new animal!');

    //Now return the json data of the new profile
    var jsonData = {
      status: 'OK',
      profile: data
    }
    return res.json(jsonData);
  })
});


//Receives a GET request specifying the list of All Profile  to get
router.get('/api/profile/get/:id', function (req, res) {

  var requestedId = req.params.id;

  conezero_Profile.findById(requestedId, function (err, data) {

    // if err or no user found, respond with error 
    if (err || data == null) {
      var error = { status: 'ERROR', message: 'Could not find that animal' };
      return res.json(error);
    }

    // otherwise respond with JSON data of the animal
    var jsonData = {
      status: 'OK',
      animal: data
    }

    return res.json(jsonData);

  })
})

//Receives a GET request to get all Profile details
router.get('/api/profile/get', function (req, res) {

  conezero_Profile.find(function (err, data) {
    //If err or No Profile found, respond with error 
    if (err || data == null) {
      var error = { status: 'ERROR', message: 'Could not find Profile' };
      return res.json(error);
    }

    // otherwise, respond with the data 
    var jsonData = {
      status: 'OK',
      animals: data
    }
    res.json(jsonData);
  })

})

//  * Receives a GET request to search an Profile
router.get('/api/profile/search', function (req, res) {

  //First use req.query to pull out the search query
  var searchTerm = req.query.name;
  console.log("we are searching for " + searchTerm);

  // let's find that Profile
  conezero_Profile.find({ name: searchTerm }, function (err, data) {
    // if err, respond with error 
    if (err) {
      var error = { status: 'ERROR', message: 'Something went wrong' };
      return res.json(error);
    }

    //if no animals, respond with no animals message
    if (data == null || data.length == 0) {
      var message = { status: 'NO RESULTS', message: 'We couldn\'t find any results' };
      return res.json(message);
    }

    // otherwise, respond with the data 

    var jsonData = {
      status: 'OK',
      profile: data
    }

    res.json(jsonData);
  })

})

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the animal to update, updates db, responds back
//  * @param  {String} req.params.id - The animalId to update
//  * @param  {Object} req. An object containing the different attributes of the Animal
//  * @return {Object} JSON
//  */

router.post('/api/update/:id', function (req, res) {

  var requestedId = req.params.id;

  var dataToUpdate = {}; // a blank object of data to update

  // pull out the information from the req.body and add it to the object to update
  var name, age, weight, color, url;

  // we only want to update any field if it actually is contained within the req.body
  // otherwise, leave it alone.
  if (req.body.name) {
    name = req.body.name;
    // add to object that holds updated data
    dataToUpdate['name'] = name;
  }
  if (req.body.age) {
    age = req.body.age;
    // add to object that holds updated data
    dataToUpdate['age'] = age;
  }
  if (req.body.weight) {
    weight = req.body.weight;
    // add to object that holds updated data
    dataToUpdate['description'] = {};
    dataToUpdate['description']['weight'] = weight;
  }
  if (req.body.color) {
    color = req.body.color;
    // add to object that holds updated data
    if (!dataToUpdate['description']) dataToUpdate['description'] = {};
    dataToUpdate['description']['color'] = color;
  }
  if (req.body.url) {
    url = req.body.url;
    // add to object that holds updated data
    dataToUpdate['url'] = url;
  }

  var tags = []; // blank array to hold tags
  if (req.body.tags) {
    tags = req.body.tags.split(","); // split string into array
    // add to object that holds updated data
    dataToUpdate['tags'] = tags;
  }


  console.log('the data to update is ' + JSON.stringify(dataToUpdate));

  // now, update that animal
  // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
  Animal.findByIdAndUpdate(requestedId, dataToUpdate, function (err, data) {
    // if err saving, respond back with error
    if (err) {
      var error = { status: 'ERROR', message: 'Error updating animal' };
      return res.json(error);
    }

    console.log('updated the animal!');
    console.log(data);

    // now return the json data of the new person
    var jsonData = {
      status: 'OK',
      animal: data
    }

    return res.json(jsonData);

  })

})

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the animal to delete
 * @param  {String} req.params.id - The animalId
 * @return {Object} JSON
 */

router.get('/api/delete/:id', function (req, res) {

  var requestedId = req.params.id;

  // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
  Animal.findByIdAndRemove(requestedId, function (err, data) {
    if (err || data == null) {
      var error = { status: 'ERROR', message: 'Could not find that animal to delete' };
      return res.json(error);
    }

    // otherwise, respond back with success
    var jsonData = {
      status: 'OK',
      message: 'Successfully deleted id ' + requestedId
    }

    res.json(jsonData);

  })

})

module.exports = router;