const mongoose = require('mongoose');
const Reviews = require('./Review');

describe('review model tests', () => {
  it('contains the requried fields', () => {
    const review = new Reviews({
      rating: 4, 
      reviewer: mongoose.Types.ObjectId(),
      review: 'Hella good',
      film: mongoose.Types.ObjectId()
    });
    expect(review.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      rating: 4, 
      reviewer: expect.any(mongoose.Types.ObjectId),
      review: 'Hella good',
      film: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('throws correct errors when required fields are not present', () => {
    const review = new Reviews(); 
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` is required.') && (errors.review.message).toEqual('Path `review` is required.') && (errors.film.message).toEqual('Path `film` is required.');
  });
});
