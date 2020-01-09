const { Router } = require('express');
const Films = require('../models/Film');

module.exports = Router()
  .post('/', (req, res) => {
    Films
      .create(req.body)
      .then(film => res.send(film)); 
  });

