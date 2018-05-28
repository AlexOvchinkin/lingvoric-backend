const mongoose = require('../lib/mongoose');
const logger = require('../lib/logger');

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: String,
  subtitle: String,
  filename: String,
  subs: JSON
});

module.exports = mongoose.model('Video', VideoSchema);