require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');

const Actor = require('../lib/models/Actor');

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
      pob: new Date()
    });
    console.log('created model', actor);
    
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
        pob: new Date()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mrs. Actor',
          dob: expect.any(String),
          pob: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all actors via GET route', () => {
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        console.log('!!!! res.body', res.body);
          
        expect(res.body).toEqual([{
          _id: actor.id.toString(),
          name: 'Mr. Actor',
          dob: expect.any(String),
          pob: expect.any(String),
          __v: 0
        }]);
      });
  });
});
