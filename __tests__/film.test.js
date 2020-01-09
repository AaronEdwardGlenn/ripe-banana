require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const Studios = require('../lib/models/Studio');
const Films = require('../lib/models/Film');
const Actors = require('../lib/models/Actor');

describe('tests the studio routes', () => {
    
  beforeAll(() => {
    connect();     
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase(); 
  });
    
  afterAll(() => {
    return mongoose.connection.close(); 
  });
    
  let studio;
  let film;
  let actor; 
  beforeEach(async() => {
    studio = await Studios.create({
      name: 'Calvin Coolidge',
      address: {
        name: '420 Herb st.',
        state: 'Oregon',
        country: 'Austria'
      }
    });  
    film = await Films.create({
      title: 'Polonius is Cool',
      studio: studio.id,
    });
    actor = await Actors.create({
      name: 'Mr. Actor',
      dob: new Date(),
      pob: new Date()
    });
  
    it('can create a film with a post route', () => {
      return request(app)
        .post('/api/v1/films')
        .populate('studios', { title: true })
        .select({ __v: false })      .then(res => {
          expect(res.body).toEqual({
            title: 'Polonius is Cool',
            studio: studio.id
          });
        });
    });
  });
});
