const express = require('express');
const router = express.Router();
// const articles = require('./controllers/articles');
const { assignFilter } = require('./controllers/filters');
const { filterBySite } = require('./controllers/createHashtags')
const sequelize = require('./models');
const { getLocations, getOccurrences, getHashtags, getArticles } = require('./controllers/getHTagsFromDB');

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
  req.locationId = req.params;
  getOccurrences(req, res);
});

// Need to insert all of the hashtag ids required in the following format:
// http://localhost:3000/getHashtags/hashtags/:149-474-757-956-1112-2
router.get('/getHashtags/hashtags/:hashtags', (req, res) => {
  req.hashtags = req.params;
  getHashtags(req, res);
});

router.get('/getArticles/articles/:articles', (req, res) => {
  req.articles = req.params;
  getArticles(req, res);
});

// Need to implement at some point
// router.get('/getSources', (req, res) => {
// });

// Getting all of the hashtags from the articles
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

  // console.log('**********************************');
  // console.log('**********************************');
  // console.log('**********************************');
  // console.log('**********************************');
  // console.log('**********************************');
  // console.log(filters);
  // console.log('**********************************');
  // console.log('**********************************');
  // console.log('**********************************');
  // console.log('**********************************');
  // console.log('**********************************');
  // console.log(filters);

  await Promise.all(Object.values(filters).map((eachFilter, index) => {
    // filter to test individual websites
    // if (eachFilter !== undefined && eachFilter[0] === 'https://www.liverpoolecho.co.uk/news/liverpool-news/') {
    console.log(eachFilter);
    if (eachFilter !== undefined && eachFilter[0] === 'https://www.expressandstar.com/news/local-hubs/birmingham/') {
      console.log(eachFilter);
      filterBySite(eachFilter);
    }
  }));

}

module.exports = router;
