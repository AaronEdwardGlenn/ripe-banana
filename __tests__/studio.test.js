require('dotenv').config();
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const Studios = require('../lib/models/Studio');

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
  beforeEach(async() => {
    studio = await Studios.create({
      name: 'Calvin Coolidge',
      address: {
        name: '420 Herb st.',
        state: 'Oregon',
        country: 'Austria'
      }
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
});
