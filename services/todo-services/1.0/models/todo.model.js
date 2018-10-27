var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  task: String,
  completed: Boolean,
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('t10_todo', TodoSchema);
