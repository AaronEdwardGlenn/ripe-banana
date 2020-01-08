const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
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

studioSchema.virtual('films', {
  ref: 'Films',
  localField: '_id',
  foreignField: 'studio'
});

module.exports = mongoose.model('Studios', studioSchema); 
