const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.test') });

const request = require('supertest');
const app = require('../../backend/src/api/server.ts').default; 
const seedDB = require('../../scripts/seedTestDb.js'); 
const { pool } = require('../../backend/src/db/postgresClient.ts'); // Adjust the path to your db module

beforeAll(async () => {
  await seedDB();
});

afterAll(async () => {
  await pool.end();
});


describe('GET /api/interactions', () => {
  it('should return all interactions', async () => {
        const response = await request(app).get('/api/interactions');
        console.log(response.body);
        expect(response.status).toBe(200);
  });
}); 