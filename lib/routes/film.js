const { Router } = require('express');
const Films = require('../models/Film');
const Review = require('../models/Review');


module.exports = Router()
  .post('/', (req, res, next) => {
    Films
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Films
      .find()
      .select('_id title studio released')
      .then(films => res.send(films))
      .catch(next);
  })
  
  .get('/:id', (req, res) => {
    return Promise.all([
      Films 
        .findById(req.params.id)
        .select({ _id: false, __v: false })
        .populate('studio', { name: true })
        .populate('cast.actor', { name: true })
        .lean(),
      Review
        .find({ film: req.params.id })
        .select({ film: false, __v: false })
        .populate('reviewer', { name: true })    
    ])
      .then(([film]) => res.send ({ 
        ...film.toJSON() })); 
  });
