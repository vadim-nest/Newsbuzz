const express = require('express');
const router = express.Router();
// const articles = require('./controllers/articles');
const { assignFilter } = require('../controllers/filters');
const { filterBySite } = require('../controllers/createHashtags');
const sequelize = require('../models');
const {
  getLocations,
  getOccurrences,
  getHashtags,
  getArticles,
  getSources
} = require('../controllers/getFromDB');
const addLocation = require('../controllers/addLocation');
const addSource = require('../controllers/addSource');

router.get('/', (req, res) => {
  res.send('Hello people');
});

router.get('/getLocations', getLocations);

router.get('/getSources', getSources);

router.get('/getOccurrences/location_id/:location_id', (req, res) => {
  req.locationId = req.params;
  getOccurrences(req, res);
});

router.post('/getHashtags', (req, res) => {
  getHashtags(req, res);
});

// TODO: change this to parsing a JSON
router.get('/getArticles/articles/:articles', (req, res) => {
  req.articles = req.params;
  getArticles(req, res);
});

// ! It is a bit of a disaster right now. you have to call it about 3-4 times to actually populate the three tables correctly (articles, hashtags, occurances)
router.get('/getHashtagsFromArticles', (req, res) => {
  callingFilterBySite();
  res.send('Populating the tables');
});

router.post('/addLocation', (req, res) => {
  try {
    addLocation(req.body);
    res.send(201);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
})

router.post('/addSource', (req, res) => {
  try {
    addSource(req.body);
    res.send(201);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
})

async function callingFilterBySite() {
  const sources = await sequelize.models.source.findAll();

  const filters = sources.map((el) => {
    return assignFilter(el.name, el.main_page_url, el.location_id);
  });

  await Promise.all(
    Object.values(filters).map((eachFilter, index) => {
      // filter to test individual websites
      // if (eachFilter !== undefined && eachFilter[0] === 'https://www.liverpoolecho.co.uk/news/liverpool-news/') {
      if (eachFilter !== undefined) {
        filterBySite(eachFilter);
      }
    })
  );
}

module.exports = router;
