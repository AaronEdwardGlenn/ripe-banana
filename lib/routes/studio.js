const { Router } = require('express');
const Studios = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res) => {
    Studios
      .find()
      .select({ name: true })
      .then(studio => res.send(studio));
  }); 
