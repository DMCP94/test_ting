require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../../backend/src/api/server.ts').default; 


describe('GET /api/interactions', () => {
  it('should return all interactions', async () => {
        const response = await request(app).get('/api/interactions');
        console.log(response.status);
        expect(response.status).toBe(200);
  });
}); 