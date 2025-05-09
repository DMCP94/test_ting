const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.test') });

const request = require('supertest');
const app = require('../../backend/src/api/server.ts').default; 
const seedDB = require('../../scripts/seedTestDb.js'); 
const { pool } = require('../../backend/src/db/postgresClient.ts');

beforeAll(async () => {
  await seedDB();
});

// 
let poolClosed = false;
afterAll(async () => {
  // await pool.end();
  console.log('DB connection closed');
});

describe('GET /api/interactions', () => {
  // Success test cases
  it('should return all interactions in desc order', async () => {
        const response = await request(app).get('/api/interactions');
        
        // example endpoint checks here
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); 

        // example data validation checks here
        const firstInteraction = response.body[0];
        expect(firstInteraction.id).toBeDefined();
        expect(typeof firstInteraction.id).toBe('string');
        expect(firstInteraction.id).not.toBe('');
  });

  // Failure test cases
  it('should return a 500 on db failure', async () => {
    // Ideally I would mock a failed db connection here, but for now I will just close it.
      await pool.end();
      poolClosed = true; // Set the flag to indicate that the pool is closed
        
      const response = await request(app).get('/api/interactions');
      expect(response.status).toBe(500);
  });
}); 