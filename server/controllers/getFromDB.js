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

  occurrences.sort(function(a, b){return a.hashtag_id - b.hashtag_id})
  res.send(occurrences);
};

const getHashtags = async (req, res) => {
  const hashtagsIdArr = req.body;

  let hashtagsFromDB = await Promise.all(hashtagsIdArr.map(async id => {
    const hTag = await sequelize.models.hashtag.findByPk(id);
    // console.log(hTag);
    return hTag;
  }))

  res.send(hashtagsFromDB);
};

const getArticles = async (req, res) => {
  const articlesIdArr = req.body;

  let articlesFromDB = await Promise.all(articlesIdArr.map(async id => {
    const article = await sequelize.models.article.findByPk(id);
    // console.log(hTag);
    return article;
  }))

  res.send(articlesFromDB);
};

const getSources = async (req, res) => {
  try {
    const sources = await sequelize.models.source.findAll();
    res.send(sources)
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

module.exports = { getLocations, getOccurrences, getHashtags, getArticles, getSources };
