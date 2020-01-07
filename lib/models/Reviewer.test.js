const mongoose = require('mongoose');
const Reviewers = require('./Reviewer');

describe('reviewers model tests', () => {
  it('contains a required name', () => {
    const reviewer = new Reviewers({
      name: 'Calvin Coolidge',
      company: 'Polonius'
    });
    expect(reviewer.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Calvin Coolidge',
      company: 'Polonius'
    });
  });
  it('errors properly when company or name field is missing', () => {
    const reviewer = new Reviewers();
    const { errors } = reviewer.validateSync();

    expect(errors.company.message).toEqual('Path `company` is required.') && (errors.name.message).toEqual('Path `name` is required.');
  });
});
