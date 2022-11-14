const Sequelize = require('sequelize');
const db = {};
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('buzznews', 'postgres', '1234', {
  dialect: 'postgres',
  logging: false
});

// const modelDefiners = [
//   require('./articles'),
//   require('./hashtags'), // ? One-to-many
//   require('./locations'),
//   // require('./relations'),
//   require('./sources'),
// ];

// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
// 	modelDefiner(sequelize);
//   const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//   console.log(model);
//   db[model.name] = model;
// }

const files = fs.readdirSync(__dirname);

for (let file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // console.log(model.name);
    db[model.name] = model;
  }
}

// ! The new line to set relations
// db.hashtag.location = db.hashtag.hasMany(db.location);
// console.log(db.location);
// todo Don't do the location or source just now, as you can't delete those
// todo Hashtags - one to many - Occurances
// ! Seems too complicated, as you are already populating the tables with ids (silly, I know)
// All done in the next few lines, only to change foreighKey, as, maybe add something else inside there
// db.hashtag.hasMany(db.occurance, { as: "comments" });
// db.occurance.belongsTo(db.hashtag, {
//   foreignKey: "tutorialId",
//   as: "tutorial",
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;


// ! Don't delete just now
// ? Function to add a new location to the table
// setTimeout(() => {
//   sequelize.location.create({
//     location_name: 'global',
//     latitude: '000',
//     longitude: '000'
//   })

// }, 500);

// ! Don't delete just now
// ? Function to add a new source to the table
// setTimeout(() => {
//   sequelize.source.create({
//     name: 'hehehe News',
//     main_page_url: 'hsascsfattps://www.edinburghnews.scotsman.com/',
//     location_id: 2
//   })

// }, 500);
