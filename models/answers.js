// sample model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Answers = new Schema({
  answer: String,
  rating: Number,
  time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Answers', Answers);
