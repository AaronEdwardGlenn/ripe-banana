const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name:{
    type: String, 
    required: true
  },
  dob: { type: Date },
  pob: { type: String }
});

actorSchema.virtual('films', {
  ref: 'Films',
  localField: '_id',
  foreignField: 'cast.actor'
});

module.exports = mongoose.model('Actor', actorSchema);
