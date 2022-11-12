const express = require('express');
const router = express.Router();
// const articles = require('./controllers/articles');
const { assignFilter } = require('./controllers/filters');
const { filterBySite } = require('./controllers/createHashtags')
const sequelize = require('./models');

router.get('/', (req, res) => {
  res.send('Hello people');
})

// ! It is a bit of a disaster right now. you have to call it about 3-4 times to actually populate the three tables correctly (articles, hashtags, occurances)
router.get('/getHashtagsFromArticles', (req, res) => {
  callingFilterBySite();
  res.send('Populating the tables');
})

async function callingFilterBySite() {

  const sources = await sequelize.models.source.findAll();

  const filters = sources.map(el => {
    return assignFilter(el.name, el.main_page_url, el.location_id);
  })

  // console.log(filters);

  await Promise.all(Object.values(filters).map((eachFilter, index) => {
    // filter to test individual websites
    // if (eachFilter !== undefined && eachFilter[0] === 'https://www.liverpoolecho.co.uk/news/liverpool-news/') {
    if (eachFilter !== undefined) {
      filterBySite(eachFilter);
    }
  }));


}

module.exports = router;
