var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  task: String,
  completed: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'ua_user',
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('tb_todo', TodoSchema);