const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.test') });

const request = require('supertest');
const app = require('../../backend/src/api/server.ts').default; 
const seedDB = require('../../scripts/seedTestDb.js'); 
const { pool } = require('../../backend/src/db/postgresClient.ts');

beforeAll(async () => {
  await seedDB();
});

let poolClosed = false;
afterAll(async () => {
  if (!poolClosed) {
    await pool.end();
    poolClosed = true; 
  } else {
    return;
  }
});

describe('POST /api/interaction', () => {
  // Success test cases
  it('Should create a new interaaction', async () => {
    const newInteraction = {
        sourceId: '1',
        targetd: '2',
        type: 'Email',
        timestamp: '2025-05-08T10:30:00Z',
        description: 'Introductory email'
      };

      const response = await request(app)
      .post('/api/interaction')
      .send(newInteraction)
      .set('Accept', 'application/json');

      expect(response.status).toBe(201);
  });

  // Failure test cases
  it('POST should fail if no source or target id ', async () => {
    const newInteraction = {
        sourceId: null,
        targetd: null,
        type: 'Email',
        timestamp: '2025-05-08T10:30:00Z',
        description: 'Introductory email'
      };

      const response = await request(app)
      .post('/api/interaction')
      .send(newInteraction)
      .set('Accept', 'application/json');

      expect(response.status).not.toBe(201);
      console.log(response.body);
  });
});