const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    released: {
      type: Number, 
      min: 1888,
      max: 2050 
    }, 
    cast:[{
      role: String,
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Actor',
      required: true
    }]
  }
});

module.exports = ('Film', schema);
