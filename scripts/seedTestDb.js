require('dotenv').config({ path: '../.env.test' });

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

const { Pool } = require('pg');
const pool = new Pool();

async function seedDB() {
  await client.connect();

  // Drop & recreate tables
  await client.query(`DROP TABLE IF EXISTS interactions`);
  await client.query(`
    DROP TABLE IF EXISTS entities CASCADE;
    DROP TABLE IF EXISTS interactions CASCADE;
    CREATE TABLE IF NOT EXISTS entities (
      id VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      company VARCHAR NOT NULL
    );
    CREATE TABLE IF NOT EXISTS interactions (
      id SERIAL PRIMARY KEY,
      source_id VARCHAR REFERENCES entities(id),
      target_id VARCHAR REFERENCES entities(id),
      type VARCHAR NOT NULL,
      timestamp VARCHAR NOT NULL,
      description VARCHAR NOT NULL
    );
  `);

  // Insert mock data
  await client.query(`
    INSERT INTO entities (id, name, company) VALUES
  ('1', 'Alice', 'Company A'),
  ('2', 'Bob', 'Company B');

INSERT INTO interactions (source_id, target_id, type, timestamp, description) VALUES
  ('1', '2', 'Meeting', '2025-05-05 14:00:00', 'Lunch meeting'),
  ('2', '1', 'Call', '2025-05-05 15:00:00', 'Follow-up call'),
  ('1', '2', 'Email', '2025-05-06 09:00:00', 'Sent project documents'),
  ('2', '1', 'Meeting', '2025-05-06 11:00:00', 'Discussion about budget'),
  ('1', '2', 'Call', '2025-05-07 10:30:00', 'Clarified project scope'),
  ('2', '1', 'Email', '2025-05-07 13:00:00', 'Sent final proposal');
  `);

  await client.end();
}
if (require.main === module) {
  seedDB().catch(err => {
    console.error(' Seeding failed:', err);
    process.exit(1);
  });
}
module.exports = seedDB;