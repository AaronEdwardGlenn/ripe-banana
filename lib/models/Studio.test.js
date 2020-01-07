const mongoose = require('mongoose');
const Studios = require('./Studio');

describe('tests the studio model', () => {
  it('contains the requried name and address fields', () => {
    const studio = new Studios({
      name: 'Calvin Coolidge',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });
    expect(studio.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Calvin Coolidge',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });
  });
  it('provides the correct error messages when fields are missing', () => {
    const studio = new Studios();
    const { errors } = studio.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
