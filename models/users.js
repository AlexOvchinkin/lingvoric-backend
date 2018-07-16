const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name  : String,
  email : String,
});

module.exports = mongoose.model('Users', UsersSchema);