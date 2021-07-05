  //const config = require('config');
  //const jwt = require('jsonwebtoken'); Move this to user.js
  const Joi = require("joi");
  const bcrypt = require("bcrypt");
  const _ = require("lodash");
  const { User } = require("../models/user");
  const mongoose = require("mongoose");
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);

  const express = require("express");
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });//so here we have a user object that we load from db
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");
 
    // Add a method in this user object 
    const token = user.generateAuthToken(); // Step1, go to user module user.js, make same change in users.js
    res.send(token); 
  });

  function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(req, schema);
  }

  module.exports = router;
