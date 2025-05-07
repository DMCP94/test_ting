require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../../backend/src/api/server.ts'); 
console.log(process.env.DATABASE_URL);


describe('GET /api/interactions', () => {
    it('should return all interactions', async () => {
        // const response = await request(app).get('/api/interactions');
        console.log("worked");
  });
}); 