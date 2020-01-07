const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number, 
    max: 5, 
    min: 1, 
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer'
  },
  review: {
    type: String, 
    maxlength: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
}); 

module.exports = ('Review', schema);
