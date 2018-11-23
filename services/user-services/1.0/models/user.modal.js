var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//=== Schema for a User ===
var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    type: String,
    dateAdded: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('ua_user', UserSchema);