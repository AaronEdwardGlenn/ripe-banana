const mongoose = require('mongoose'); 

const reviewerSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  }, 
  company: {
    type: String, 
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.id;
    }
  }
});

reviewerSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

module.exports = mongoose.model('Reviewer', reviewerSchema);
