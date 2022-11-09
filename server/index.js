const PORT = process.env.port || 3000;
const express = require("express");
// const axios = require('axios');
// const cheerio = require('cheerio');

// const router = require("./router");
// const cors = require("cors");
const { filterBySite } = require('./models/filterByWebsite');

const app = express();

app.get('/', async (req, res) => {
  res.send(await filterBySite());
});

app.listen(PORT, () => {
  console.log(`Server is running in PORT:${PORT}`)
})
