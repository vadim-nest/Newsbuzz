const express = require('express');
const router = express.Router();
// const articles = require('./controllers/articles');
const { assignFilter } = require('./controllers/filters');
const { filterBySite } = require('./controllers/createHashtags')
const sequelize = require('./models');

router.get('/', (req, res) => {

  callingFilterBySite();



  res.send('Hello people');
})

// router.get('/articles', articles.getArticles);
// router.post('/articles', articles.addArticle);

async function callingFilterBySite() {

  // Here I need to call the right function
  // So, grab the right filter and call create
  // 1. Pull all the filters
  // 2. filter.forEach run to find all the info and populate the db

  const sources = await sequelize.models.source.findAll();

  const filters = sources.map(el => {
    // console.log(el);
    return assignFilter(el.name, el.main_page_url, el.location_id);
  })

  // Testing
  // console.log(filters);

  // console.log(sources.name);

  let returnedHashtags = await Promise.all(Object.values(filters).map((eachFilter, index) => {
    // Testing
    // console.log('eachFilter', eachFilter);
    if (eachFilter !== undefined && index > 0) {
      filterBySite(eachFilter);
    }
  }));
  // console.log(returnedHashtags);

  // YOU ARE HERE!!
  // Object.values(filters).forEach(el => {
  //   const returnedHashtags = filterBySite(el);
  //   console.log(returnedHashtags)
  // });

}

module.exports = router;
