const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly')
    .then(() => winston.info('Connected to MongoDB...'));
}