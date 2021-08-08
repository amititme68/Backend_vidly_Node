const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app){
    app.use(helmet()); // as helmet is a function
    app.use(compression()); // as compression is a fn
}