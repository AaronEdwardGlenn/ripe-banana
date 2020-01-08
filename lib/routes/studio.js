const { Router } = require('express');
const Studios = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res) => {
    Studios
      .find()
      .select({ name: true })
      .then(studio => res.send(studio));
  })
  .get('/:id', (req, res) => {
    Studios
      .findById(req.params.id)
      .populate('films', { title: true })
      .select({ __v: false })
      .lean()
      .then(studio => { studio.films.forEach(film => {
        delete film.studio;
      });
      res.send(studio); 
      });
  });
