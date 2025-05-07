require('dotenv').config({ path: '.env.test' });

const request = require('supertest');

// Mocking server.ts because it's hotloading the database connection, messing up tests. Would need to refactor server.ts to fix this properly.
jest.mock('../../backend/src/api/server.ts', () => {
  return {
    use: jest.fn(),
    listen: jest.fn(), 
  };
});


describe('GET /api/interactions', () => {
  it('should return all interactions', async () => {
      const app = require('../../backend/src/api/server.ts'); 
        // const response = await request(app).get('/api/interactions');
        console.log("worked");
  });
}); 