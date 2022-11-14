// !!! What is this file? Do I even need this?
// ? I think, Ill need this structure later, when interacting with the db from front end
const bodyParser = require('body-parser');
const sequelize = require('../models/index');

const getLocations = async (req, res) => {
  const locations = await sequelize.models.location.findAll();
  res.send(locations)
};

const getOccurrences = async (req, res) => {
  // Get the location id
  // console.log(req.locationId);
  const theLocationId = req.locationId.location_id.slice(1);
  // console.log(theLocationId);


  const occurrences = await sequelize.models.occurance.findAll({
    where: {
      location_id: theLocationId
    }
  });
  // console.log(res);

  let theFirstElement59 = occurrences.filter(e => e.hashtag_id === 59);
  console.log(theFirstElement59);

  // console.log(occurrences);
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

// const addArticle = async (req, res) => {
//   const article = req.body;
//   await sequelize.articles.create(article);
//   res.status = 201;
//   res.send();
// }

module.exports = { getLocations, getOccurrences };
