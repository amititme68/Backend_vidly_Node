const Joi = require('joi');
// this returns a fn, we need to pass reference to joi module
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);


const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({ 
      name: {                   
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }      
    }),  
    required: true
  },
  movie: {
    type: new mongoose.Schema({ 
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0          
  }
}));

function validateRental(rental) { // Here we need to add custome validation, we need to talk to 
  // mongoose we need to call isValid method of objectId type, there is actually a npm package 
  // for adding support to validating object id's in joi so in terminal install- npm i joi-objectid
  // Now in rental.js
  const schema = {                      
    customerId: Joi.objectId().required(), // change string to objectId
    movieId: Joi.objectId().required()    // here also  
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;