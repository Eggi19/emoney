const { Pool, Client } = require('pg')
require('dotenv').config();

//local db
// const pgClient = () => {
//   let client
//   if (!client) {
//     client = new Pool({
//       host: process.env.ENV_HOST,
//       port: process.env.ENV_PORT,
//       user: process.env.ENV_USER_DB,
//       password: process.env.ENV_PASSWORD_DB,
//       database: process.env.ENV_NAME_DB,
//     });
//   }
//   return client;
// };

//remote db
const pgClient = () => {
  let client
  if (!client) {
    client = new Pool({
      host: process.env.ENV_HOST_PRODUCTION,
      port: process.env.ENV_PORT_PRODUCTION,
      user: process.env.ENV_USER_PRODUCTION,
      password: process.env.ENV_PASSWORD_PRODUCTION,
      database: process.env.ENV_NAME_PRODUCTION,
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