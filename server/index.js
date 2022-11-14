const PORT = process.env.port || 3000;
const express = require("express");
// const bodyParser = require('body-parser');
const router = require("./router");
const sequelize = require('./models/index')

const cors = require('cors');
const corsConfig = {
  origin: ['http://localhost:3000', 'http://localhost:4200'], // This is my config - maybe change 4200 and 3000 to the right ones for you
  credentials: true,
}

const app = express();
app.use(cors(corsConfig));

app.use(express.json());
app.use(router);

// app.get('/', async (req, res) => {
//   res.send(await filterBySite());
// });

(async function bootstrap() {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running in PORT:${PORT}`)
  })
})()
