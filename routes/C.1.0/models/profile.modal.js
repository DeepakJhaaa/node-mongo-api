var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Scheme for the Profile Modal
var profileSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    email: String,
    lastActive: { type: Date, default: Date.now },
    geoCoords: String,
    preference: String,
    mood: String,
    contacts: String,
})

//Export 'Profile' Model so we can interact with it in other files
module.exports = mongoose.model('conezero_Profile', profileSchema);