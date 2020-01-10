const { Router } = require('express');
const Films = require('../models/Film');

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
    Promise.all([
      Films.findById(req.params.id)
    ])
      .then(([film]) => res.send ({ 
        ...film.toJSON() })); 
  });
