const mongoose = require('mongoose');
const Films = require('./Film');

describe('film model tests', () => {
  it('contains a title', () => {
    const film = new Films({
      title: 'Calvin Coolidge Documentary',
    });
    expect(film.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Calvin Coolidge Documentary',
      cast: []
    });
  });

  it('provides the correct error when cast is missing', () => {
    const film = new Films({
      title: 'Calvin Coolidge Documentary',
      studio: mongoose.Types.ObjectId(),
      cast: [{ role: 'cool guy' }]
    }); 
    const { errors } = film.validateSync(); 
    // console.log(errors);
    

    expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
  });

});
