require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const Studios = require('../lib/models/Studio');
const Films = require('../lib/models/Film');

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
  beforeEach(async() => {
    studio = await Studios.create({
      name: 'Calvin Coolidge',
      address: {
        city: 'Portland',
        state: 'Oregon',
        country: 'Austria'
      }
    });  
    film = await Films.create({
      title: 'Polonius is Cool',
      studio: studio.id,
    });
  });
  
  it('gets all the studios', () => {
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual([{
          _id: studio.id,
          name: 'Calvin Coolidge'
        }]);
      });
  });

  it('gets a studio by id', () => {
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        
        expect(res.body).toEqual({
          _id: studio.id,
          name: 'Calvin Coolidge',
          address: {
            city: 'Portland',
            state: 'Oregon',
            country: 'Austria'
          }, 
          films: [{
            _id: film.id,
            title: 'Polonius is Cool'
          }]
        });
      });
  });
});
