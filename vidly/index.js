require('express-async-errors');// we don't need to store it in constant
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);// objectid is a method on this joi object
const mongoose = require('mongoose');
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');  // here
const auth = require('./routes/auth'); 
const express = require('express');
const app = express();


winston.handleExceptions(new winston.transports.File({filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection',(ex)=>{
  throw ex;
});


winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {
  db:'mongodb://localhost/vidly',
  level:'error',  
}); 

const p = Promise.reject(new Error('Something Failed miserably!')); 



if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1); 
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals); 
app.use('/api/users', users);
app.use('/api/auth',auth);


app.use(error); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));