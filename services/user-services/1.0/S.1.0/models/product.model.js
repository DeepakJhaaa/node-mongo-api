var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Scheme for the Todo's
var TodoSchema = new Schema({
    task: String,
    completed: Boolean,
    dateAdded: { type: Date, default: Date.now },
})

//Export 'Todo' Model so we can interact with it in other files
module.exports = mongoose.model('todo', TodoSchema);