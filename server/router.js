const express = require('express');
const router = express.Router();
// const articles = require('./controllers/articles');
const { assignFilter } = require('./controllers/filters');
const { filterBySite } = require('./controllers/createHashtags')
const sequelize = require('./models');
const { getLocations, getOccurrences } = require('./controllers/getHTagsFromDB');


router.get('/', (req, res) => {
  res.send('Hello people');
})

// Okay, do it here for now, and the ask someone to help you to separate it into a different file (getHTagsFromDB.js)
// router.get('/getHashtagsFromDB', (req, res) => {
//   const allHashtags = getHashtags();
//   console.log(allHashtags)
//   // console.log(allHashtags);
//   res.send('Hello hashtags');
// })
router.get('/getLocations', getLocations);
router.get('/getOccurrences/location_id/:location_id', (req, res) => {
  // console.log('req.parsms')
  // console.log(req.params);
  // const theLocationId = req.params;
  req.locationId = req.params;
  getOccurrences(req, res);
});

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

  function text2png() {
    fs.writeFileSync('out.png', text2png('Hello!', {color: 'blue'}));
  }
}

module.exports = router;
