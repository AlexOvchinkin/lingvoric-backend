const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title      : String,
  subtitle   : String,
  videoName  : String,
  posterName : String,
  subs       : JSON
});

module.exports = mongoose.model('Video', VideoSchema);