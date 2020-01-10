require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const Studios = require('../lib/models/Studio');
const Films = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');

describe('tests the studio routes', () => {
    
  beforeAll(() => {
    connect();     
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase(); 
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
      released: 2000
    });
    
    actor = await Actor.create({
      name: 'Mr. Actor',
      dob: new Date(),
      pob: 'Tazmania'
    });
  });
  
  afterAll(() => {
    return mongoose.connection.close(); 
  });

  it('can create a film with a post route', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'cool new film',
        studio: studio._id,
        cast: []
      })  
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'cool new film',
          studio: studio._id.toString(),
          cast: expect.any(Array),
          __v: 0
        });
          
      }); 
  });
  
  it('can get all films via GET route', () => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual([{
          _id: film.id.toString(),
          title: 'Polonius is Cool',
          released: 2000,
          studio: studio._id.toString()
        }]);
      });  
  });

  it('can get a film by id via GET route', () => {
    return request(app)
      .get(`/api/v1/films/${film.id}`)
      .then(res => {
        console.log(res.body);
        
        expect(res.body).toEqual({
          // _id: expect.any(String),
          title: 'Polonius is Cool',
          released: 2000,
          cast: expect.any(Array),
          reviews: expect.any(Array),
          studio: {
            _id: expect.any(String),
            name: 'Calvin Coolidge',
          }
        });
      });
  });
});

