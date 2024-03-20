const { Pool } = require('pg')

let client

const pgClient = () => {
  if (!client) {
    client = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'emoney_db',
    });
  }
  return client;
};


const tx = async (callback) => {
  const client = await pgClient();

  await client.query('BEGIN')
  try {
    await callback(client)
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
  }
}

module.exports = {
  pgClient,
  tx
}