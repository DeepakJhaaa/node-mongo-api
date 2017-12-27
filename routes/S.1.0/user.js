// Import the User Modal for the Further Use
const User = require('./models/user.modal');

//========================================
// Registration Route
//========================================
exports.register = function (req, res, next) {
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
exports.getUsers = function (req, res) {

    User.find(function (err, data) {
        //If err or No Profile found, respond with error 
        if (err || data == null) {
            var error = { status: 'ERROR', message: 'Could not find Profile' };
            return res.json(error);
        }

        // otherwise, respond with the data 
        var jsonData = {
            status: 'OK',
            users_all: data
        }
        res.json(jsonData);
    })

};

exports.getUser = function (req, res) {

    var requestedId = req.params.id;
    User.findById(requestedId, function (err, data) {

        // if err or no user found, respond with error 
        if (err || data == null) {
            var error = { status: 'ERROR', message: 'Could not find that animal' };
            return res.json(error);
        }

        // otherwise respond with JSON data of the animal
        var jsonData = {
            status: 'OK',
            user: data
        }

        return res.json(jsonData);

    })
};