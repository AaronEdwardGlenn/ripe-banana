require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');

const Reviewer = require('../lib/models/Reviewer');
const Studios = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');

describe('tests the reviewer routes', () => {
    
  beforeAll(() => {
    connect();     
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase(); 
  });
    
  let reviewer; 
  // eslint-disable-next-line no-unused-vars
  let review;
  // eslint-disable-next-line no-unused-vars
  let studio;
  // eslint-disable-next-line no-unused-vars
  let film;
  let actor; 

  
  beforeEach(async() => {
    
    reviewer = await Reviewer.create({
      name: 'Mr. Reviewer',
      company: 'Company.co'
    });
    studio = await Studios.create({
      name: 'Calvin Coolidge',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      }
    });
    actor = await Actor.create({
      name: 'Calvin Coolidge',
      dob: new Date(),
      pob: 'Tazmania'
    });
    film = await Film.create({
      title: 'Calvin Coolidge Documentary',
      studio: mongoose.Types.ObjectId(),
      cast: [{ 
        role: 'cool guy',
        actor: actor._id
      }]
    });

  });
  
  afterAll(() => {
    return mongoose.connection.close(); 
  });

  it('can create a reviewer via a POST route', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Mrs. Reviewer',
        company: 'Company.co'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mrs. Reviewer',
          company: 'Company.co',
          __v: 0
        });
      });
  });

  it('can get all reviewers via GET route', () => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {          
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          name: reviewer.name,
          company: reviewer.company,
          __v: 0
        });
      });
  });

  it('can get a reviewer by ID via GET route', () => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mr. Reviewer',
          company: 'Company.co',
          __v: 0
        });
      });
  });

  it('can update a reviewer via a PATCH route', () => {
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Captian Reviewer' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Captian Reviewer',
          company: 'Company.co',
          __v: 0
        });
      });
  });

  it('can get a delete a reviewer via DELETE route', () => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mr. Reviewer',
          company: 'Company.co',
          __v: 0
        });
      });
  });
});
