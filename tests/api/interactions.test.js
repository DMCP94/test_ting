require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../../backend/src/api/server.ts'); 


describe('GET /api/interactions', () => {
    it('should return all interactions', async () => {
      console.log(app ? 'App is defined' : 'App is not defined');
  });
}); 