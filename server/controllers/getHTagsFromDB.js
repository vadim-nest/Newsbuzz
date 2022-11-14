// !!! What is this file? Do I even need this?
// ? I think, Ill need this structure later, when interacting with the db from front end
const bodyParser = require('body-parser');
const sequelize = require('../models/index');

const getLocations = async (req, res) => {
  try {
    const locations = await sequelize.models.location.findAll();
    res.send(locations)
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const getOccurrences = async (req, res) => {
  // Get the location id
  const theLocationId = req.locationId.location_id.slice(1);

  const occurrences = await sequelize.models.occurance.findAll({
    where: {
      location_id: theLocationId
    }
  });

  let theFirstElement59 = occurrences.filter(e => e.hashtag_id === 59);
  console.log(theFirstElement59);

  // Sum counts for all of the hashtag_ids
  let inidividualHashtags = [];
  const allHTagIds = occurrences.map((element) => {
    let inArray = inidividualHashtags.filter(e => e.hashtag_id === element.hashtag_id);

    if (inArray.length === 0) {
      inidividualHashtags.push(element);
    } else {
      // Select the right object inside the array
      inArray[0].hashtag_count = inArray[0].hashtag_count + element.hashtag_count;
    }
  })

  // inidividualHashtags - Every hashtag with total count through all of the articles
  inidividualHashtags.sort(function(a, b){return b.hashtag_count - a.hashtag_count})

  // Limit to the amount needed (the second number)
  let limit = inidividualHashtags.slice(0, 10);

  // return the most mentioned hashtags
  res.send(limit);
};

const getHashtags = async (req, res) => {
  const theHashtagsIds = req.hashtags.hashtags.slice(1);
  // Now I have an array of hashtags indexes:
  const hashtagsIdArr = theHashtagsIds.split('-');

  let hashtagsFromDB = await Promise.all(hashtagsIdArr.map(async id => {
    const hTag = await sequelize.models.hashtag.findByPk(id);
    // console.log(hTag);
    return hTag;
  }))

  res.send(hashtagsFromDB);
};

const getArticles = async (req, res) => {
  const theArticlesIds = req.articles.articles.slice(1);
  // Now I have an array of articles indexes:
  const articlesIdArr = theArticlesIds.split('-');

  let articlessFromDB = await Promise.all(articlesIdArr.map(async id => {
    const article = await sequelize.models.article.findByPk(id);
    // console.log(hTag);
    return article;
  }))

  res.send(articlessFromDB);
};

// const addArticle = async (req, res) => {
//   const article = req.body;
//   await sequelize.articles.create(article);
//   res.status = 201;
//   res.send();
// }

module.exports = { getLocations, getOccurrences, getHashtags, getArticles };
