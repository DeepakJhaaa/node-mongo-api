var User = require('../models/user.modal');

/**
 * GET '/api/getUsers'
 * Receives a GET request to get all animal details
 * @return {Object} JSON
 */
exports.getUsers = function (req, res) {
    User.find(function (err, data) {
        //=== If No User Found - Respond with Error.
        if (err || data == null) {
            var error = {
                status: 'error',
                message: 'No User Found.'
            };
            return res.json(error);
        }
        //=== For Success - Respond with User Data.
        var jsonData = {
            status: 'success',
            data: data
        }
        res.status(200).json(jsonData);
    });
};

/**
 * GET '/api/getUser/:id'
 * Receives a GET request specifying the animal to get
 * @param  {String} req.params.id - The animalId
 * @return {Object} JSON
 */
exports.getUser = function (req, res) {
    var userId = req.params.id;
    User.findById(userId, function (err, data) {
        //=== If No User Found - Respond with Error.
        if (err || data == null) {
            var error = {
                status: 'error',
                message: 'User Not Found.'
            };
            return res.json(error);
        }
        //=== For Success - Respond with User Data.
        var jsonData = {
            status: 'success',
            data: data
        };
        return res.status(200).json(jsonData);
    });
};

/**
 * GET '/api/searchUser'
 * Receives a GET request to search an User
 * @return {Object} JSON
 */
exports.searchUser = function (req, res) {
    //=== Use 'req.query' to pull out the search term
    var searchTerm = req.query.email;
    User.find({
        email: searchTerm
    }, function (err, data) {
        //=== If No User Found - Respond with Error. 
        if (err || data == null || data.length == 0) {
            var error = {
                status: 'error',
                message: 'No User Found.'
            };
            return res.json(error);
        }
        //=== For Success - Respond with User Data.
        var jsonData = {
            status: 'success',
            data: data
        };

        res.status(200).json(jsonData);
    });
};