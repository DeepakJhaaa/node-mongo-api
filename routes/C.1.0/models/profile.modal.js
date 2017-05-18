var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Scheme for the Profile Modal
var profileSchema = new Schema({
    id: { type: Number, unique: true },
    name: String,
    age: Number,
    gender: String,
    email: String,
    dateAdded: { type: Date, default: Date.now },
    contacts: {
        weight: Number,
        color: String
    }
})

//Export 'Profile' Model so we can interact with it in other files
module.exports = mongoose.model('Profile', profileSchema);