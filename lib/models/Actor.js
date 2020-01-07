const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:{
    type: String, 
    required: true
  },
  dob: { type: Date },
  pob: { type: Date }
});

module.exports = ('Actor', schema);
