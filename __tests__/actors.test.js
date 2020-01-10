require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');

const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');

describe('tests the actor routes', () => {
    
  beforeAll(() => {
    connect();     
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase(); 
  });
    
  let actor; 

  
  beforeEach(async() => {
    
    actor = await Actor.create({
      name: 'Mr. Actor',
      dob: new Date(),
      pob: 'Tazmania'
    });    
  });
  
  afterAll(() => {
    return mongoose.connection.close(); 
  });
  it('can create an actor via POST route', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Mrs. Actor',
        dob: new Date(),
        pob: 'Tazmania'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mrs. Actor',
          dob: expect.any(String),
          pob: 'Tazmania',
          __v: 0
        });
      });
  });

  it('can get all actors via GET route', () => {
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual([{
          _id: actor.id.toString(),
          name: 'Mr. Actor',
          dob: expect.any(String),
          pob: 'Tazmania',
          __v: 0
        }]);
      });
  });

  it('can get an actor by id via GET route', async() => {
    const studio = await Studio.create({
      name: 'Actor Studio',
      address: {
        city: 'Portland',
        state: 'New York',
        country: 'Uganda'
      }
    });
    await Film.create({
      title: 'Sweet Film',
      studio: studio._id,
      released: 1999,
      cast: {
        role: 'Cool role',
        actor: actor._id
      }
    });
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          name: 'Mr. Actor',
          dob: actor.dob.toISOString(),
          pob: 'Tazmania',
          films: [{
            _id: expect.any(String),
            title: 'Sweet Film',
            released: 1999
          }]
        });
      });
  });
});
