const PORT = process.env.port || 3000;
const express = require("express");
// const bodyParser = require('body-parser');
const router = require("./router");
const sequelize = require('./models/index')

// const cors = require("cors");
// const { filterBySite } = require('./controllers/filterByWebsite');

const app = express();

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
