const express = require('express');
const router = express.Router();
// const articles = require('./controllers/articles');
const { assignFilter } = require('./controllers/filters');
const { filterBySite } = require('./controllers/createHashtags')
const sequelize = require('./models');

router.get('/', (req, res) => {
  res.send('Hello people');
})

// ! It is a bit of a disaster right now. you have to call it about 3 times to actually populate the three tables correctly (articles, hashtags, occurances)
router.get('/getHashtagsFromArticles', (req, res) => {
  callingFilterBySite();
  res.send('Populating the tables');
})

async function callingFilterBySite() {

  const sources = await sequelize.models.source.findAll();

  const filters = sources.map(el => {
    return assignFilter(el.name, el.main_page_url, el.location_id);
  })

  await Promise.all(Object.values(filters).map((eachFilter, index) => {
    // if (eachFilter !== undefined && index > 0) {
    if (eachFilter !== undefined && index > 2) {
      filterBySite(eachFilter);
    }
  }));


}

module.exports = router;
