const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:{
    type: String, 
    required: true
  }, 
  address:{
    city: String,
    state: String, 
    country: String
  },
});

module.exports = ('Studio', schema); 
