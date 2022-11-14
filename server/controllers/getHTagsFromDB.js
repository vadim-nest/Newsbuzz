// !!! What is this file? Do I even need this?
// ? I think, Ill need this structure later, when interacting with the db from front end
const sequelize = require('../models/index');

const getLocations = async (req, res) => {
  const locations = await sequelize.models.location.findAll();
  res.send(locations)
};

const getOccurrences = async (req, res) => {
  const locations = await sequelize.models.location.findAll();
  res.send(locations)
};

// const addArticle = async (req, res) => {
//   const article = req.body;
//   await sequelize.articles.create(article);
//   res.status = 201;
//   res.send();
// }

module.exports = { getLocations };
