const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name:{
    type: String, 
    required: true
  },
  dob: { type: Date },
  pob: { type: Date }
});

module.exports = mongoose.model('Actor', actorSchema);
