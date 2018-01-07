// Import the User Modal for the Further Use
const User = require('./models/users.modal');

exports.create = function (req, res, next) {
    //router.post('/api/user/create', function (req, res) {
    // Check for registration errors

    const displayName = req.body.displayName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }
    // Return error if full name not provided
    if (!displayName) {
        return res.status(422).send({ error: 'You must enter your full name.' });
    }
    // Return error if no password provided
    if (!phoneNumber) {
        return res.status(422).send({ error: 'You must enter your 10 digit Phone Number.' });
    }
    // Find if email ID already exists or not
    User.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }
        // If email is unique and Phone Number was provided, create account
        const user = new User({
            displayName: displayName,
            email: email,
            phoneNumber: phoneNumber
        });

        user.save((err, data) => {
            if (err) {
                var error = { status: 'ERROR', message: 'Error saving User Data' };
                return res.json(error);
            }
            //Now return the json data of the new profile
            var jsonData = {
                status: 'OK',
                user: data
            }
            return res.json(jsonData);
        });
    });
};

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the animal to update, updates db, responds back
//  * @param  {String} req.params.id - The animalId to update
//  * @param  {Object} req. An object containing the different attributes of the Animal
//  * @return {Object} JSON
//  */
exports.update = function (req, res) {
    // router.post('/api/update/:id', function (req, res) {

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

}

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the animal to delete
 * @param  {String} req.params.id - The animalId
 * @return {Object} JSON
 */
exports.delete = function (req, res) {
    //router.get('/api/delete/:id', function (req, res) {

    var requestedId = req.params.id;

    // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
    User.findByIdAndRemove(requestedId, function (err, data) {
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

}