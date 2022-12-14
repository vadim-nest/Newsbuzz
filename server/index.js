require('dotenv').config();
const PORT = process.env.port || 3000;
const express = require('express');
const router = require('./routers/router');
const { populateDB } = require('./populateDB/populateDB')

const cors = require('cors');
const { createDB } = require('./populateDB/setUpDB');
const corsConfig = {
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  credentials: true,
};

const app = express();
app.use(cors(corsConfig));

app.use(express.json());
app.use(router);

(async function bootstrap() {
  await createDB();
  const sequelize = require('./models/index');
  await sequelize.sync();
  app.listen(PORT, async () => {
    try {
      const location = await sequelize.models.location.findOne({
        where: {
          id: 1
        }
      });
      if (!location) {
        console.log('Populating the database:');
        await populateDB();
      }
      console.log(`Server is running in PORT:${PORT}`);
    } catch (error) {
      console.log(error);
    }
  });
})();

