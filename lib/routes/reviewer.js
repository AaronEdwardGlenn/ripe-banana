const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    let reviewerQuery = {};
    Reviewer
      .find(reviewerQuery)
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Promise.all([
      Reviewer.findById(req.params.id)
    ])
      .then(([reviewers]) => res.send ({
        ...reviewers.toJSON() }))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Promise.all([
      Reviewer.findById(req.params.id)
    ])
      .then(([reviewers]) => res.send(reviewers))
      .catch(next); 
  });
