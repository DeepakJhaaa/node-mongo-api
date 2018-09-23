var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Scheme for the Todo's
var TodoSchema = new Schema({
  task: String,
  completed: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'c10_User'
  },
  dateAdded: { type: Date, default: Date.now }
});

//Export 'Todo' Model so we can interact with it in other files
module.exports = mongoose.model('t10_todo', TodoSchema);
