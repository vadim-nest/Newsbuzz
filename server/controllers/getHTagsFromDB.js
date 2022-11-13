// !!! What is this file? Do I even need this?
// ? I think, Ill need this structure later, when interacting with the db from front end
const sequelize = require('../models/index');

const getHashtags = async (req, res) => {
  // Might need to change findAll to find by ID or something like that
  // console.log(sequelize.location)
  // const locations = await sequelize.location.findAll();
  // const final = await locations.json()
  // res.send(final)

  console.log(sequelize);
};

// const addArticle = async (req, res) => {
//   const article = req.body;
//   await sequelize.articles.create(article);
//   res.status = 201;
//   res.send();
// }

module.exports = { getHashtags };
