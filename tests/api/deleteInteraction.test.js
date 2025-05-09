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

describe('DELETE /api/interaction/:id', () => {
  // Success test cases
  it('Should Deelte an interaction', async () => {
    const newInteraction = {
        sourceId: '2',
        targetd: '3',
        type: 'Email',
        timestamp: '2025-05-08T10:30:00Z',
        description: 'Introductory email'
      };

      const response = await request(app)
      .post('/api/interaction')
      .send(newInteraction)
      .set('Accept', 'application/json');
      const newID = response.body.interaction.id;
      
      const deleteRes = await request(app).delete(`/api/interaction/${newID}`);
      expect(deleteRes.status).toBe(200);

    //   Check Interaction is deleted
    const getRes = await request(app).get('/api/interactions');
    const ids = getRes.body.map((i) => i.id);
    expect(ids).not.toContain(newID);
  });

  // Failure test cases
  it('DELETE should fail if the interaction does not exist', async () => {
    badID = 99999999;
    const deleteRes = await request(app).delete(`/api/interaction/${badID}`);
      expect(deleteRes.status).not.toBe(200);
  });
});