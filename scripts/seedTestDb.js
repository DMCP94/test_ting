require('dotenv').config({ path: '.env.test' });

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function seed() {
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
  ('2', '1', 'Call', '2025-05-05 15:00:00', 'Follow-up call');
  `);

  await client.end();
  console.log(' Test database seeded.');
}
async function verify() {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
  
    try {
      await client.connect();
      const res = await client.query('SELECT * FROM entities');
      console.log('Entities:', res.rows);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      await client.end(); // Ensure client is closed after use
    }
  }
  
  verify();

seed().catch(err => {
  console.error(' Seeding failed:', err);
  process.exit(1);
});
