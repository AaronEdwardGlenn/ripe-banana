require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Films = require('../lib/models/Film');
const Studios = require('../lib/models/Studio');


describe('tests the review routes', () => {
    
  beforeAll(() => {
    connect();     
  });
    
  beforeEach(() => {
    return mongoose.connection.dropDatabase(); 
  });
      
  afterAll(() => {
    return mongoose.connection.close(); 
  });

  let review; 
  let reviewer;
  let film;
  let studio;

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
      title: 'cool film',
      studio: studio._id,
    });

    reviewer = await Reviewer.create({
      name: 'Dickhead',
      company: 'Exxon'
    });

    review = await Review.create({
      rating: 3,
      reviewer: reviewer._id,
      review: 'so good',
      film: film._id
    });
    
  });

  it.only('can create a review via POST route', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 1,
        reviewer: reviewer._id,
        review: 'differnet review',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 1,
          reviewer: reviewer._id.toString(),
          review: 'differnet review',
          film: film._id.toString(),
          __v: 0
        });
      });
  });
});
