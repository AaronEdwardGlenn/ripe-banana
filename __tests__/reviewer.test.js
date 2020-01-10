require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');

const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const Studio = require('../lib/models/Studio');
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
  let review;
  let Studio;
  let Film;
  let Actor; 

  
  beforeEach(async() => {
    
    reviewer = await Reviewer.create({
      name: 'Mr. Reviewer',
      company: 'Company.co'
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
