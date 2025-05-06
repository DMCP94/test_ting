const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function seed() {
  await client.connect();

  // Drop & recreate tables
  await client.query(`DROP TABLE IF EXISTS interactions`);
  await client.query(`
    CREATE TABLE interactions (
      id SERIAL PRIMARY KEY,
      person_a TEXT NOT NULL,
      person_b TEXT NOT NULL,
      description TEXT,
      timestamp TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Insert mock data
  await client.query(`
    INSERT INTO interactions (person_a, person_b, description)
    VALUES
      ('Alice', 'Bob', 'Lunch meeting'),
      ('Carol', 'Dave', 'Code review')
  `);

  await client.end();
  console.log(' Test database seeded.');
}

seed().catch(err => {
  console.error(' Seeding failed:', err);
  process.exit(1);
});
