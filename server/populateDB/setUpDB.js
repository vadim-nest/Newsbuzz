const { Client } = require("pg");

async function createDB () {
  await new Promise((resolve, rej) => {
    const client = new Client({
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      database: 'postgres',
    });

    client.connect();

    client.query('CREATE DATABASE "newsbuzz"', (err, res) => {
      console.log(err, res);
      client.end();
      resolve();
    });
  })
}

module.exports = { createDB };
