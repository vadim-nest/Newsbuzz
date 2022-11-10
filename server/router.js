const express = require('express');
const router = express.Router();
const articles = require('./controllers/articles');
const filters = require('./controllers/filters');
const { filterBySite } = require('./controllers/createHashtags')

router.get('/', (req, res) => {

  callingFilterBySite();



  res.send('Hello people');
})

router.get('/articles', articles.getArticles);
router.post('/articles', articles.addArticle);

async function callingFilterBySite() {

  // Here I need to call the right function
  // So, grab the right filter and call create
  // 1. Pull all the filters
  // 2. filter.forEach run to find all the info and populate the db

  let returnedHashtags = await Promise.all(Object.values(filters).map(el => filterBySite(el)));
  console.log('-------------------------');
  console.log(returnedHashtags);

  // YOU ARE HERE!!
  // Object.values(filters).forEach(el => {
  //   const returnedHashtags = filterBySite(el);
  //   console.log(returnedHashtags)
  // });

}

module.exports = router;
