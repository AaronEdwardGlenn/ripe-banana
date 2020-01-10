const mongoose = require('mongoose');

const castSchema = new mongoose.Schema(
  {
    role: String,
    actor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Actor',
      required: true
    }
  });

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
  cast:[castSchema]
});

// filmSchema.virtual('stuidos', {
//   ref: 'Studios',
//   localField: '_id',
//   foreignField: 'film'
// });

// filmSchema.virtual('actors', {
//   ref: 'Actors',
//   localField: '_id',
//   foreignField: 'film'
// });

// filmSchema.statics.findFilmById = function(id){
//   return Promise.all([
//     this 
//       .findById(id)
//       .select({ _id: false, __v: false })
//       .populate('studio', { name: true })
//       .populate('cast.actor', { name: true })
//       .lean(),
//     this.model('Review')
//       .find({ film: id })
//       .select({ film: false, __v: false })
//       .populate('reviewer', { name: true })
//   ]);
// };

module.exports = mongoose.model('Films', filmSchema);
