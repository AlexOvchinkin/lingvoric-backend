const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(`mongodb://${config.mongoose.server}/${config.mongoose.db}`);

module.exports = mongoose;