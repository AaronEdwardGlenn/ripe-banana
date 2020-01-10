const mongoose = require('mongoose');
const Actor = require('./Actor');

describe('Actors model tests', () => {
  it('contains a name', () => {
    const actor = new Actor({
      name: 'Calvin Coolidge',
      dob: new Date(),
      pob: 'Tazmania'
    });
    expect(actor.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Calvin Coolidge',
      dob: expect.any(Date),
      pob: 'Tazmania'
    });
  });
  it('contains a dob', () => {
    const actor = new Actor({
      name: 'Calvin Coolidge',
      dob: new Date(),
      pob: 'Tazmania'
    });
    expect(actor.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Calvin Coolidge',
      dob: expect.any(Date),
      pob: 'Tazmania'
    });
  });
  it('contains a pob', () => {
    const actor = new Actor({
      name: 'Calvin Coolidge',
      dob: new Date(),
      pob: 'Tazmania'
    });
    expect(actor.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Calvin Coolidge',
      dob: expect.any(Date),
      pob: 'Tazmania'
    });
  });
  it('provides the correct error when name field missing', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync(); 
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
