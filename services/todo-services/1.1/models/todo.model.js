var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  task: String,
  completed: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'c10_User',
  },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('t11_todo', TodoSchema);
