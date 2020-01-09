const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number, 
    min: 1888,
    max: 2050 
  }, 
  cast:[{
    role: String,
    actor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Actor',
      required: true
    }
  }]
});

filmSchema.virtual('stuidos', {
  ref: 'Studios',
  localField: '_id',
  foreignField: 'film'
});

filmSchema.virtual('actors', {
  ref: 'Actors',
  localField: '_id',
  foreignField: 'film'
});



module.exports = mongoose.model('Films', filmSchema);
