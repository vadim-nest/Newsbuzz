const Sequelize = require('sequelize');
const db = {};
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('newsbuzz', 'postgres', '1234', {
  dialect: 'postgres',
  logging: false,
});

const files = fs.readdirSync(__dirname);

for (let file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  }
}

// TODO: occurrences - one-to-many
// ! The new line to set relations
// db.hashtag.location = db.hashtag.hasMany(db.location);
// console.log(db.location);
// todo Don't do the location or source just now, as you can't delete those
// todo Hashtags - one to many - Occurances
// ! Seems too complicated, as you are already populating the tables with ids (silly, I know)
// ? All done in the next few lines, only to change foreighKey, as, maybe add something else inside there
// db.hashtag.hasMany(db.occurance, { as: "comments" });
// db.occurance.belongsTo(db.hashtag, {
//   foreignKey: "tutorialId",
//   as: "tutorial",
// });
db.source.belongsTo(db.location, {
  foreignKey: 'location_id',
});
db.location.hasMany(db.source, {
  foreignKey: 'location_id',
});

db.occurrence.belongsTo(db.hashtag, {
  foreignKey: 'hashtag_id',
});
db.hashtag.hasMany(db.occurrence, {
  foreignKey: 'hashtag_id',
});

db.occurrence.belongsTo(db.location, {
  foreignKey: 'location_id',
});
db.location.hasMany(db.occurrence, {
  foreignKey: 'location_id',
});

db.occurrence.belongsTo(db.article, {
  foreignKey: 'url_id',
});
db.article.hasMany(db.occurrence, {
  foreignKey: 'url_id',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
